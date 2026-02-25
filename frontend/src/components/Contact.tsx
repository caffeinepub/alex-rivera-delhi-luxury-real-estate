import React, { useState } from 'react';
import { useCreateLead } from '../hooks/useQueries';
import { useLanguage } from '../contexts/LanguageContext';
import VictoryOverlay from './VictoryOverlay';

export default function Contact() {
  const { t } = useLanguage();
  const createLead = useCreateLead();
  const [showVictory, setShowVictory] = useState(false);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    budget: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createLead.mutateAsync({
        name: form.name,
        phone: form.phone,
        email: form.email,
        budget: form.budget,
        message: form.message,
      });
      setShowVictory(true);
      setForm({ name: '', phone: '', email: '', budget: '', message: '' });
    } catch (err) {
      console.error('Lead submission error:', err);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px 16px',
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 215, 0, 0.2)',
    borderRadius: '4px',
    color: '#FFFFFF',
    fontFamily: 'Montserrat, sans-serif',
    fontSize: '0.9rem',
    transition: 'all 0.2s ease',
    outline: 'none',
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: 'Montserrat, sans-serif',
    fontSize: '0.7rem',
    letterSpacing: '0.15em',
    textTransform: 'uppercase' as const,
    color: 'rgba(255, 215, 0, 0.7)',
    display: 'block',
    marginBottom: '6px',
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255, 215, 0, 0.7)';
    (e.currentTarget as HTMLElement).style.boxShadow = '0 0 10px rgba(255, 215, 0, 0.15)';
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255, 215, 0, 0.2)';
    (e.currentTarget as HTMLElement).style.boxShadow = 'none';
  };

  return (
    <>
      <section
        id="contact"
        style={{
          padding: '6rem 0',
          background: 'linear-gradient(180deg, #0A0A0A 0%, #0D0A0D 100%)',
        }}
      >
        <div style={{ maxWidth: '700px', margin: '0 auto', padding: '0 2rem' }}>
          {/* Section header */}
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div
              style={{
                display: 'inline-block',
                padding: '4px 16px',
                marginBottom: '1rem',
                background: 'rgba(255, 215, 0, 0.1)',
                border: '1px solid rgba(255, 215, 0, 0.3)',
                borderRadius: '100px',
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '0.7rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#FFD700',
              }}
            >
              Get In Touch
            </div>

            {/* Rotating heading spans — one per line, cycling one at a time */}
            <div className="rotating-heading-wrapper">
              <span className="rotating-heading-span rotating-span-1">
                {t('contact.heading')}
              </span>
              <span className="rotating-heading-span rotating-span-2">
                {t('contact.subheading')}
              </span>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            style={{
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              background: 'rgba(255, 255, 255, 0.07)',
              border: '1px solid rgba(255, 215, 0, 0.3)',
              borderRadius: '12px',
              padding: '2.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
            }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div>
                <label style={labelStyle}>{t('contact.name')}</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder={t('contact.namePlaceholder')}
                  style={inputStyle}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </div>
              <div>
                <label style={labelStyle}>{t('contact.phone')}</label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  placeholder={t('contact.phonePlaceholder')}
                  style={inputStyle}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </div>
            </div>

            <div>
              <label style={labelStyle}>{t('contact.email')}</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder={t('contact.emailPlaceholder')}
                style={inputStyle}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>

            <div>
              <label style={labelStyle}>{t('contact.budget')}</label>
              <select
                name="budget"
                value={form.budget}
                onChange={handleChange}
                required
                style={inputStyle}
                onFocus={handleFocus}
                onBlur={handleBlur}
              >
                <option value="" style={{ background: '#0A0A0A' }}>{t('contact.budgetPlaceholder')}</option>
                <option value="₹1Cr - ₹5Cr" style={{ background: '#0A0A0A' }}>₹1,00,00,000 – ₹5,00,00,000</option>
                <option value="₹5Cr - ₹15Cr" style={{ background: '#0A0A0A' }}>₹5,00,00,000 – ₹15,00,00,000</option>
                <option value="₹15Cr - ₹30Cr" style={{ background: '#0A0A0A' }}>₹15,00,00,000 – ₹30,00,00,000</option>
                <option value="₹30Cr+" style={{ background: '#0A0A0A' }}>₹30,00,00,000+</option>
              </select>
            </div>

            <div>
              <label style={labelStyle}>{t('contact.message')}</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={4}
                placeholder={t('contact.messagePlaceholder')}
                style={{ ...inputStyle, resize: 'vertical' }}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>

            <button
              type="submit"
              disabled={createLead.isPending}
              style={{
                padding: '16px',
                background: createLead.isPending
                  ? 'rgba(255, 215, 0, 0.4)'
                  : 'linear-gradient(45deg, #FFD700, #FFA500)',
                border: 'none',
                borderRadius: '4px',
                color: '#0A0A0A',
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 700,
                fontSize: '0.9rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                cursor: createLead.isPending ? 'not-allowed' : 'none',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
              onMouseEnter={(e) => {
                if (!createLead.isPending) {
                  (e.currentTarget as HTMLElement).style.transform = 'scale(1.02)';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 0 25px rgba(255, 215, 0, 0.6)';
                }
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
                (e.currentTarget as HTMLElement).style.boxShadow = 'none';
              }}
            >
              {createLead.isPending ? (
                <>
                  <div
                    style={{
                      width: '16px',
                      height: '16px',
                      borderRadius: '50%',
                      border: '2px solid rgba(10,10,10,0.3)',
                      borderTopColor: '#0A0A0A',
                      animation: 'goldSpin 0.8s linear infinite',
                    }}
                  />
                  Submitting...
                </>
              ) : (
                t('contact.submit')
              )}
            </button>

            {createLead.isError && (
              <p
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: '0.85rem',
                  color: '#DC143C',
                  textAlign: 'center',
                }}
              >
                {t('contact.error')}
              </p>
            )}
          </form>

          {/* WhatsApp direct link */}
          <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
            <p
              style={{
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '0.85rem',
                color: 'rgba(255, 255, 255, 0.4)',
                marginBottom: '1rem',
              }}
            >
              {t('contact.whatsapp')}
            </p>
            <a
              href="https://wa.me/919999999999?text=Hi%20Alex%2C%20I%27m%20interested%20in%20a%20Delhi%20luxury%20property"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 28px',
                background: 'rgba(37, 211, 102, 0.1)',
                border: '1px solid rgba(37, 211, 102, 0.3)',
                borderRadius: '100px',
                color: '#25D366',
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 600,
                fontSize: '0.9rem',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = 'scale(1.05)';
                (e.currentTarget as HTMLElement).style.background = 'rgba(37, 211, 102, 0.2)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
                (e.currentTarget as HTMLElement).style.background = 'rgba(37, 211, 102, 0.1)';
              }}
            >
              📱 +91 99999 99999
            </a>
          </div>
        </div>
      </section>

      {showVictory && <VictoryOverlay onClose={() => setShowVictory(false)} />}
    </>
  );
}
