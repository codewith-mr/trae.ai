"use client";

import MainLayout from '@/components/layout/MainLayout';
import Image from 'next/image';
import Link from 'next/link';

export default function CommunityPage() {
  return (
    <MainLayout>
      <div className="bg-primary py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
            Join Our Community
          </h1>
          <p className="text-xl text-secondary max-w-2xl">
            Connect with like-minded entrepreneurs and grow together.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="space-y-8">
          <div>
            <h2 className="text-3xl font-heading font-bold text-text mb-4">Join Our Community</h2>
            <p className="text-neutral-700 mb-6">
              Connect with like-minded entrepreneurs, freelancers, and business owners who are on the same journey as you. Share ideas, get feedback, and find support in our thriving community.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-1">
                <h3 className="text-xl font-heading font-bold text-primary mb-2">Online Forum</h3>
                <p className="text-neutral-700 mb-4">
                  Our private forum is a safe space to ask questions, share your wins, and get help when you're stuck. With thousands of active members, you'll never feel alone on your entrepreneurial journey.
                </p>
                <Link
                  href="#"
                  className="inline-block px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors font-medium"
                >
                  Join the Forum
                </Link>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-1">
                <h3 className="text-xl font-heading font-bold text-primary mb-2">Monthly Meetups</h3>
                <p className="text-neutral-700 mb-4">
                  We host virtual and in-person meetups every month where you can network with other members, learn from guest speakers, and participate in workshops designed to help you grow your business.
                </p>
                <Link
                  href="#"
                  className="inline-block px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors font-medium"
                >
                  View Upcoming Events
                </Link>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-heading font-bold text-text mb-4">Community Guidelines</h2>
            <div className="bg-white p-6 rounded-lg shadow-1">
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-primary font-bold mr-2">•</span>
                  <p className="text-neutral-700">Be respectful and supportive of other members.</p>
                </li>
                <li className="flex items-start">
                  <span className="text-primary font-bold mr-2">•</span>
                  <p className="text-neutral-700">Share your knowledge and experiences generously.</p>
                </li>
                <li className="flex items-start">
                  <span className="text-primary font-bold mr-2">•</span>
                  <p className="text-neutral-700">No self-promotion or spam without prior approval.</p>
                </li>
                <li className="flex items-start">
                  <span className="text-primary font-bold mr-2">•</span>
                  <p className="text-neutral-700">Respect the privacy and confidentiality of other members.</p>
                </li>
                <li className="flex items-start">
                  <span className="text-primary font-bold mr-2">•</span>
                  <p className="text-neutral-700">Provide constructive feedback when asked.</p>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-primary rounded-lg shadow-1 p-8 text-center">
            <h2 className="text-2xl font-heading font-bold text-white mb-4">Ready to Join Our Community?</h2>
            <p className="text-secondary max-w-2xl mx-auto mb-6">
              Get access to our private forum, monthly meetups, exclusive resources, and more.
            </p>
            <Link
              href="#"
              className="inline-block px-6 py-3 bg-secondary text-primary rounded-md hover:bg-white transition-colors font-medium"
            >
              Join Now
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}