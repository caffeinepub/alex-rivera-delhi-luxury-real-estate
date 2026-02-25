import React from 'react';

export default function TermsConditions() {
  return (
    <main className="min-h-screen bg-[#111111] pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        <p className="font-inter text-xs tracking-[0.3em] text-gold uppercase mb-4">Legal</p>
        <h1 className="font-playfair text-4xl md:text-5xl font-bold text-ivory mb-3">Terms & Conditions</h1>
        <p className="font-inter text-sm text-ivory/50 mb-12">
          Alexander Reid — Monterra City · Effective: January 2025
        </p>

        <div className="prose prose-invert max-w-none space-y-10">
          {[
            {
              title: '1. Acceptance of Terms',
              content: 'By accessing and using this website, you accept and agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use this website. We reserve the right to modify these terms at any time, and your continued use of the website constitutes acceptance of any changes.',
            },
            {
              title: '2. Services Provided',
              content: 'Alexander Reid provides luxury real estate advisory services in Monterra City and select international markets. The information on this website is provided for general informational purposes only and does not constitute professional real estate, legal, or financial advice. All property details are subject to change without notice.',
            },
            {
              title: '3. Brokerage Disclaimer',
              content: 'Alexander Reid operates as an independent real estate advisor. All property transactions are subject to independent verification, due diligence, and applicable local laws and regulations. Property values, availability, and specifications are subject to change. Past performance of property investments does not guarantee future results.',
            },
            {
              title: '4. Intellectual Property',
              content: 'All content on this website, including text, images, graphics, and design, is the property of Alexander Reid and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works without express written permission.',
            },
            {
              title: '5. Limitation of Liability',
              content: 'To the fullest extent permitted by law, Alexander Reid shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of this website or reliance on any information provided herein. Our total liability shall not exceed the amount paid for services in the preceding 12 months.',
            },
            {
              title: '6. Privacy',
              content: 'Your use of this website is also governed by our Privacy Policy, which is incorporated into these Terms by reference. Please review our Privacy Policy to understand our practices.',
            },
            {
              title: '7. Governing Law',
              content: 'These Terms and Conditions shall be governed by and construed in accordance with the laws of Monterra City jurisdiction. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the courts of Monterra City.',
            },
            {
              title: '8. Contact Information',
              content: 'For questions regarding these Terms and Conditions, please contact us at: contact@alexanderreid.com or by writing to Alexander Reid, Monterra City Global Advisory, Monterra City. Registration: MTRE-2024-XXXX.',
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
