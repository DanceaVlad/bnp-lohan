// biome-ignore-all lint: this is a script
import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
import path from "node:path";
import { faker } from "@faker-js/faker";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!(supabaseUrl && supabaseServiceKey)) {
    console.error(
        "❌ Error: Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local"
    );
    process.exit(1);
}
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// =============== USERS ===============

const numberOfUsers = 100;
const USERS = Array.from({ length: numberOfUsers }, () => ({
    email: faker.internet.email(),
    password: faker.internet.password(),
}));
async function seedUsers(): Promise<void> {
    for (const user of USERS) {
        await supabase.auth.admin.createUser({
            email: user.email,
            password: user.password,
            email_confirm: true, // Bypass email verification
        });
    }
}

// =============== RUN ===============
seedUsers();
