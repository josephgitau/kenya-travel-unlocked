-- Create storage bucket for package images
INSERT INTO storage.buckets (id, name, public)
VALUES ('package-images', 'package-images', true);

-- Allow anyone to view package images (public bucket)
CREATE POLICY "Anyone can view package images"
ON storage.objects FOR SELECT
USING (bucket_id = 'package-images');

-- Only admins can upload package images
CREATE POLICY "Admins can upload package images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'package-images' 
  AND public.has_role(auth.uid(), 'admin')
);

-- Only admins can update package images
CREATE POLICY "Admins can update package images"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'package-images' 
  AND public.has_role(auth.uid(), 'admin')
);

-- Only admins can delete package images
CREATE POLICY "Admins can delete package images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'package-images' 
  AND public.has_role(auth.uid(), 'admin')
);