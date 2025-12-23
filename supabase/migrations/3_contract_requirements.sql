CREATE TABLE public.contract_requirements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id UUID REFERENCES public.contract_categories(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    required_docs JSONB NOT NULL DEFAULT '[]'::JSONB,
    detailed_instructions TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.contract_requirements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access on requirements"
ON public.contract_requirements FOR SELECT USING (true);

CREATE POLICY "Admin and Staff can manage requirements"
ON public.contract_requirements FOR ALL
TO authenticated
USING (
  (SELECT role FROM public.profiles WHERE id = auth.uid()) IN ('admin', 'staff')
);
