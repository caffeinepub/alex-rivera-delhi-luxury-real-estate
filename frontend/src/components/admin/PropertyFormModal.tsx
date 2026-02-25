import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useCreateProperty, useUpdateProperty } from '../../hooks/useQueries';
import type { Property } from '../../backend';
import { PropertyType, PropertyCategory } from '../../backend';

interface PropertyFormModalProps {
  open: boolean;
  onClose: () => void;
  property: Property | null;
}

interface FormState {
  name: string;
  location: string;
  price: string;
  propertyType: string;
  category: string;
  imageUrl: string;
  sqft: string;
  bedrooms: string;
  features: string; // comma-separated
}

const EMPTY_FORM: FormState = {
  name: '',
  location: '',
  price: '',
  propertyType: 'villa',
  category: 'featured',
  imageUrl: '',
  sqft: '',
  bedrooms: '',
  features: '',
};

function generateId(): string {
  return `prop-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

export default function PropertyFormModal({ open, onClose, property }: PropertyFormModalProps) {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const createProperty = useCreateProperty();
  const updateProperty = useUpdateProperty();

  const isEditing = !!property;
  const isSaving = createProperty.isPending || updateProperty.isPending;

  useEffect(() => {
    if (property) {
      setForm({
        name: property.name,
        location: property.location,
        price: String(Number(property.price)),
        propertyType: property.propertyType as string,
        category: property.category as string,
        imageUrl: property.imageUrl,
        sqft: String(Number(property.sqft)),
        bedrooms: String(Number(property.bedrooms)),
        features: property.features.join(', '),
      });
    } else {
      setForm(EMPTY_FORM);
    }
    setErrors({});
  }, [property, open]);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.location.trim()) newErrors.location = 'Location is required';
    if (!form.price.trim() || isNaN(Number(form.price)) || Number(form.price) < 0) {
      newErrors.price = 'Valid price is required';
    }
    if (!form.imageUrl.trim()) newErrors.imageUrl = 'Image URL is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const featuresArray = form.features
      .split(',')
      .map(f => f.trim())
      .filter(Boolean);

    const propertyData: Property = {
      id: property?.id || generateId(),
      name: form.name.trim(),
      location: form.location.trim(),
      price: BigInt(Math.round(Number(form.price))),
      propertyType: form.propertyType as PropertyType,
      category: form.category as PropertyCategory,
      imageUrl: form.imageUrl.trim(),
      sqft: BigInt(Math.round(Number(form.sqft) || 0)),
      bedrooms: BigInt(Math.round(Number(form.bedrooms) || 0)),
      features: featuresArray,
      createdAt: property?.createdAt ?? BigInt(Date.now()),
    };

    try {
      if (isEditing) {
        await updateProperty.mutateAsync({ id: propertyData.id, property: propertyData });
      } else {
        await createProperty.mutateAsync(propertyData);
      }
      onClose();
    } catch (err) {
      console.error('Failed to save property:', err);
    }
  };

  const set = (key: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm(f => ({ ...f, [key]: e.target.value }));
    if (errors[key]) setErrors(err => ({ ...err, [key]: undefined }));
  };

  const inputStyle: React.CSSProperties = {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(198,167,94,0.2)',
    color: '#F5F0E8',
    borderRadius: 4,
    padding: '0.625rem 0.75rem',
    fontSize: '0.875rem',
    width: '100%',
    outline: 'none',
    transition: 'border-color 0.2s ease',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '0.75rem',
    fontWeight: 500,
    color: 'rgba(245,240,232,0.6)',
    marginBottom: '0.375rem',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  };

  const errorStyle: React.CSSProperties = {
    color: '#DC143C',
    fontSize: '0.7rem',
    marginTop: '0.25rem',
  };

  return (
    <Dialog open={open} onOpenChange={v => !v && onClose()}>
      <DialogContent
        className="max-w-2xl p-0 border-0 max-h-[90vh] overflow-y-auto"
        style={{ background: '#111111', border: '1px solid rgba(198,167,94,0.2)' }}
      >
        <DialogHeader
          className="px-6 pt-6 pb-4 sticky top-0 z-10"
          style={{ background: '#111111', borderBottom: '1px solid rgba(198,167,94,0.1)' }}
        >
          <DialogTitle className="font-serif font-bold text-lg" style={{ color: '#F5F0E8' }}>
            {isEditing ? 'Edit Property' : 'Add New Property'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          {/* Name */}
          <div>
            <label style={labelStyle}>Property Name *</label>
            <input
              type="text"
              value={form.name}
              onChange={set('name')}
              placeholder="e.g. Villa Serenova"
              style={inputStyle}
              onFocus={e => (e.target.style.borderColor = '#C6A75E')}
              onBlur={e => (e.target.style.borderColor = 'rgba(198,167,94,0.2)')}
            />
            {errors.name && <p style={errorStyle}>{errors.name}</p>}
          </div>

          {/* Location */}
          <div>
            <label style={labelStyle}>Location *</label>
            <input
              type="text"
              value={form.location}
              onChange={set('location')}
              placeholder="e.g. Monterra Heights, Monterra City"
              style={inputStyle}
              onFocus={e => (e.target.style.borderColor = '#C6A75E')}
              onBlur={e => (e.target.style.borderColor = 'rgba(198,167,94,0.2)')}
            />
            {errors.location && <p style={errorStyle}>{errors.location}</p>}
          </div>

          {/* Price */}
          <div>
            <label style={labelStyle}>Price (USD) *</label>
            <input
              type="number"
              value={form.price}
              onChange={set('price')}
              placeholder="e.g. 4200000"
              min="0"
              style={inputStyle}
              onFocus={e => (e.target.style.borderColor = '#C6A75E')}
              onBlur={e => (e.target.style.borderColor = 'rgba(198,167,94,0.2)')}
            />
            {errors.price && <p style={errorStyle}>{errors.price}</p>}
          </div>

          {/* Type & Category */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={labelStyle}>Property Type</label>
              <select
                value={form.propertyType}
                onChange={set('propertyType')}
                style={{ ...inputStyle, cursor: 'pointer' }}
              >
                <option value="villa">Villa</option>
                <option value="penthouse">Penthouse</option>
                <option value="land">Land</option>
                <option value="commercial">Commercial</option>
              </select>
            </div>
            <div>
              <label style={labelStyle}>Category</label>
              <select
                value={form.category}
                onChange={set('category')}
                style={{ ...inputStyle, cursor: 'pointer' }}
              >
                <option value="featured">Featured</option>
                <option value="land">Land</option>
              </select>
            </div>
          </div>

          {/* Sqft & Bedrooms */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={labelStyle}>Area (sq ft)</label>
              <input
                type="number"
                value={form.sqft}
                onChange={set('sqft')}
                placeholder="e.g. 4500"
                min="0"
                style={inputStyle}
                onFocus={e => (e.target.style.borderColor = '#C6A75E')}
                onBlur={e => (e.target.style.borderColor = 'rgba(198,167,94,0.2)')}
              />
            </div>
            <div>
              <label style={labelStyle}>Bedrooms</label>
              <input
                type="number"
                value={form.bedrooms}
                onChange={set('bedrooms')}
                placeholder="e.g. 4"
                min="0"
                style={inputStyle}
                onFocus={e => (e.target.style.borderColor = '#C6A75E')}
                onBlur={e => (e.target.style.borderColor = 'rgba(198,167,94,0.2)')}
              />
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label style={labelStyle}>Image URL *</label>
            <input
              type="text"
              value={form.imageUrl}
              onChange={set('imageUrl')}
              placeholder="e.g. /assets/generated/property-villa-1.dim_800x600.webp"
              style={inputStyle}
              onFocus={e => (e.target.style.borderColor = '#C6A75E')}
              onBlur={e => (e.target.style.borderColor = 'rgba(198,167,94,0.2)')}
            />
            {errors.imageUrl && <p style={errorStyle}>{errors.imageUrl}</p>}
          </div>

          {/* Features */}
          <div>
            <label style={labelStyle}>Features (comma-separated)</label>
            <input
              type="text"
              value={form.features}
              onChange={set('features')}
              placeholder="e.g. 4 BHK, Infinity Pool, Smart Home"
              style={inputStyle}
              onFocus={e => (e.target.style.borderColor = '#C6A75E')}
              onBlur={e => (e.target.style.borderColor = 'rgba(198,167,94,0.2)')}
            />
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: '0.75rem', paddingTop: '0.5rem' }}>
            <button
              type="button"
              onClick={onClose}
              disabled={isSaving}
              style={{
                flex: 1,
                padding: '0.75rem',
                borderRadius: 4,
                border: '1px solid rgba(198,167,94,0.2)',
                background: 'transparent',
                color: 'rgba(245,240,232,0.7)',
                fontSize: '0.875rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              style={{
                flex: 1,
                padding: '0.75rem',
                borderRadius: 4,
                border: 'none',
                background: '#C6A75E',
                color: '#111111',
                fontSize: '0.875rem',
                fontWeight: 700,
                cursor: isSaving ? 'not-allowed' : 'pointer',
                opacity: isSaving ? 0.7 : 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
              }}
            >
              {isSaving ? (
                <>
                  <div
                    style={{
                      width: 14,
                      height: 14,
                      border: '2px solid #111111',
                      borderTopColor: 'transparent',
                      borderRadius: '50%',
                      animation: 'spin 0.8s linear infinite',
                    }}
                  />
                  Saving...
                </>
              ) : (
                isEditing ? 'Save Changes' : 'Add Property'
              )}
            </button>
          </div>
        </form>

        <style>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          select option {
            background: #111111;
            color: #F5F0E8;
          }
        `}</style>
      </DialogContent>
    </Dialog>
  );
}
