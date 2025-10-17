"use client";

import MainLayout from '@/components/layout/MainLayout';
import ToolCard, { ToolCardProps } from '@/components/cards/ToolCard';
import Link from 'next/link';
import { useState } from 'react';

// Tool categories
const toolCategories = [
  {
    id: 'general',
    name: 'General Utilities',
    icon: '🔢',
  },
  {
    id: 'business',
    name: 'Business & Productivity',
    icon: '💼',
  },
  {
    id: 'writing',
    name: 'Writing & Content',
    icon: '🧠',
  },
  {
    id: 'web',
    name: 'Web & SEO',
    icon: '🌐',
  },
  {
    id: 'design',
    name: 'Design & Visual',
    icon: '🎨',
  },
  {
    id: 'social',
    name: 'Social Media & Marketing',
    icon: '📱',
  },
  {
    id: 'developer',
    name: 'Developer & Tech',
    icon: '🛠️',
  },
  {
    id: 'education',
    name: 'Education & Learning',
    icon: '📚',
  },
];

// Mock data for tools
const tools: ToolCardProps[] = [
  // General Utilities
  {
    id: 'calculator',
    slug: 'calculator',
    title: 'Calculator',
    description: 'Basic, scientific, and financial calculations for all your mathematical needs.',
    category: 'General Utilities',
    imageUrl: '/tool-image.svg',
    isPopular: true,
    toolUrl: '/tools/calculator',
  },
  {
    id: 'unit-converter',
    slug: 'unit-converter',
    title: 'Unit Converter',
    description: 'Convert length, weight, temperature, currency, and more with this comprehensive unit conversion tool.',
    category: 'General Utilities',
    imageUrl: '/placeholder-tool.svg',
    isFree: true,
    toolUrl: '/tools/unit-converter',
  },
  {
    id: 'currency-converter',
    slug: 'currency-converter',
    title: 'Currency Converter',
    description: 'Get real-time exchange rates and convert between different currencies instantly.',
    category: 'General Utilities',
    imageUrl: '/placeholder-tool.svg',
    isFree: true,
    toolUrl: '/tools/currency-converter',
  },
  {
    id: 'date-calculator',
    slug: 'date-calculator',
    title: 'Date Calculator',
    description: 'Add or subtract days, find days between dates, and calculate time differences.',
    category: 'General Utilities',
    imageUrl: '/placeholder-tool.svg',
    toolUrl: '/tools/date-calculator',
  },
  {
    id: 'world-clock',
    slug: 'world-clock',
    title: 'World Clock / Time Zone Converter',
    description: 'Check the current time in multiple locations and convert between different time zones.',
    category: 'General Utilities',
    imageUrl: '/placeholder-tool.svg',
    toolUrl: '/tools/world-clock',
  },
  {
    id: 'pdf-tools',
    slug: 'pdf-tools',
    title: 'PDF Tools',
    description: 'Merge, split, compress, and convert PDF files to other formats like Word, Excel, and more.',
    category: 'General Utilities',
    imageUrl: '/placeholder-tool.svg',
    isPopular: true,
  },
  
  // Business & Productivity Tools
  {
    id: 'invoice-generator',
    slug: 'invoice-generator',
    title: 'Invoice Generator',
    description: 'Create professional invoices for your business in seconds with customizable templates.',
    category: 'Business & Productivity',
    imageUrl: '/placeholder-tool.svg',
    isFree: true,
  },
  {
    id: 'todo-list',
    slug: 'todo-list',
    title: 'To-Do List & Task Manager',
    description: 'Organize your tasks, set priorities, and track your progress with this intuitive task manager.',
    category: 'Business & Productivity',
    imageUrl: '/placeholder-tool.svg',
    isNew: true,
  },
  {
    id: 'meeting-scheduler',
    slug: 'meeting-scheduler',
    title: 'Meeting Scheduler',
    description: 'Schedule meetings efficiently by sharing your availability and letting others book time slots.',
    category: 'Business & Productivity',
    imageUrl: '/placeholder-tool.svg',
  },
  {
    id: 'time-tracker',
    slug: 'time-tracker',
    title: 'Time Tracker',
    description: 'Track time spent on projects and tasks to improve productivity and billing accuracy.',
    category: 'Business & Productivity',
    imageUrl: '/placeholder-tool.svg',
    isPopular: true,
  },
  {
    id: 'budget-tracker',
    slug: 'budget-tracker',
    title: 'Budget Tracker / Expense Manager',
    description: 'Monitor your income and expenses, create budgets, and gain insights into your spending habits.',
    category: 'Business & Productivity',
    imageUrl: '/placeholder-tool.svg',
  },
  
  // Writing & Content Tools
  {
    id: 'grammar-checker',
    slug: 'grammar-checker',
    title: 'Grammar Checker',
    description: 'Improve your writing by checking grammar, spelling, punctuation, and style issues.',
    category: 'Writing & Content',
    imageUrl: '/placeholder-tool.svg',
    isPopular: true,
  },
  {
    id: 'plagiarism-checker',
    slug: 'plagiarism-checker',
    title: 'Plagiarism Checker',
    description: 'Verify the originality of your content and avoid unintentional plagiarism.',
    category: 'Writing & Content',
    imageUrl: '/placeholder-tool.svg',
  },
  {
    id: 'ai-writing-assistant',
    slug: 'ai-writing-assistant',
    title: 'AI Writing Assistant',
    description: 'Generate, improve, and refine your content with the help of advanced AI technology.',
    category: 'Writing & Content',
    imageUrl: '/placeholder-tool.svg',
    isNew: true,
  },
  {
    id: 'text-summarizer',
    slug: 'text-summarizer',
    title: 'Text Summarizer',
    description: 'Condense long articles and documents into concise summaries without losing key information.',
    category: 'Writing & Content',
    imageUrl: '/placeholder-tool.svg',
    isFree: true,
  },
  {
    id: 'paraphraser',
    slug: 'paraphraser',
    title: 'Paraphraser / Rewriter',
    description: 'Rewrite content to improve clarity, avoid repetition, or create unique variations.',
    category: 'Writing & Content',
    imageUrl: '/placeholder-tool.svg',
  },
  {
    id: 'hashtag-generator',
    slug: 'hashtag-generator',
    title: 'Hashtag Generator',
    description: 'Create relevant hashtags for Instagram, TikTok, LinkedIn, and other social platforms.',
    category: 'Writing & Content',
    imageUrl: '/placeholder-tool.svg',
    isFree: true,
  },
  {
    id: 'emoji-finder',
    slug: 'emoji-finder',
    title: 'Emoji Finder',
    description: 'Convert words to emojis or quickly find and copy the perfect emoji for your content.',
    category: 'Writing & Content',
    imageUrl: '/placeholder-tool.svg',
    isFree: true,
  },
  
  // Web & SEO Tools
  {
    id: 'qr-code-generator',
    slug: 'qr-code-generator',
    title: 'QR Code Generator',
    description: 'Create custom QR codes for websites, contact information, Wi-Fi networks, and more.',
    category: 'Web & SEO',
    imageUrl: '/placeholder-tool.svg',
    isFree: true,
  },
  {
    id: 'short-url-generator',
    slug: 'short-url-generator',
    title: 'Short URL Generator',
    description: 'Shorten long URLs for easier sharing on social media and in messages.',
    category: 'Web & SEO',
    imageUrl: '/placeholder-tool.svg',
    isFree: true,
  },
  {
    id: 'meta-tag-generator',
    slug: 'meta-tag-generator',
    title: 'Meta Tag Generator',
    description: 'Create optimized meta tags for your website to improve SEO and social sharing.',
    category: 'Web & SEO',
    imageUrl: '/placeholder-tool.svg',
  },
  {
    id: 'favicon-generator',
    slug: 'favicon-generator',
    title: 'Favicon Generator',
    description: 'Create favicons for your website from images or text in various formats and sizes.',
    category: 'Web & SEO',
    imageUrl: '/placeholder-tool.svg',
  },
  {
    id: 'website-speed-checker',
    slug: 'website-speed-checker',
    title: 'Website Speed Checker',
    description: 'Analyze your website\'s loading speed and get recommendations for improvement.',
    category: 'Web & SEO',
    imageUrl: '/placeholder-tool.svg',
    isPopular: true,
  },
  {
    id: 'mobile-friendly-test',
    slug: 'mobile-friendly-test',
    title: 'Mobile-Friendly Test Tool',
    description: 'Check if your website is optimized for mobile devices and get suggestions for improvements.',
    category: 'Web & SEO',
    imageUrl: '/placeholder-tool.svg',
  },
  {
    id: 'keyword-research-tool',
    slug: 'keyword-research-tool',
    title: 'Keyword Research Tool',
    description: 'Find high-value keywords for your content with search volume, competition, and difficulty metrics.',
    category: 'Web & SEO',
    imageUrl: '/placeholder-tool.svg',
    isPopular: true,
  },
  
  // Design & Visual Tools
  {
    id: 'image-resizer',
    slug: 'image-resizer',
    title: 'Image Resizer / Compressor',
    description: 'Resize and compress images without losing quality for faster website loading.',
    category: 'Design & Visual',
    imageUrl: '/placeholder-tool.svg',
    isFree: true,
  },
  {
    id: 'color-picker',
    slug: 'color-picker',
    title: 'Color Picker / Palette Generator',
    description: 'Create harmonious color palettes for your designs and get color codes in various formats.',
    category: 'Design & Visual',
    imageUrl: '/placeholder-tool.svg',
    isFree: true,
  },
  {
    id: 'online-design-tool',
    slug: 'online-design-tool',
    title: 'Online Design Tool',
    description: 'Create graphics, presentations, social media posts, and more with this versatile design tool.',
    category: 'Design & Visual',
    imageUrl: '/placeholder-tool.svg',
    isPopular: true,
  },
  {
    id: 'meme-generator',
    slug: 'meme-generator',
    title: 'Meme Generator',
    description: 'Create funny memes with popular templates or upload your own images.',
    category: 'Design & Visual',
    imageUrl: '/placeholder-tool.svg',
    isFree: true,
  },
  {
    id: 'logo-maker',
    slug: 'logo-maker',
    title: 'Logo Maker',
    description: 'Design a professional logo for your business or project with customizable templates.',
    category: 'Design & Visual',
    imageUrl: '/placeholder-tool.svg',
  },
  {
    id: 'infographic-maker',
    slug: 'infographic-maker',
    title: 'Infographic Maker',
    description: 'Create visually appealing infographics to present data and information effectively.',
    category: 'Design & Visual',
    imageUrl: '/placeholder-tool.svg',
  },
  
  // Social Media & Marketing
  {
    id: 'social-media-scheduler',
    slug: 'social-media-scheduler',
    title: 'Social Media Post Scheduler',
    description: 'Plan and schedule your social media posts across multiple platforms in advance.',
    category: 'Social Media & Marketing',
    imageUrl: '/placeholder-tool.svg',
    isPopular: true,
  },
  {
    id: 'social-hashtag-generator',
    slug: 'social-hashtag-generator',
    title: 'Hashtag Generator',
    description: 'Find trending and relevant hashtags to increase the reach of your social media posts.',
    category: 'Social Media & Marketing',
    imageUrl: '/placeholder-tool.svg',
    isFree: true,
  },
  {
    id: 'content-calendar',
    slug: 'content-calendar',
    title: 'Content Calendar Tool',
    description: 'Plan and organize your content strategy with a visual calendar and scheduling features.',
    category: 'Social Media & Marketing',
    imageUrl: '/placeholder-tool.svg',
  },
  {
    id: 'bio-link-generator',
    slug: 'bio-link-generator',
    title: 'Bio Link Generator',
    description: 'Create a single link for your social media bio that leads to multiple destinations.',
    category: 'Social Media & Marketing',
    imageUrl: '/placeholder-tool.svg',
    isFree: true,
  },
  {
    id: 'caption-generator',
    slug: 'caption-generator',
    title: 'Caption Generator',
    description: 'Generate engaging captions for your social media posts to increase engagement.',
    category: 'Social Media & Marketing',
    imageUrl: '/placeholder-tool.svg',
    isNew: true,
  },
  {
    id: 'analytics-tools',
    slug: 'analytics-tools',
    title: 'Analytics Tools',
    description: 'Track engagement, followers, and trends across your social media platforms.',
    category: 'Social Media & Marketing',
    imageUrl: '/placeholder-tool.svg',
  },
  
  // Developer & Tech Tools
  {
    id: 'json-formatter',
    slug: 'json-formatter',
    title: 'JSON Formatter / Validator',
    description: 'Format, validate, and beautify JSON data for easier reading and debugging.',
    category: 'Developer & Tech',
    imageUrl: '/placeholder-tool.svg',
    isFree: true,
  },
  {
    id: 'regex-tester',
    slug: 'regex-tester',
    title: 'Regex Tester',
    description: 'Test and debug regular expressions with real-time highlighting and explanation.',
    category: 'Developer & Tech',
    imageUrl: '/placeholder-tool.svg',
    isFree: true,
  },
  {
    id: 'lorem-ipsum',
    slug: 'lorem-ipsum',
    title: 'Lorem Ipsum Generator',
    description: 'Generate placeholder text for design mockups, layouts, and content drafts.',
    category: 'Developer & Tech',
    imageUrl: '/placeholder-tool.svg',
    isFree: true,
  },
  {
    id: 'code-formatter',
    slug: 'code-formatter',
    title: 'Code Beautifier / Formatter',
    description: 'Format and beautify code in various programming languages for better readability.',
    category: 'Developer & Tech',
    imageUrl: '/placeholder-tool.svg',
    isPopular: true,
  },
  {
    id: 'uuid-generator',
    slug: 'uuid-generator',
    title: 'UUID Generator',
    description: 'Generate random UUIDs (Universally Unique Identifiers) for your applications.',
    category: 'Developer & Tech',
    imageUrl: '/placeholder-tool.svg',
    isFree: true,
  },
  {
    id: 'color-code-converter',
    slug: 'color-code-converter',
    title: 'Color Code Converter',
    description: 'Convert between different color formats like HEX, RGB, HSL, and CMYK.',
    category: 'Developer & Tech',
    imageUrl: '/placeholder-tool.svg',
    isFree: true,
  },
  {
    id: 'markdown-editor',
    slug: 'markdown-editor',
    title: 'Markdown Editor',
    description: 'Write and preview Markdown with syntax highlighting and live preview.',
    category: 'Developer & Tech',
    imageUrl: '/placeholder-tool.svg',
  },
  
  // Education & Learning Tools
  {
    id: 'citation-generator',
    slug: 'citation-generator',
    title: 'Citation Generator',
    description: 'Create citations in MLA, APA, Chicago, and other formats for academic papers.',
    category: 'Education & Learning',
    imageUrl: '/placeholder-tool.svg',
    isFree: true,
  },
  {
    id: 'flashcard-app',
    slug: 'flashcard-app',
    title: 'Flashcard App',
    description: 'Create digital flashcards for effective studying and memorization.',
    category: 'Education & Learning',
    imageUrl: '/placeholder-tool.svg',
  },
  {
    id: 'language-translator',
    slug: 'language-translator',
    title: 'Language Translator',
    description: 'Translate text between multiple languages with high accuracy.',
    category: 'Education & Learning',
    imageUrl: '/placeholder-tool.svg',
    isPopular: true,
  },
  {
    id: 'dictionary',
    slug: 'dictionary',
    title: 'Dictionary / Thesaurus',
    description: 'Look up word definitions, synonyms, antonyms, and usage examples.',
    category: 'Education & Learning',
    imageUrl: '/placeholder-tool.svg',
    isFree: true,
  },
  {
    id: 'math-solver',
    slug: 'math-solver',
    title: 'Math Solver',
    description: 'Solve complex mathematical problems with step-by-step explanations.',
    category: 'Education & Learning',
    imageUrl: '/placeholder-tool.svg',
  },
  {
    id: 'mind-map-maker',
    slug: 'mind-map-maker',
    title: 'Mind Map Maker',
    description: 'Create visual mind maps to organize ideas, concepts, and information.',
    category: 'Education & Learning',
    imageUrl: '/placeholder-tool.svg',
    isNew: true,
  },
];

