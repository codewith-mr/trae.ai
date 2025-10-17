"use client";

import MainLayout from '@/components/layout/MainLayout';
import Image from 'next/image';
import Link from 'next/link';

export default function TestimonialsPage() {
  return (
    <MainLayout>
      <div className="bg-primary py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
            Testimonials
          </h1>
          <p className="text-xl text-secondary max-w-2xl">
            See what our community has to say about their experience with The Business Starter.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-1">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <Image
                    src="/images/avatar-1.jpg"
                    alt="Sarah Johnson"
                    width={48}
                    height={48}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-primary">Sarah Johnson</h3>
                  <p className="text-sm text-neutral-600">Freelance Designer</p>
                </div>
              </div>
              <p className="text-neutral-700 italic">
                "The courses on The Business Starter completely transformed my freelance business. I went from struggling to find clients to having a waitlist in just 3 months. The practical strategies and supportive community made all the difference."
              </p>
              <div className="flex text-yellow-400 mt-4">
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-1">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <Image
                    src="/images/avatar-2.jpg"
                    alt="Michael Chen"
                    width={48}
                    height={48}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-primary">Michael Chen</h3>
                  <p className="text-sm text-neutral-600">E-commerce Entrepreneur</p>
                </div>
              </div>
              <p className="text-neutral-700 italic">
                "I was skeptical at first, but the SEO tools and strategies I learned here helped me increase my store's organic traffic by 215% in just 6 months. The ROI on these courses has been incredible."
              </p>
              <div className="flex text-yellow-400 mt-4">
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-1">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <Image
                    src="/images/avatar-3.jpg"
                    alt="Jessica Williams"
                    width={48}
                    height={48}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-primary">Jessica Williams</h3>
                  <p className="text-sm text-neutral-600">Content Creator</p>
                </div>
              </div>
              <p className="text-neutral-700 italic">
                "The content creation tools saved me hours of work each week. I'm now able to produce twice as much content in half the time, which has directly translated to more subscribers and revenue."
              </p>
              <div className="flex text-yellow-400 mt-4">
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-1">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <Image
                    src="/images/avatar-4.jpg"
                    alt="David Rodriguez"
                    width={48}
                    height={48}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-primary">David Rodriguez</h3>
                  <p className="text-sm text-neutral-600">Marketing Consultant</p>
                </div>
              </div>
              <p className="text-neutral-700 italic">
                "As a marketing consultant, I'm always looking for new strategies to share with my clients. The Business Starter consistently provides cutting-edge tactics that work in the real world, not just theory."
              </p>
              <div className="flex text-yellow-400 mt-4">
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-1">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <Image
                    src="/images/avatar-5.jpg"
                    alt="Emily Thompson"
                    width={48}
                    height={48}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-primary">Emily Thompson</h3>
                  <p className="text-sm text-neutral-600">Small Business Owner</p>
                </div>
              </div>
              <p className="text-neutral-700 italic">
                "The community aspect of The Business Starter has been invaluable. Being able to connect with other entrepreneurs facing similar challenges has provided both practical solutions and emotional support."
              </p>
              <div className="flex text-yellow-400 mt-4">
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-1">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <Image
                    src="/images/avatar-6.jpg"
                    alt="James Wilson"
                    width={48}
                    height={48}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-primary">James Wilson</h3>
                  <p className="text-sm text-neutral-600">Startup Founder</p>
                </div>
              </div>
              <p className="text-neutral-700 italic">
                "The tools and resources here helped me validate my business idea before investing significant time and money. This saved me from making costly mistakes and helped me pivot to a more viable model."
              </p>
              <div className="flex text-yellow-400 mt-4">
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
              </div>
            </div>
          </div>

          <div className="bg-primary rounded-lg shadow-1 p-8 text-center">
            <h2 className="text-2xl font-heading font-bold text-white mb-4">Share Your Story</h2>
            <p className="text-secondary max-w-2xl mx-auto mb-6">
              Has The Business Starter helped you grow your business? We'd love to hear about your experience!
            </p>
            <Link
              href="/contact"
              className="inline-block px-6 py-3 bg-secondary text-primary rounded-md hover:bg-white transition-colors font-medium"
            >
              Submit Your Testimonial
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}