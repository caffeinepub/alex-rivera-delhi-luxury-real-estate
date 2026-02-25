import React from 'react';

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-[#111111] pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        <p className="font-inter text-xs tracking-[0.3em] text-gold uppercase mb-4">Legal</p>
        <h1 className="font-playfair text-4xl md:text-5xl font-bold text-ivory mb-3">Privacy Policy</h1>
        <p className="font-inter text-sm text-ivory/50 mb-12">
          Alexander Reid — Monterra City · Last updated: January 2025
        </p>

        <div className="prose prose-invert max-w-none space-y-10">
          {[
            {
              title: '1. Information We Collect',
              content: 'We collect information you provide directly to us, such as when you submit a consultation enquiry form. This includes your name, phone number, email address, budget range, property type preference, and any message you provide. We may also collect information automatically when you visit our website, including your IP address, browser type, and pages visited.',
            },
            {
              title: '2. Use of Information',
              content: 'We use the information we collect to respond to your enquiries, provide real estate advisory services, communicate with you about properties and market updates, and improve our website and services. We will not use your personal information for any purpose other than those described in this policy without your consent.',
            },
            {
              title: '3. Data Sharing',
              content: 'We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as required by law or to trusted service providers who assist us in operating our website and conducting our business, subject to confidentiality agreements.',
            },
            {
              title: '4. Cookies',
              content: 'Our website uses cookies to enhance your browsing experience. Cookies are small text files stored on your device that help us remember your preferences and understand how you use our site. You may choose to decline cookies through your browser settings or through the cookie consent banner on our website.',
            },
            {
              title: '5. Data Security',
              content: 'We implement appropriate technical and organisational measures to protect your personal information against unauthorised access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.',
            },
            {
              title: '6. Your Rights (GDPR)',
              content: 'If you are located in the European Economic Area, you have the right to access, correct, or delete your personal data. You also have the right to restrict or object to processing, and the right to data portability. To exercise these rights, please contact us at the address below.',
            },
            {
              title: '7. Data Retention',
              content: 'We retain your personal information for as long as necessary to fulfil the purposes outlined in this policy, unless a longer retention period is required by law.',
            },
            {
              title: '8. Contact Information',
              content: 'If you have any questions about this Privacy Policy or our data practices, please contact us at: contact@alexanderreid.com or by writing to Alexander Reid, Monterra City Global Advisory, Monterra City.',
            },
          ].map(section => (
            <div key={section.title}>
              <h2 className="font-playfair text-xl font-semibold text-gold mb-3">{section.title}</h2>
              <p className="font-inter text-sm text-ivory/65 leading-relaxed">{section.content}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
