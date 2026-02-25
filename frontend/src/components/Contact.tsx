import React, { useState } from 'react';
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';

const BUDGET_OPTIONS = [
  { value: 'under-500k', label: 'Under $500K' },
  { value: '500k-1m', label: '$500K – $1M' },
  { value: '1m-5m', label: '$1M – $5M' },
  { value: '5m-plus', label: '$5M+' },
];

const PROPERTY_TYPE_OPTIONS = [
  { value: 'villa', label: 'Villa' },
  { value: 'penthouse', label: 'Penthouse' },
  { value: 'land', label: 'Land' },
  { value: 'commercial', label: 'Commercial' },
];

interface FormData {
  name: string;
  phone: string;
  email: string;
  budget: string;
  propertyType: string;
  message: string;
  _gotcha: string; // honeypot
}

const initialForm: FormData = {
  name: '',
  phone: '',
  email: '',
  budget: '',
  propertyType: '',
  message: '',
  _gotcha: '',
};

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone: string): boolean {
  return /^[\+]?[\d\s\-\(\)]{7,20}$/.test(phone);
}

export default function Contact() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [status, setStatus] = useState<FormStatus>('idle');

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.phone.trim()) newErrors.phone = 'Phone is required';
    else if (!validatePhone(form.phone)) newErrors.phone = 'Please enter a valid phone number';
    if (!form.email.trim()) newErrors.email = 'Email is required';
    else if (!validateEmail(form.email)) newErrors.email = 'Please enter a valid email address';
    if (!form.budget) newErrors.budget = 'Please select a budget range';
    if (!form.propertyType) newErrors.propertyType = 'Please select a property type';
    if (!form.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form._gotcha) return; // honeypot triggered
    if (!validate()) return;

    setStatus('loading');
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email,
          budget: form.budget,
          propertyType: form.propertyType,
          message: form.message,
        }),
      });
      if (res.ok) {
        setStatus('success');
        setForm(initialForm);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const inputClass = (field: keyof FormData) =>
    `w-full font-inter text-sm bg-[#1a1a1a] text-ivory placeholder-ivory/30 px-4 py-3 border ${
      errors[field] ? 'border-red-500/60' : 'border-gold/30 focus:border-gold'
    } outline-none transition-colors duration-200 rounded-sm`;

  return (
    <section id="consultation" className="py-24 bg-[#111111]">
      <div className="max-w-2xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="font-inter text-xs tracking-[0.3em] text-gold uppercase mb-4">
            Private Advisory
          </p>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-ivory mb-4">
            Book Private Consultation
          </h2>
          <p className="font-inter text-ivory/60 text-base">
            Share your requirements and Alexander will personally respond within 24 hours.
          </p>
        </div>

        {status === 'success' ? (
          <div className="text-center py-16 border border-gold/20 rounded-sm bg-[#161616]">
            <CheckCircle size={48} className="text-gold mx-auto mb-4" />
            <h3 className="font-playfair text-2xl font-semibold text-ivory mb-2">Thank You</h3>
            <p className="font-inter text-ivory/60 text-base">
              We will contact you within 24 hours to arrange your private consultation.
            </p>
            <button
              onClick={() => setStatus('idle')}
              className="mt-6 font-inter text-sm text-gold border border-gold/40 px-6 py-2 rounded-full hover:bg-gold hover:text-matte-black transition-all duration-200"
            >
              Submit Another Enquiry
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            {/* Honeypot */}
            <input
              type="text"
              name="_gotcha"
              value={form._gotcha}
              onChange={handleChange}
              style={{ display: 'none' }}
              tabIndex={-1}
              autoComplete="off"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="font-inter text-xs text-ivory/50 uppercase tracking-wide block mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Alexander Reid"
                  className={inputClass('name')}
                />
                {errors.name && <p className="font-inter text-xs text-red-400 mt-1">{errors.name}</p>}
              </div>
              <div>
                <label className="font-inter text-xs text-ivory/50 uppercase tracking-wide block mb-1.5">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+1 800 000 0000"
                  className={inputClass('phone')}
                />
                {errors.phone && <p className="font-inter text-xs text-red-400 mt-1">{errors.phone}</p>}
              </div>
            </div>

            <div>
              <label className="font-inter text-xs text-ivory/50 uppercase tracking-wide block mb-1.5">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className={inputClass('email')}
              />
              {errors.email && <p className="font-inter text-xs text-red-400 mt-1">{errors.email}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="font-inter text-xs text-ivory/50 uppercase tracking-wide block mb-1.5">
                  Budget Range *
                </label>
                <select
                  name="budget"
                  value={form.budget}
                  onChange={handleChange}
                  className={inputClass('budget')}
                >
                  <option value="">Select budget</option>
                  {BUDGET_OPTIONS.map(o => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
                {errors.budget && <p className="font-inter text-xs text-red-400 mt-1">{errors.budget}</p>}
              </div>
              <div>
                <label className="font-inter text-xs text-ivory/50 uppercase tracking-wide block mb-1.5">
                  Property Type *
                </label>
                <select
                  name="propertyType"
                  value={form.propertyType}
                  onChange={handleChange}
                  className={inputClass('propertyType')}
                >
                  <option value="">Select type</option>
                  {PROPERTY_TYPE_OPTIONS.map(o => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
                {errors.propertyType && <p className="font-inter text-xs text-red-400 mt-1">{errors.propertyType}</p>}
              </div>
            </div>

            <div>
              <label className="font-inter text-xs text-ivory/50 uppercase tracking-wide block mb-1.5">
                Message *
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Tell us about your requirements, preferred locations, timeline..."
                rows={5}
                className={inputClass('message')}
              />
              {errors.message && <p className="font-inter text-xs text-red-400 mt-1">{errors.message}</p>}
            </div>

            {status === 'error' && (
              <div className="flex items-center gap-2 border border-red-500/30 bg-red-500/10 px-4 py-3 rounded-sm">
                <AlertCircle size={16} className="text-red-400 shrink-0" />
                <p className="font-inter text-sm text-red-400">
                  Submission failed. Please try again or email{' '}
                  <a href="mailto:contact@alexanderreid.com" className="underline">
                    contact@alexanderreid.com
                  </a>
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full font-inter font-medium bg-gold text-matte-black py-4 hover:opacity-90 transition-opacity disabled:opacity-60 flex items-center justify-center gap-2 text-base rounded-sm"
            >
              {status === 'loading' ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Submitting...
                </>
              ) : (
                'Submit Enquiry'
              )}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
