CREATE TABLE public.contract_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    icon_name TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.contract_categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access on categories"
ON public.contract_categories FOR SELECT USING (true);

CREATE POLICY "Admin and Staff can manage categories"
ON public.contract_categories FOR ALL
TO authenticated
USING (
  (SELECT role FROM public.profiles WHERE id = auth.uid()) IN ('admin', 'staff')
);
