import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { LocalProperty } from '../../types/property';
import { saveProperty, updateProperty, generateId } from '../../utils/propertyStorage';
import { formatIndianPrice } from '../../utils/formatIndianPrice';

interface LocalPropertyFormModalProps {
  open: boolean;
  onClose: () => void;
  property: LocalProperty | null;
}

const CITIES = ['Delhi', 'Gurgaon', 'Noida', 'Aerocity', 'Ghaziabad', 'Custom'];

interface FormState {
  city: string;
  customCity: string;
  title: string;
  price: string;
  location: string;
  lat: string;
  lng: string;
  photo1: string;
  photo2: string;
  photo3: string;
  enquiryCount: string;
}

const EMPTY_FORM: FormState = {
  city: 'Delhi',
  customCity: '',
  title: '',
  price: '',
  location: '',
  lat: '',
  lng: '',
  photo1: '',
  photo2: '',
  photo3: '',
  enquiryCount: '0',
};

export default function LocalPropertyFormModal({ open, onClose, property }: LocalPropertyFormModalProps) {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [isSaving, setIsSaving] = useState(false);

  const isEditing = !!property;

  useEffect(() => {
    if (property) {
      const cityInList = CITIES.slice(0, -1).includes(property.city);
      setForm({
        city: cityInList ? property.city : 'Custom',
        customCity: cityInList ? '' : property.city,
        title: property.title,
        price: String(property.price),
        location: property.location,
        lat: String(property.lat),
        lng: String(property.lng),
        photo1: property.photos[0] || '',
        photo2: property.photos[1] || '',
        photo3: property.photos[2] || '',
        enquiryCount: String(property.enquiryCount),
      });
    } else {
      setForm(EMPTY_FORM);
    }
    setErrors({});
  }, [property, open]);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FormState, string>> = {};
    if (!form.title.trim()) newErrors.title = 'Title is required';
    if (!form.location.trim()) newErrors.location = 'Location is required';
    if (!form.price.trim() || isNaN(Number(form.price)) || Number(form.price) <= 0) {
      newErrors.price = 'Valid price is required (e.g. 2800000000)';
    }
    if (!form.photo1.trim()) newErrors.photo1 = 'At least one photo URL is required';
    if (form.city === 'Custom' && !form.customCity.trim()) {
      newErrors.customCity = 'Custom city name is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSaving(true);
    try {
      const finalCity = form.city === 'Custom' ? form.customCity.trim() : form.city;
      const propertyData: LocalProperty = {
        id: property?.id ?? generateId(),
        city: finalCity,
        title: form.title.trim(),
        price: Number(form.price),
        location: form.location.trim(),
        lat: parseFloat(form.lat) || 28.6139,
        lng: parseFloat(form.lng) || 77.2090,
        photos: [
          form.photo1.trim() || '/assets/generated/property-villa-1.dim_800x500.png',
          form.photo2.trim() || '/assets/generated/property-villa-2.dim_800x500.png',
          form.photo3.trim() || '/assets/generated/property-villa-3.dim_800x500.png',
        ],
        enquiryCount: parseInt(form.enquiryCount) || 0,
      };

      if (isEditing) {
        updateProperty(propertyData);
      } else {
        saveProperty(propertyData);
      }
      onClose();
    } finally {
      setIsSaving(false);
    }
  };

  const set = (key: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm(f => ({ ...f, [key]: e.target.value }));
    if (errors[key]) setErrors(err => ({ ...err, [key]: undefined }));
  };

  const pricePreview = form.price && !isNaN(Number(form.price)) && Number(form.price) > 0
    ? formatIndianPrice(Number(form.price))
    : null;

  const inputCls = "w-full border border-light-gray rounded-lg px-3 py-2.5 text-sm text-text-dark bg-white focus:outline-none focus:border-navy focus:ring-1 focus:ring-navy transition-colors";
  const labelCls = "block text-xs font-semibold text-text-muted uppercase tracking-wide mb-1.5";
  const errorCls = "text-red-500 text-xs mt-1";

  return (
    <Dialog open={open} onOpenChange={v => !v && onClose()}>
      <DialogContent className="max-w-2xl p-0 border border-light-gray max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader className="px-6 pt-6 pb-4 sticky top-0 z-10 bg-white border-b border-light-gray">
          <DialogTitle className="font-bold text-lg text-text-dark">
            {isEditing ? 'Edit Property' : 'Add New Property'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          {/* City */}
          <div>
            <label className={labelCls}>City *</label>
            <select value={form.city} onChange={set('city')} className={inputCls}>
              {CITIES.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Custom City */}
          {form.city === 'Custom' && (
            <div>
              <label className={labelCls}>Custom City Name *</label>
              <input
                type="text"
                value={form.customCity}
                onChange={set('customCity')}
                placeholder="e.g. Faridabad"
                className={inputCls}
              />
              {errors.customCity && <p className={errorCls}>{errors.customCity}</p>}
            </div>
          )}

          {/* Title */}
          <div>
            <label className={labelCls}>Property Title *</label>
            <input
              type="text"
              value={form.title}
              onChange={set('title')}
              placeholder="e.g. Aerocity Skyview Penthouse"
              className={inputCls}
            />
            {errors.title && <p className={errorCls}>{errors.title}</p>}
          </div>

          {/* Price */}
          <div>
            <label className={labelCls}>Price (₹ in numbers) *</label>
            <input
              type="number"
              value={form.price}
              onChange={set('price')}
              placeholder="e.g. 2800000000"
              min="0"
              className={inputCls}
            />
            {pricePreview && (
              <p className="text-navy text-sm font-bold mt-1.5">Preview: {pricePreview}</p>
            )}
            {errors.price && <p className={errorCls}>{errors.price}</p>}
          </div>

          {/* Location */}
          <div>
            <label className={labelCls}>Location *</label>
            <input
              type="text"
              value={form.location}
              onChange={set('location')}
              placeholder="e.g. Aerocity, New Delhi"
              className={inputCls}
            />
            {errors.location && <p className={errorCls}>{errors.location}</p>}
          </div>

          {/* Lat / Lng */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Latitude</label>
              <input
                type="number"
                value={form.lat}
                onChange={set('lat')}
                placeholder="e.g. 28.6139"
                step="0.0001"
                className={inputCls}
              />
            </div>
            <div>
              <label className={labelCls}>Longitude</label>
              <input
                type="number"
                value={form.lng}
                onChange={set('lng')}
                placeholder="e.g. 77.2090"
                step="0.0001"
                className={inputCls}
              />
            </div>
          </div>

          {/* Photo URLs */}
          <div>
            <label className={labelCls}>Photo URL 1 *</label>
            <input
              type="text"
              value={form.photo1}
              onChange={set('photo1')}
              placeholder="https://... or /assets/generated/..."
              className={inputCls}
            />
            {errors.photo1 && <p className={errorCls}>{errors.photo1}</p>}
          </div>
          <div>
            <label className={labelCls}>Photo URL 2</label>
            <input
              type="text"
              value={form.photo2}
              onChange={set('photo2')}
              placeholder="https://... or /assets/generated/..."
              className={inputCls}
            />
          </div>
          <div>
            <label className={labelCls}>Photo URL 3</label>
            <input
              type="text"
              value={form.photo3}
              onChange={set('photo3')}
              placeholder="https://... or /assets/generated/..."
              className={inputCls}
            />
          </div>

          {/* Enquiry Count */}
          <div>
            <label className={labelCls}>Enquiry Count</label>
            <input
              type="number"
              value={form.enquiryCount}
              onChange={set('enquiryCount')}
              placeholder="0"
              min="0"
              className={inputCls}
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isSaving}
              className="flex-1 py-3 rounded-lg border border-light-gray text-text-muted font-semibold text-sm hover:bg-off-white transition-colors disabled:opacity-50 min-h-[48px]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="flex-1 py-3 rounded-lg bg-navy text-white font-semibold text-sm hover:bg-navy-dark transition-colors disabled:opacity-60 min-h-[48px] flex items-center justify-center gap-2"
            >
              {isSaving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Saving...
                </>
              ) : (
                isEditing ? 'Save Changes' : 'Add Property'
              )}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
