"use client";

import MainLayout from '@/components/layout/MainLayout';
import Link from 'next/link';

export default function CareersPage() {
  return (
    <MainLayout>
      <div className="bg-primary py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
            Careers
          </h1>
          <p className="text-xl text-secondary max-w-2xl">
            Join our team and help entrepreneurs succeed.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="space-y-12">
          <div>
            <h2 className="text-3xl font-heading font-bold text-text mb-6">Why Work With Us?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-1">
                <h3 className="text-xl font-heading font-bold text-primary mb-2">Mission-Driven</h3>
                <p className="text-neutral-700">
                  We're passionate about helping entrepreneurs and small businesses succeed. Every day, you'll contribute to making a real difference in people's lives and businesses.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-1">
                <h3 className="text-xl font-heading font-bold text-primary mb-2">Remote-First</h3>
                <p className="text-neutral-700">
                  We believe in flexibility and work-life balance. Our team is fully remote, allowing you to work from anywhere while collaborating with talented individuals from around the world.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-1">
                <h3 className="text-xl font-heading font-bold text-primary mb-2">Growth Opportunities</h3>
                <p className="text-neutral-700">
                  We invest in our team's professional development. You'll have access to learning resources, mentorship, and clear paths for advancement within our growing company.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-heading font-bold text-text mb-6">Open Positions</h2>
            <div className="space-y-4">
              <div className="bg-white p-6 rounded-lg shadow-1">
                <h3 className="text-xl font-heading font-bold text-primary mb-2">Content Marketing Specialist</h3>
                <p className="text-neutral-700 mb-4">
                  We're looking for a talented content marketer to create engaging, valuable content for our blog, courses, and marketing materials. The ideal candidate has experience creating content for entrepreneurs and small businesses.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-primary-light text-primary rounded-full text-sm">Full-Time</span>
                  <span className="px-3 py-1 bg-primary-light text-primary rounded-full text-sm">Remote</span>
                  <span className="px-3 py-1 bg-primary-light text-primary rounded-full text-sm">Marketing</span>
                </div>
                <Link
                  href="#"
                  className="inline-block px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors font-medium"
                >
                  Apply Now
                </Link>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-1">
                <h3 className="text-xl font-heading font-bold text-primary mb-2">Frontend Developer</h3>
                <p className="text-neutral-700 mb-4">
                  We're seeking a frontend developer with experience in React and Next.js to help build and improve our web applications. You'll work closely with our design and product teams to create intuitive, user-friendly interfaces.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-primary-light text-primary rounded-full text-sm">Full-Time</span>
                  <span className="px-3 py-1 bg-primary-light text-primary rounded-full text-sm">Remote</span>
                  <span className="px-3 py-1 bg-primary-light text-primary rounded-full text-sm">Development</span>
                </div>
                <Link
                  href="#"
                  className="inline-block px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors font-medium"
                >
                  Apply Now
                </Link>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-1">
                <h3 className="text-xl font-heading font-bold text-primary mb-2">Customer Success Manager</h3>
                <p className="text-neutral-700 mb-4">
                  We're looking for a customer success manager to help our users get the most out of our courses and tools. You'll provide support, gather feedback, and work with our product team to improve the user experience.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-primary-light text-primary rounded-full text-sm">Full-Time</span>
                  <span className="px-3 py-1 bg-primary-light text-primary rounded-full text-sm">Remote</span>
                  <span className="px-3 py-1 bg-primary-light text-primary rounded-full text-sm">Customer Support</span>
                </div>
                <Link
                  href="#"
                  className="inline-block px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors font-medium"
                >
                  Apply Now
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-primary rounded-lg shadow-1 p-8 text-center">
            <h2 className="text-2xl font-heading font-bold text-white mb-4">Don't See the Right Fit?</h2>
            <p className="text-secondary max-w-2xl mx-auto mb-6">
              We're always looking for talented individuals to join our team. Send us your resume and let us know how you can contribute to our mission.
            </p>
            <Link
              href="/contact"
              className="inline-block px-6 py-3 bg-secondary text-primary rounded-md hover:bg-white transition-colors font-medium"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}