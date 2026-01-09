import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X } from 'lucide-react';

interface PackageFormData {
  name: string;
  slug: string;
  location: string;
  duration: string;
  description: string;
  short_description: string;
  price_resident: number;
  price_non_resident: number;
  category: string;
  difficulty: string;
  group_size: string;
  best_time: string;
  is_active: boolean;
}

interface PackageFormProps {
  initialData?: Partial<PackageFormData>;
  onSubmit: (data: PackageFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const PackageForm = ({ initialData, onSubmit, onCancel, isLoading }: PackageFormProps) => {
  const [formData, setFormData] = useState<PackageFormData>({
    name: '',
    slug: '',
    location: '',
    duration: '',
    description: '',
    short_description: '',
    price_resident: 0,
    price_non_resident: 0,
    category: 'Bush',
    difficulty: 'Easy to Moderate',
    group_size: '2-8 guests',
    best_time: '',
    is_active: true,
    ...initialData,
  });

  useEffect(() => {
    if (!initialData?.slug && formData.name) {
      setFormData(prev => ({
        ...prev,
        slug: formData.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
      }));
    }
  }, [formData.name, initialData?.slug]);

  const handleChange = (field: keyof PackageFormData, value: string | number | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">
          {initialData?.name ? 'Edit Package' : 'Add New Package'}
        </h3>
        <Button type="button" variant="ghost" size="icon" onClick={onCancel}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Package Name *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="slug">URL Slug *</Label>
          <Input
            id="slug"
            value={formData.slug}
            onChange={(e) => handleChange('slug', e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location *</Label>
          <Input
            id="location"
            value={formData.location}
            onChange={(e) => handleChange('location', e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="duration">Duration *</Label>
          <Input
            id="duration"
            value={formData.duration}
            onChange={(e) => handleChange('duration', e.target.value)}
            placeholder="e.g., 3 days, 2 nights"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="price_resident">Price (Resident) *</Label>
          <Input
            id="price_resident"
            type="number"
            value={formData.price_resident}
            onChange={(e) => handleChange('price_resident', parseInt(e.target.value) || 0)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="price_non_resident">Price (Non-Resident) *</Label>
          <Input
            id="price_non_resident"
            type="number"
            value={formData.price_non_resident}
            onChange={(e) => handleChange('price_non_resident', parseInt(e.target.value) || 0)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select value={formData.category} onValueChange={(v) => handleChange('category', v)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Bush">Bush Safari</SelectItem>
              <SelectItem value="Beach">Beach</SelectItem>
              <SelectItem value="Bush & Beach">Bush & Beach</SelectItem>
              <SelectItem value="Cultural">Cultural</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="difficulty">Difficulty</Label>
          <Select value={formData.difficulty} onValueChange={(v) => handleChange('difficulty', v)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Easy">Easy</SelectItem>
              <SelectItem value="Easy to Moderate">Easy to Moderate</SelectItem>
              <SelectItem value="Moderate">Moderate</SelectItem>
              <SelectItem value="Challenging">Challenging</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="group_size">Group Size</Label>
          <Input
            id="group_size"
            value={formData.group_size}
            onChange={(e) => handleChange('group_size', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="best_time">Best Time to Visit</Label>
          <Input
            id="best_time"
            value={formData.best_time}
            onChange={(e) => handleChange('best_time', e.target.value)}
            placeholder="e.g., July - October"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="short_description">Short Description</Label>
        <Input
          id="short_description"
          value={formData.short_description}
          onChange={(e) => handleChange('short_description', e.target.value)}
          maxLength={200}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Full Description *</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          rows={4}
          required
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="is_active"
          checked={formData.is_active}
          onChange={(e) => handleChange('is_active', e.target.checked)}
          className="h-4 w-4 rounded border-border"
        />
        <Label htmlFor="is_active" className="cursor-pointer">Active (visible on site)</Label>
      </div>

      <div className="flex gap-3 justify-end pt-4 border-t border-border">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Saving...' : initialData?.name ? 'Update Package' : 'Create Package'}
        </Button>
      </div>
    </form>
  );
};

export default PackageForm;
