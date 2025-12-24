// biome-ignore-all lint: this is a script
import { Database } from "@/types/supabase";
import { createClient } from "@supabase/supabase-js";
import { faker } from "@faker-js/faker";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// --- Utils ---
const slugify = (text: string) =>
    text
        .toString()
        .toLowerCase()
        .trim()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, "-")
        .replace(/[^\w-]+/g, "")
        .replace(/--+/g, "-");

// =============== 1. USERS & PROFILES ===============
async function seedUsers(): Promise<void> {
    const numberOfUsers = 10;

    const USERS = Array.from({ length: numberOfUsers }, () => ({
        phone: `+407${faker.string.numeric(8)}`,
        phone_confirm: true,
    }));
    console.log(USERS);

    for (const user of USERS) {
        const { error } = await supabase.auth.admin.createUser(user);
        if (error) console.error(`Error creating ${user.phone}:`, error.message);
    }
}

// =============== 2. CATEGORIES ===============
async function seedCategories() {
    console.log("Step 2: Seeding categories...");

    const CATEGORIES: Database["public"]["Tables"]["contract_categories"]["Insert"][] = [
        { name: "Imobiliare", icon_name: "house" },
        { name: "Transport", icon_name: "car" },
        { name: "Succesiuni", icon_name: "users" },
    ];

    const { data: insertedCategories, error: catError } = await supabase
        .from("contract_categories")
        .insert(CATEGORIES)
        .select();

    if (catError || !insertedCategories) {
        throw new Error(`Failed to seed categories: ${catError?.message}`);
    }
    return insertedCategories;
}

// =============== 3. REQUIREMENTS ===============
async function seedRequirements(
    categories: Database["public"]["Tables"]["contract_categories"]["Row"][]
) {
    console.log("Step 3: Seeding requirements...");

    const imobiliareId = categories.find((c) => c.name === "Imobiliare")?.id;
    const transportId = categories.find((c) => c.name === "Transport")?.id;

    if (!imobiliareId || !transportId) throw new Error("Could not find category IDs");

    const REQUIREMENTS: Database["public"]["Tables"]["contract_requirements"]["Insert"][] = [
        {
            category_id: imobiliareId,
            title: "Vânzare Apartament",
            slug: slugify("Vânzare Apartament"),
            required_docs: ["Act Proprietate", "Cadastru", "Certificat Fiscal"],
            detailed_instructions:
                "Certificatul fiscal se obține de la primărie și este valabil 30 de zile.",
        },
        {
            category_id: transportId,
            title: "Vânzare Auto",
            slug: slugify("Vânzare Auto"),
            required_docs: ["CIV", "Talon", "Certificat Fiscal"],
            detailed_instructions:
                "Vânzătorul trebuie să scoată mașina de la fisc înainte de tranzacție.",
        },
    ];

    const { error: reqError } = await supabase.from("contract_requirements").insert(REQUIREMENTS);

    if (reqError) throw new Error(`Failed to seed requirements: ${reqError.message}`);
}

// =============== RUN ===============
(async () => {
    try {
        await seedUsers();
        const categories = await seedCategories();
        await seedRequirements(categories);
        console.log("Seeding complete!");
    } catch (err) {
        console.error("Seeding failed:", err);
        process.exit(1);
    }
})();
