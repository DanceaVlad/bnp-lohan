CREATE TYPE public.user_role AS ENUM ('admin', 'staff', 'client');

CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  phone TEXT,
  role public.user_role DEFAULT 'client' NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can see their own profile"
ON public.profiles FOR SELECT USING (auth.uid() = id);

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, phone, role)
  VALUES (
    new.id,
    new.phone,
    CASE
      WHEN new.phone = '+407YOUR_NUMBER' THEN 'admin'::public.user_role -- TODO: Change to the admin's phone number
      WHEN new.phone IN ('+407MOM_NUMBER', '+407STAFF1') THEN 'staff'::public.user_role -- TODO: Change to the staff's phone numbers
      ELSE 'client'::public.user_role
    END
  );
  RETURN new;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
