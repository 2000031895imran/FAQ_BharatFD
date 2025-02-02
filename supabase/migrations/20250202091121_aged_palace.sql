/*
  # Create FAQs table with translations support

  1. New Tables
    - `faqs`
      - `id` (uuid, primary key)
      - `question` (text)
      - `answer` (text)
      - `translations` (jsonb)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `faqs` table
    - Add policies for authenticated users to manage FAQs
*/

CREATE TABLE IF NOT EXISTS faqs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question text NOT NULL,
  answer text NOT NULL,
  translations jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to read all FAQs
CREATE POLICY "Anyone can read FAQs"
  ON faqs
  FOR SELECT
  TO authenticated
  USING (true);

-- Allow authenticated users to create FAQs
CREATE POLICY "Authenticated users can create FAQs"
  ON faqs
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Allow authenticated users to update FAQs
CREATE POLICY "Authenticated users can update FAQs"
  ON faqs
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Allow authenticated users to delete FAQs
CREATE POLICY "Authenticated users can delete FAQs"
  ON faqs
  FOR DELETE
  TO authenticated
  USING (true);

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_faqs_updated_at
  BEFORE UPDATE ON faqs
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();