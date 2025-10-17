import React from 'react';

export const metadata = {
  title: 'Terms of Service | TBS',
  description: 'Our terms of service and usage agreement.',
};

const TermsOfServicePage = () => {
  return (
    <main className="bg-background">
      {/* Hero Section */}
      <div className="bg-primary py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.2)_0%,rgba(0,0,0,0)_60%)]"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">Terms of Service</h1>
            <p className="text-secondary text-lg md:text-xl max-w-2xl mx-auto">
              Please read these terms carefully before using our services
            </p>
            <div className="mt-8 inline-flex items-center justify-center px-4 py-2 bg-white/10 rounded-full text-secondary backdrop-blur-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-8 -mt-16 relative z-20 border border-neutral-100">
          <div className="prose prose-lg text-text max-w-none">
            <div className="mb-10">
              <div className="flex items-center mb-4">
                <div className="bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center mr-4">
                  <span className="text-primary font-bold">1</span>
                </div>
                <h2 className="text-2xl font-heading font-semibold text-primary m-0">Agreement to Terms</h2>
              </div>
              <div className="pl-14">
                <p className="text-neutral-700">
                  By accessing or using The Business Sidekick (TBS) website, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
                </p>
              </div>
            </div>
            
            <div className="mb-10">
              <div className="flex items-center mb-4">
                <div className="bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center mr-4">
                  <span className="text-primary font-bold">2</span>
                </div>
                <h2 className="text-2xl font-heading font-semibold text-primary m-0">Use License</h2>
              </div>
              <div className="pl-14">
                <p className="text-neutral-700">
                  Permission is granted to temporarily download one copy of the materials on TBS's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                </p>
                <div className="bg-neutral-50 rounded-lg p-4 my-4 border-l-4 border-primary">
                  <ul className="list-none space-y-2 mb-0">
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Modify or copy the materials</span>
                    </li>
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Use the materials for any commercial purpose or for any public display</span>
                    </li>
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Attempt to decompile or reverse engineer any software contained on TBS's website</span>
                    </li>
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Remove any copyright or other proprietary notations from the materials</span>
                    </li>
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Transfer the materials to another person or "mirror" the materials on any other server</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              <div className="bg-white rounded-lg border border-neutral-200 shadow-sm p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center mr-4">
                    <span className="text-primary font-bold">3</span>
                  </div>
                  <h2 className="text-xl font-heading font-semibold text-primary m-0">Disclaimer</h2>
                </div>
                <p className="text-neutral-700 text-sm">
                  The materials on TBS's website are provided on an 'as is' basis. TBS makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                </p>
              </div>
              
              <div className="bg-white rounded-lg border border-neutral-200 shadow-sm p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center mr-4">
                    <span className="text-primary font-bold">4</span>
                  </div>
                  <h2 className="text-xl font-heading font-semibold text-primary m-0">Limitations</h2>
                </div>
                <p className="text-neutral-700 text-sm">
                  In no event shall TBS or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on TBS's website, even if TBS or a TBS authorized representative has been notified orally or in writing of the possibility of such damage.
                </p>
              </div>
            </div>
            
            <div className="mb-10">
              <div className="flex items-center mb-4">
                <div className="bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center mr-4">
                  <span className="text-primary font-bold">5</span>
                </div>
                <h2 className="text-2xl font-heading font-semibold text-primary m-0">Accuracy of Materials</h2>
              </div>
              <div className="pl-14">
                <p className="text-neutral-700">
                  The materials appearing on TBS's website could include technical, typographical, or photographic errors. TBS does not warrant that any of the materials on its website are accurate, complete or current. TBS may make changes to the materials contained on its website at any time without notice.
                </p>
              </div>
            </div>
            
            <div className="mb-10">
              <div className="flex items-center mb-4">
                <div className="bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center mr-4">
                  <span className="text-primary font-bold">6</span>
                </div>
                <h2 className="text-2xl font-heading font-semibold text-primary m-0">Links</h2>
              </div>
              <div className="pl-14">
                <p className="text-neutral-700">
                  TBS has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by TBS of the site. Use of any such linked website is at the user's own risk.
                </p>
              </div>
            </div>
            
            <div className="mb-10">
              <div className="flex items-center mb-4">
                <div className="bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center mr-4">
                  <span className="text-primary font-bold">7</span>
                </div>
                <h2 className="text-2xl font-heading font-semibold text-primary m-0">Modifications</h2>
              </div>
              <div className="pl-14">
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-yellow-700">
                        TBS may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mb-10">
              <div className="flex items-center mb-4">
                <div className="bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center mr-4">
                  <span className="text-primary font-bold">8</span>
                </div>
                <h2 className="text-2xl font-heading font-semibold text-primary m-0">Governing Law</h2>
              </div>
              <div className="pl-14">
                <p className="text-neutral-700">
                  These terms and conditions are governed by and construed in accordance with the laws and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
                </p>
              </div>
            </div>
            
            <div className="mb-10">
              <div className="flex items-center mb-4">
                <div className="bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center mr-4">
                  <span className="text-primary font-bold">9</span>
                </div>
                <h2 className="text-2xl font-heading font-semibold text-primary m-0">Contact Us</h2>
              </div>
              <div className="pl-14">
                <p className="text-neutral-700 mb-4">
                  If you have any questions about these Terms of Service, please contact us at:
                </p>
                <div className="bg-neutral-50 rounded-lg p-6 border border-neutral-200 flex items-start">
                  <div className="mr-4 text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-primary">Email:</p>
                    <p className="text-neutral-700">legal@thebusinesssidekick.com</p>
                  </div>
                </div>
                <div className="bg-neutral-50 rounded-lg p-6 border border-neutral-200 flex items-start mt-4">
                  <div className="mr-4 text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-primary">Address:</p>
                    <p className="text-neutral-700">123 Business Avenue, Suite 456<br />Enterprise City, EC 78901</p>
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

export default TermsOfServicePage;