// Categories for filtering
const categories = [
  'All',
  'General Utilities',
  'Business & Productivity',
  'Writing & Content',
  'Web & SEO',
  'Design & Visual',
  'Social Media & Marketing',
  'Developer & Tech',
  'Education & Learning',
];

export default function ToolsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <MainLayout>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">Tools & Resources</h1>
          <p className="text-lg text-center max-w-3xl mx-auto mb-8">
            Discover our collection of free and premium tools designed to help you work smarter, not harder.
          </p>
        </div>
      </div>

      {/* Category Navigation */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Tool Categories */}
      <div className="container mx-auto px-4 py-8">
        {toolCategories.map((category) => {
          const categoryTools = tools.filter(tool => 
            (selectedCategory === 'All' || selectedCategory === category.name) && 
            tool.category === category.name
          );
          
          if (categoryTools.length === 0) return null;
          
          return (
            <div key={category.id} className="mb-16">
              <div className="flex items-center mb-6">
                <span className="text-3xl mr-3">{category.icon}</span>
                <h2 className="text-2xl md:text-3xl font-bold">{category.name}</h2>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {categoryTools.map((tool) => (
                  <ToolCard
                    key={tool.id}
                    id={tool.id}
                    slug={tool.slug}
                    title={tool.title}
                    description={tool.description}
                    category={tool.category}
                    imageUrl={tool.imageUrl}
                    isPopular={tool.isPopular}
                    isNew={tool.isNew}
                    isFree={tool.isFree}
                    toolUrl={tool.toolUrl}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Can't find what you're looking for?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            We're constantly adding new tools to our collection. Let us know what you need!
          </p>
          <Link 
            href="/contact" 
            className="bg-primary hover:bg-primary-dark text-white font-medium px-6 py-3 rounded-lg transition-colors"
          >
            Request a Tool
          </Link>
        </div>
      </div>
    </MainLayout>
  );
}