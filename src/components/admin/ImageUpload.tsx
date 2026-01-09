import { useState, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Upload, X, Loader2, GripVertical } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ImageUploadProps {
  images: string[];
  onChange: (images: string[]) => void;
  packageSlug: string;
}

const ImageUpload = ({ images, onChange, packageSlug }: ImageUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const uploadImage = async (file: File) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${packageSlug}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('package-images')
      .upload(fileName, file, { cacheControl: '3600', upsert: false });

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from('package-images')
      .getPublicUrl(fileName);

    return data.publicUrl;
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const newUrls: string[] = [];

    try {
      for (const file of Array.from(files)) {
        if (!file.type.startsWith('image/')) {
          toast({
            title: 'Invalid file',
            description: `${file.name} is not an image`,
            variant: 'destructive',
          });
          continue;
        }

        if (file.size > 5 * 1024 * 1024) {
          toast({
            title: 'File too large',
            description: `${file.name} exceeds 5MB limit`,
            variant: 'destructive',
          });
          continue;
        }

        const url = await uploadImage(file);
        newUrls.push(url);
      }

      if (newUrls.length > 0) {
        onChange([...images, ...newUrls]);
        toast({
          title: 'Success',
          description: `${newUrls.length} image(s) uploaded`,
        });
      }
    } catch (error: any) {
      toast({
        title: 'Upload failed',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const removeImage = async (index: number) => {
    const imageUrl = images[index];
    const path = imageUrl.split('/package-images/')[1];

    if (path) {
      try {
        await supabase.storage.from('package-images').remove([path]);
      } catch (error) {
        console.error('Failed to delete from storage:', error);
      }
    }

    const newImages = images.filter((_, i) => i !== index);
    onChange(newImages);
  };

  const handleDragStart = (index: number) => {
    setDragIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (dragIndex === null || dragIndex === index) return;

    const newImages = [...images];
    const draggedImage = newImages[dragIndex];
    newImages.splice(dragIndex, 1);
    newImages.splice(index, 0, draggedImage);
    onChange(newImages);
    setDragIndex(index);
  };

  const handleDragEnd = () => {
    setDragIndex(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileSelect}
          className="hidden"
          id="image-upload"
        />
        <Button
          type="button"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
        >
          {uploading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Upload className="h-4 w-4 mr-2" />
              Upload Images
            </>
          )}
        </Button>
        <span className="text-sm text-muted-foreground">
          Max 5MB per image. Drag to reorder.
        </span>
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((url, index) => (
            <div
              key={url}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragEnd={handleDragEnd}
              className={`relative group aspect-video rounded-lg overflow-hidden border-2 transition-all ${
                dragIndex === index
                  ? 'border-primary opacity-50'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <img
                src={url}
                alt={`Package image ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors" />
              <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab">
                <GripVertical className="h-5 w-5 text-white drop-shadow-lg" />
              </div>
              <Button
                type="button"
                size="icon"
                variant="destructive"
                className="absolute top-2 right-2 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => removeImage(index)}
              >
                <X className="h-4 w-4" />
              </Button>
              {index === 0 && (
                <span className="absolute bottom-2 left-2 text-xs bg-primary text-primary-foreground px-2 py-1 rounded">
                  Cover
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      {images.length === 0 && (
        <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
          <Upload className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
          <p className="text-muted-foreground">No images uploaded yet</p>
          <p className="text-sm text-muted-foreground">Click upload to add safari photos</p>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
