import { Search, Sparkles, CalendarDays } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

export default async function HomePage() {
    return (
        <div className="flex flex-col gap-8 pb-10">
            {/* SECTION 1: Standard Search */}
            <section className="space-y-3">
                <div className="flex items-center gap-2 px-1">
                    <Search className="w-4 h-4 text-primary" />
                    <h1 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                        Căutare Rapidă
                    </h1>
                </div>
                <div className="relative group">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        className="h-12 pl-10 rounded-xl bg-secondary/50 border-none text-base"
                        placeholder="Caută acte (ex: procură, vânzare...)"
                        // TODO: Add search functionality
                    />
                </div>
            </section>

            {/* SECTION 2: AI Search */}
            <section className="space-y-3">
                <div className="flex items-center gap-2 px-1">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <h1 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                        Căutare cu Inteligență Artificială
                    </h1>
                </div>
                <Card className="rounded-2xl border-none! bg-linear-to-br from-primary/5 via-primary/10 to-transparent shadow-none border border-primary/10 overflow-hidden relative group transition-all active:scale-[0.98]">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-lg">Nu știi exact ce act îți trebuie?</CardTitle>
                        <CardDescription>
                            Descrie situația ta pe scurt, iar AI-ul îți va sugera actele necesare.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Textarea
                            className="bg-background/80 min-h-[100px] rounded-xl border-none resize-none text-base p-4"
                            placeholder="Ex: Vreau să cumpăr mașina fratelui meu, dar este plecat din țară..."
                        />
                        <Button
                            className="w-full h-14 rounded-xl font-bold text-base shadow-lg shadow-primary/20 flex items-center justify-between px-6"
                            //TODO: Add AI analysis functionality
                        >
                            <span>Analizează situația</span>
                            <Sparkles className="w-5 h-5 opacity-80" />
                        </Button>
                    </CardContent>
                </Card>
            </section>

            {/* SECTION 3: Appointment Setup */}
            <section className="space-y-3">
                <div className="flex items-center gap-2 px-1">
                    <CalendarDays className="w-4 h-4 text-primary" />
                    <h1 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                        Programare
                    </h1>
                </div>

                <Card className="rounded-2xl border-none! bg-linear-to-br from-primary/5 via-primary/10 to-transparent shadow-none border border-primary/10 overflow-hidden relative group transition-all active:scale-[0.98]">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-lg flex items-center gap-2">
                            Vizită la Notariat
                        </CardTitle>
                        <CardDescription>
                            Evită timpul de așteptare și rezervă un interval orar dedicat situației
                            tale.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-4">
                        <Button
                            className="w-full h-14 rounded-xl font-bold text-base shadow-lg shadow-primary/20 flex items-center justify-between px-6"
                            //TODO: Link to /programare
                        >
                            <span>Începe Programarea</span>
                            <CalendarDays className="w-5 h-5 opacity-80" />
                        </Button>
                    </CardContent>
                </Card>
            </section>
        </div>
    );
}
