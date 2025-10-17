"use client";

import MainLayout from '@/components/layout/MainLayout';
import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <MainLayout>
      <div className="bg-primary py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-accent bg-opacity-30"></div>
          <div className="absolute -top-10 -right-10 w-64 h-64 bg-secondary rounded-full blur-3xl opacity-30"></div>
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-accent rounded-full blur-3xl opacity-20"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-background mb-6 drop-shadow-lg">
            About The Business Sidekick
          </h1>
          <p className="text-xl text-secondary max-w-2xl drop-shadow-md">
            Learn more about our mission, team, and the community that makes it all possible.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="space-y-16 max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8 items-center bg-background p-8 rounded-xl shadow-lg border border-secondary">
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl font-heading font-bold text-primary mb-4 drop-shadow-md">Our Story</h2>
              <p className="text-text mb-4">
                The Business Sidekick was founded in 2020 with a simple mission: to help entrepreneurs, freelancers, and small business owners build sustainable income streams and achieve financial freedom.
              </p>
              <p className="text-text mb-4">
                What started as a small blog sharing personal experiences has grown into a comprehensive resource hub with courses, tools, and a thriving community of like-minded individuals.
              </p>
              <p className="text-text">
                Our team of experienced entrepreneurs, marketers, and financial experts is dedicated to providing practical, actionable advice that you can implement immediately to grow your business and increase your income.
              </p>
            </div>
            <div className="w-full md:w-1/2 relative h-64 md:h-96">
              <div className="absolute inset-0 rounded-lg overflow-hidden border-2 border-primary">
                <Image
                  src="/placeholder-blog.jpg"
                  alt="The Business Sidekick Team"
                  fill
                  className="object-cover rounded-lg shadow-md brightness-90 hover:brightness-100 transition-all duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-accent to-transparent opacity-40"></div>
              </div>
            </div>
          </div>

          <div className="bg-background p-8 rounded-xl shadow-lg border border-secondary">
            <h2 className="text-3xl font-heading font-bold text-primary mb-6 text-center drop-shadow-md">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-background p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border-t-4 border-primary hover:border-accent group">
                <h3 className="text-xl font-heading font-bold text-primary mb-2 group-hover:text-accent transition-colors duration-300">Practical Knowledge</h3>
                <p className="text-text">
                  We focus on actionable strategies that produce real results, not theoretical concepts that sound good but don't work in practice.
                </p>
              </div>
              <div className="bg-background p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border-t-4 border-primary hover:border-accent group">
                <h3 className="text-xl font-heading font-bold text-primary mb-2 group-hover:text-accent transition-colors duration-300">Transparency</h3>
                <p className="text-text">
                  We're honest about what works and what doesn't. We share our successes and failures so you can learn from our experiences.
                </p>
              </div>
              <div className="bg-background p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border-t-4 border-primary hover:border-accent group">
                <h3 className="text-xl font-heading font-bold text-primary mb-2 group-hover:text-accent transition-colors duration-300">Community</h3>
                <p className="text-text">
                  We believe in the power of connection and support. Our community is a place where entrepreneurs can share ideas, get feedback, and find encouragement.
                </p>
              </div>
            </div>
          </div>

          <div className=" p-10 rounded-xl">
            <h2 className="text-3xl font-heading font-bold text-primary mb-10 text-center">Our Team</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center bg-background p-6 rounded-lg shadow-md transform hover:-translate-y-1 transition-all duration-300">
                <div className="relative w-28 h-28 mx-auto mb-4 overflow-hidden rounded-full border-4 border-primary">
                  <Image
                    src="/user-avatar.svg"
                    alt="Sarah Johnson"
                    fill
                    className="object-cover rounded-full"
                  />
                </div>
                <h3 className="text-xl font-heading font-bold text-primary mb-1">Sarah Johnson</h3>
                <p className="text-text mb-3">Founder & CEO</p>
                <div className="w-12 h-1 bg-accent mx-auto"></div>
              </div>
              <div className="text-center bg-background p-6 rounded-lg shadow-md transform hover:-translate-y-1 transition-all duration-300">
                <div className="relative w-28 h-28 mx-auto mb-4 overflow-hidden rounded-full border-4 border-primary">
                    <Image
                      src="/user-avatar.svg"
                      alt="Michael Chen"
                      fill
                      className="object-cover rounded-full"
                    />
                  </div>
                <h3 className="text-xl font-heading font-bold text-primary mb-1">Michael Chen</h3>
                <p className="text-text mb-3">CTO</p>
                <div className="w-12 h-1 bg-accent mx-auto"></div>
              </div>
              <div className="text-center bg-background p-6 rounded-lg shadow-md transform hover:-translate-y-1 transition-all duration-300">
                <div className="relative w-28 h-28 mx-auto mb-4 overflow-hidden rounded-full border-4 border-primary">
                  <Image
                    src="/user-avatar.svg"
                    alt="Jessica Williams"
                    fill
                    className="object-cover rounded-full"
                  />
                </div>
                <h3 className="text-xl font-heading font-bold text-primary mb-1">Jessica Williams</h3>
                <p className="text-text mb-3">Head of Content</p>
                <div className="w-12 h-1 bg-accent mx-auto"></div>
              </div>
              <div className="text-center bg-background p-6 rounded-lg shadow-md transform hover:-translate-y-1 transition-all duration-300">
                <div className="relative w-28 h-28 mx-auto mb-4 overflow-hidden rounded-full border-4 border-primary">
                  <Image
                    src="/user-avatar.svg"
                    alt="David Rodriguez"
                    fill
                    className="object-cover rounded-full"
                  />
                </div>
                <h3 className="text-xl font-heading font-bold text-primary mb-1">David Rodriguez</h3>
                <p className="text-text mb-3">Marketing Director</p>
                <div className="w-12 h-1 bg-accent mx-auto"></div>
              </div>
            </div>
          </div>
          
          <div className="bg-primary p-10 rounded-xl">
            <h2 className="text-3xl font-heading font-bold text-background mb-8 text-center">Join Our Journey</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-background p-8 rounded-lg shadow-md">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-heading font-bold text-primary mb-4">Community</h3>
                  <p className="text-text mb-6 text-center">
                    Join our thriving community of entrepreneurs, freelancers, and business owners who are all on the same journey toward financial freedom.
                  </p>
                  <Link href="/community" className="inline-block px-6 py-3 bg-primary text-background rounded-md hover:bg-accent transition-colors duration-300 font-semibold">
                    Join Now
                  </Link>
                </div>
              </div>
              <div className="bg-background p-8 rounded-lg shadow-md">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-heading font-bold text-primary mb-4">Careers</h3>
                  <p className="text-text mb-6 text-center">
                    We're always looking for talented individuals who are passionate about helping others achieve financial success.
                  </p>
                  <Link href="/careers" className="inline-block px-6 py-3 bg-primary text-background rounded-md hover:bg-accent transition-colors duration-300 font-semibold">
                    View Openings
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}