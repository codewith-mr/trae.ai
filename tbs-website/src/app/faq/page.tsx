"use client";

import MainLayout from '@/components/layout/MainLayout';
import Link from 'next/link';
import { useState } from 'react';

export default function FAQPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const faqs = [
    {
      question: "How do I get started with The Business Starter?",
      answer: "Getting started is easy! Simply create a free account and explore our free resources. When you're ready to dive deeper, you can enroll in one of our courses or join our community for more personalized support."
    },
    {
      question: "Are the courses self-paced?",
      answer: "Yes, all our courses are completely self-paced. You can start, pause, and resume your learning journey whenever it fits your schedule. Once you purchase a course, you have lifetime access to the content, including any future updates."
    },
    {
      question: "Do you offer refunds?",
      answer: "We offer a 30-day money-back guarantee on all our courses. If you're not satisfied with your purchase for any reason, simply contact our support team within 30 days for a full refund, no questions asked."
    },
    {
      question: "How often are new courses and tools added?",
      answer: "We regularly update our content library with new courses, tools, and resources. On average, we add 1-2 new courses per quarter and update existing courses to ensure the information remains current and valuable."
    },
    {
      question: "Can I use the tools for client work?",
      answer: "Absolutely! All our tools and resources can be used for both personal projects and client work. We do ask that you don't resell or distribute our tools directly, but the output you create with them is entirely yours."
    },
    {
      question: "Is there a community I can join?",
      answer: "Yes, we have a thriving community of entrepreneurs, freelancers, and business owners. You can join our community through our membership plans, which give you access to our private forum, monthly meetups, and exclusive resources."
    },
    {
      question: "Do you offer coaching or consulting services?",
      answer: "We offer limited 1-on-1 coaching sessions for our premium members. These sessions are designed to provide personalized guidance and feedback on your specific business challenges. You can book these sessions directly from your member dashboard."
    },
    {
      question: "How can I contribute to The Business Starter?",
      answer: "We welcome contributions from our community! If you're interested in becoming a guest writer, speaker, or course instructor, please reach out to our team with your proposal and portfolio. We're always looking for fresh perspectives and expertise to share with our community."
    }
  ];

  return (
    <MainLayout>
      <div className="bg-primary py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-secondary max-w-2xl">
            Find answers to common questions about our courses, tools, and community.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-lg shadow-1 overflow-hidden">
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
                onClick={() => toggleFAQ(index)}
              >
                <h3 className="font-heading font-bold text-primary text-lg">{faq.question}</h3>
                <span className={`transform transition-transform ${openFAQ === index ? 'rotate-180' : ''}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </span>
              </button>
              <div
                className={`px-6 overflow-hidden transition-all duration-300 ${openFAQ === index ? 'max-h-96 py-4' : 'max-h-0 py-0'}`}
              >
                <p className="text-neutral-700">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-neutral-700 mb-4">Don't see your question here?</p>
          <Link
            href="/contact"
            className="inline-block px-6 py-3 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors font-medium"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </MainLayout>
  );
}