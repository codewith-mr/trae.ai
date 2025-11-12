import React from 'react';
import Image from 'next/image';

export const metadata = {
  title: 'Privacy Policy | TBS',
  description: 'Our privacy policy and data protection practices.',
};

const PrivacyPolicyPage = () => {
  return (
    <main className="bg-background">
      {/* Hero Section (match Terms of Service palette) */}
      <div className="bg-primary py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/20 to-transparent"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">Privacy Policy</h1>
            <p className="text-secondary text-lg md:text-xl max-w-2xl mx-auto">
              Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
            <div className="mt-8 inline-flex items-center justify-center px-4 py-2 bg-white/10 rounded-full text-secondary backdrop-blur-sm">
              Your Privacy Matters
            </div>
          </div>
        </div>
      </div>
      
      {/* Content Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-8 -mt-16 relative z-20 border border-neutral-100">
          <div className="flex items-center justify-center mb-8">
            <div className="bg-primary/10 p-4 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          </div>
          
          <div className="prose prose-lg text-text max-w-none">
            <div className="bg-neutral-50 p-6 rounded-lg border-l-4 border-primary mb-8">
              <p className="italic">
                At The Business Sidekick (TBS), we respect your privacy and are committed to protecting your personal data. 
                This privacy policy will inform you about how we look after your personal data when you visit our website 
                and tell you about your privacy rights and how the law protects you.
              </p>
            </div>
            
            <div className="mb-10">
              <div className="flex items-center mb-4">
                <div className="bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center mr-4">
                  <span className="text-primary font-bold">1</span>
                </div>
                <h2 className="text-2xl font-heading font-semibold text-primary m-0">Introduction</h2>
              </div>
              <div className="pl-14">
                <p>
                  At The Business Sidekick (TBS), we respect your privacy and are committed to protecting your personal data. 
                  This privacy policy will inform you about how we look after your personal data when you visit our website 
                  and tell you about your privacy rights and how the law protects you.
                </p>
              </div>
            </div>
            
            <div className="mb-10">
              <div className="flex items-center mb-4">
                <div className="bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center mr-4">
                  <span className="text-primary font-bold">2</span>
                </div>
                <h2 className="text-2xl font-heading font-semibold text-primary m-0">The Data We Collect</h2>
              </div>
              <div className="pl-14">
                <p>
                  We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                  <div className="bg-white p-4 rounded-lg border border-neutral-200 shadow-sm">
                    <div className="font-semibold text-primary mb-2">Identity Data</div>
                    <p className="text-sm">Includes first name, last name, username or similar identifier</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-neutral-200 shadow-sm">
                    <div className="font-semibold text-primary mb-2">Contact Data</div>
                    <p className="text-sm">Includes email address and telephone numbers</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-neutral-200 shadow-sm">
                    <div className="font-semibold text-primary mb-2">Technical Data</div>
                    <p className="text-sm">Includes IP address, browser type and version, time zone setting and location</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-neutral-200 shadow-sm">
                    <div className="font-semibold text-primary mb-2">Usage Data</div>
                    <p className="text-sm">Includes information about how you use our website, products and services</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mb-10">
              <div className="flex items-center mb-4">
                <div className="bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center mr-4">
                  <span className="text-primary font-bold">3</span>
                </div>
                <h2 className="text-2xl font-heading font-semibold text-primary m-0">How We Use Your Data</h2>
              </div>
              <div className="pl-14">
                <p>
                  We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
                </p>
                <ul className="list-none pl-0 mb-6 space-y-2">
                  {[
                    "To register you as a new customer",
                    "To process and deliver your order",
                    "To manage our relationship with you",
                    "To improve our website, products/services, marketing or customer relationships",
                    "To recommend products or services that may be of interest to you"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2 mt-1 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="mb-10">
              <div className="flex items-center mb-4">
                <div className="bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center mr-4">
                  <span className="text-primary font-bold">4</span>
                </div>
                <h2 className="text-2xl font-heading font-semibold text-primary m-0">Data Security</h2>
              </div>
              <div className="pl-14">
                <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200">
                  <p>
                    We have put in place appropriate security measures to prevent your personal data from being accidentally lost, 
                    used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data 
                    to those employees, agents, contractors and other third parties who have a business need to know.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mb-10">
              <div className="flex items-center mb-4">
                <div className="bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center mr-4">
                  <span className="text-primary font-bold">5</span>
                </div>
                <h2 className="text-2xl font-heading font-semibold text-primary m-0">Your Legal Rights</h2>
              </div>
              <div className="pl-14">
                <p>
                  Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 my-6">
                  {[
                    "Request access to your personal data",
                    "Request correction of your personal data",
                    "Request erasure of your personal data",
                    "Object to processing of your personal data",
                    "Request restriction of processing your personal data",
                    "Request transfer of your personal data",
                    "Right to withdraw consent"
                  ].map((right, index) => (
                    <div key={index} className="bg-primary/5 p-3 rounded-lg text-sm">
                      {right}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mb-10">
              <div className="flex items-center mb-4">
                <div className="bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center mr-4">
                  <span className="text-primary font-bold">6</span>
                </div>
                <h2 className="text-2xl font-heading font-semibold text-primary m-0">Contact Us</h2>
              </div>
              <div className="pl-14">
                <p>
                  If you have any questions about this privacy policy or our privacy practices, please contact us at:
                </p>
                <div className="bg-primary/5 p-6 rounded-lg mt-4 flex flex-col sm:flex-row items-center">
                  <div className="mb-4 sm:mb-0 sm:mr-6">
                    <div className="bg-white p-3 rounded-full shadow-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <div className="font-semibold">Email</div>
                    <div className="text-primary">privacy@thebusinesssidekick.com</div>
                    <div className="mt-2 font-semibold">Address</div>
                    <div>123 Business Avenue, Suite 456, Enterprise City, EC 78901</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PrivacyPolicyPage;
