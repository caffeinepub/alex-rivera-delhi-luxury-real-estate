import { useState, useEffect } from 'react';
import { X, AlertCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useCreateProperty, useUpdateProperty } from '../../hooks/useQueries';
import type { Property } from '../../backend';

interface PropertyFormModalProps {
  open: boolean;
  onClose: () => void;
  property: Property | null;
}

interface FormState {
  title: string;
  location: string;
  price: string;
  imageUrl: string;
  description: string;
}

const EMPTY_FORM: FormState = {
  title: '',
  location: '',
  price: '',
  imageUrl: '',
  description: '',
};

export default function PropertyFormModal({
  open,
  onClose,
  property,
}: PropertyFormModalProps) {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<FormState>>({});

  const createProperty = useCreateProperty();
  const updateProperty = useUpdateProperty();

  const isEditing = !!property;
  const isPending = createProperty.isPending || updateProperty.isPending;

  useEffect(() => {
    if (property) {
      setForm({
        title: property.title,
        location: property.location,
        price: property.price,
        imageUrl: property.imageUrl,
        description: property.description,
      });
    } else {
      setForm(EMPTY_FORM);
    }
    setErrors({});
  }, [property, open]);

  const validate = (): boolean => {
    const newErrors: Partial<FormState> = {};
    if (!form.title.trim()) newErrors.title = 'Title is required';
    if (!form.location.trim()) newErrors.location = 'Location is required';
    if (!form.price.trim()) newErrors.price = 'Price is required';
    if (!form.description.trim()) newErrors.description = 'Description is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      if (isEditing && property) {
        await updateProperty.mutateAsync({
          id: property.id,
          ...form,
        });
      } else {
        await createProperty.mutateAsync(form);
      }
      onClose();
    } catch {
      // error shown via mutation state
    }
  };

  const inputClass =
    'w-full px-3 py-2.5 rounded text-sm input-luxury focus:outline-none';

  const mutationError = createProperty.error || updateProperty.error;

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent
        className="max-w-lg p-0 border-0"
        style={{
          background: '#111111',
          border: '1px solid rgba(255,215,0,0.2)',
        }}
      >
        <DialogHeader className="px-6 pt-6 pb-0">
          <div className="flex items-center justify-between">
            <DialogTitle
              className="font-serif font-bold text-lg"
              style={{ color: '#F5F0E8' }}
            >
              {isEditing ? 'Edit Property' : 'Add New Property'}
            </DialogTitle>
            <button
              onClick={onClose}
              className="p-1.5 rounded transition-all duration-200"
              style={{ color: 'rgba(245,240,232,0.5)' }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = '#FFD700';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color =
                  'rgba(245,240,232,0.5)';
              }}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="px-6 pb-6 pt-4 space-y-4">
          {/* Title */}
          <div>
            <label
              className="block text-xs font-medium mb-1.5"
              style={{ color: 'rgba(245,240,232,0.6)' }}
            >
              Property Title *
            </label>
            <input
              type="text"
              placeholder="e.g. Imperial Penthouse, Connaught Place"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className={inputClass}
            />
            {errors.title && (
              <p className="text-xs mt-1" style={{ color: '#DC143C' }}>
                {errors.title}
              </p>
            )}
          </div>

          {/* Location + Price */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label
                className="block text-xs font-medium mb-1.5"
                style={{ color: 'rgba(245,240,232,0.6)' }}
              >
                Location *
              </label>
              <input
                type="text"
                placeholder="e.g. South Delhi"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                className={inputClass}
              />
              {errors.location && (
                <p className="text-xs mt-1" style={{ color: '#DC143C' }}>
                  {errors.location}
                </p>
              )}
            </div>
            <div>
              <label
                className="block text-xs font-medium mb-1.5"
                style={{ color: 'rgba(245,240,232,0.6)' }}
              >
                Price *
              </label>
              <input
                type="text"
                placeholder="e.g. \u20B912 Cr"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className={inputClass}
              />
              {errors.price && (
                <p className="text-xs mt-1" style={{ color: '#DC143C' }}>
                  {errors.price}
                </p>
              )}
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label
              className="block text-xs font-medium mb-1.5"
              style={{ color: 'rgba(245,240,232,0.6)' }}
            >
              Image URL
            </label>
            <input
              type="url"
              placeholder="https://example.com/property-image.jpg"
              value={form.imageUrl}
              onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
              className={inputClass}
            />
          </div>

          {/* Description */}
          <div>
            <label
              className="block text-xs font-medium mb-1.5"
              style={{ color: 'rgba(245,240,232,0.6)' }}
            >
              Description *
            </label>
            <textarea
              rows={3}
              placeholder="Describe the property — size, features, highlights..."
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className={`${inputClass} resize-none`}
            />
            {errors.description && (
              <p className="text-xs mt-1" style={{ color: '#DC143C' }}>
                {errors.description}
              </p>
            )}
          </div>

          {/* Error */}
          {mutationError && (
            <div
              className="flex items-center gap-2 p-3 rounded text-xs"
              style={{
                background: 'rgba(220,20,60,0.1)',
                border: '1px solid rgba(220,20,60,0.3)',
                color: '#DC143C',
              }}
            >
              <AlertCircle className="w-4 h-4 shrink-0" />
              {isEditing
                ? 'Failed to update property. Please try again.'
                : 'Failed to create property. Please try again.'}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded text-sm font-medium transition-all duration-300"
              style={{
                border: '1px solid rgba(255,215,0,0.2)',
                color: 'rgba(245,240,232,0.7)',
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded text-sm font-bold transition-all duration-300 disabled:opacity-60"
              style={{
                background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                color: '#0A0A0A',
              }}
            >
              {isPending ? (
                <>
                  <div
                    className="w-4 h-4 border-2 border-t-transparent rounded-full animate-spin"
                    style={{ borderColor: '#0A0A0A', borderTopColor: 'transparent' }}
                  />
                  {isEditing ? 'Saving...' : 'Creating...'}
                </>
              ) : isEditing ? (
                'Save Changes'
              ) : (
                'Add Property'
              )}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
