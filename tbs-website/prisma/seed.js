const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

async function main() {
  const adminUsername = process.env.ADMIN_USERNAME || 'admin';
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
  const hashed = await bcrypt.hash(adminPassword, 10);

  await prisma.adminUser.upsert({
    where: { username: adminUsername },
    update: { password: hashed },
    create: { username: adminUsername, password: hashed },
  });

  // Seed Courses (mirroring src/app/courses/coursesData.ts)
  const courses = [
    {
      slug: 'freelance-web-development',
      title: 'Freelance Web Development Masterclass',
      description: 'Learn how to build a successful freelance web development business from scratch. This course covers everything from finding clients to delivering projects.',
      instructor: 'Sarah Johnson',
      level: 'Intermediate',
      duration: '12 hours',
      price: 199.99,
      discountPrice: 149.99,
      rating: 4.8,
      reviewCount: 245,
      imageUrl: '/web.svg',
      category: 'Freelancing',
    },
    {
      slug: 'youtube-growth-strategy',
      title: 'YouTube Growth Strategy 2023',
      description: 'Discover proven strategies to grow your YouTube channel, increase engagement, and monetize your content effectively.',
      instructor: 'Michael Chen',
      level: 'Beginner',
      duration: '8 hours',
      price: 149.99,
      rating: 4.7,
      reviewCount: 189,
      imageUrl: '/course-content-creation.svg',
      category: 'Content Creation',
    },
    {
      slug: 'stock-trading-fundamentals',
      title: 'Stock Trading Fundamentals',
      description: 'Master the basics of stock trading with practical examples and real-world case studies. Learn risk management and portfolio building.',
      instructor: 'Alex Rivera',
      level: 'Advanced',
      duration: '15 hours',
      price: 249.99,
      discountPrice: 199.99,
      rating: 4.9,
      reviewCount: 312,
      imageUrl: '/course_img.jpg',
      category: 'Trading',
    },
    {
      slug: 'digital-marketing-essentials',
      title: 'Digital Marketing Essentials',
      description: 'A comprehensive guide to digital marketing strategies including SEO, social media, email marketing, and paid advertising.',
      instructor: 'Emily Rodriguez',
      level: 'Beginner',
      duration: '10 hours',
      price: 179.99,
      discountPrice: 129.99,
      rating: 4.6,
      reviewCount: 178,
      imageUrl: '/course-marketing.svg',
      category: 'Marketing',
    },
    {
      slug: 'cryptocurrency-investing',
      title: 'Cryptocurrency Investing for Beginners',
      description: 'Learn the fundamentals of cryptocurrency investing, blockchain technology, and how to build a diversified crypto portfolio.',
      instructor: 'James Wilson',
      level: 'Beginner',
      duration: '6 hours',
      price: 129.99,
      rating: 4.5,
      reviewCount: 156,
      imageUrl: '/course-investing.svg',
      category: 'Investing',
    },
  ];

  for (const c of courses) {
    await prisma.course.upsert({
      where: { slug: c.slug },
      update: { ...c },
      create: { ...c },
    });
  }

  // Seed Blogs (subset of src/app/blog/blogData.ts)
  const blogs = [
    {
      slug: 'freelance-success-tips',
      title: '10 Essential Tips for Freelance Success in 2023',
      excerpt: 'Discover the key strategies that successful freelancers are using to find high-paying clients and build sustainable businesses.',
      authorName: 'Jessica Miller',
      authorAvatar: '/user-avatar.svg',
      category: 'Tips & Tricks',
      publishDate: 'June 15, 2023',
      readTime: '5 min read',
      imageUrl: '/blog-post.svg',
    },
    {
      slug: 'youtube-algorithm-changes',
      title: "Understanding YouTube's Latest Algorithm Changes",
      excerpt: 'A detailed breakdown of the recent YouTube algorithm updates and how content creators can adapt their strategies accordingly.',
      authorName: 'David Wong',
      authorAvatar: '/user-avatar.svg',
      category: 'Content Creation',
      publishDate: 'June 10, 2023',
      readTime: '8 min read',
      imageUrl: '/blog-post.svg',
    },
    {
      slug: 'passive-income-strategies',
      title: '7 Passive Income Strategies That Actually Work',
      excerpt: 'Explore proven passive income strategies that can help you build wealth and achieve financial freedom over time.',
      authorName: 'Michael Chen',
      authorAvatar: '/user-avatar.svg',
      category: 'Investing',
      publishDate: 'June 5, 2023',
      readTime: '10 min read',
      imageUrl: '/blog-post.svg',
    },
  ];

  for (const b of blogs) {
    await prisma.blog.upsert({
      where: { slug: b.slug },
      update: { ...b },
      create: { ...b },
    });
  }

  // Seed Tips (from src/app/tips-tricks/page.tsx)
  const tips = [
    {
      title: 'How to Access Premium Tools for Free',
      description: 'Learn the legitimate ways to access premium tools without paying full price, including free trials, student discounts, and open-source alternatives.',
      category: 'Tools',
      imageUrl: '/placeholder-blog.svg',
      readTime: '5 min read',
    },
    {
      title: 'Maximize Your Productivity with These Simple Hacks',
      description: 'Discover productivity techniques that can help you get more done in less time, including time blocking, the Pomodoro technique, and effective task prioritization.',
      category: 'Productivity',
      imageUrl: '/placeholder-blog.svg',
      readTime: '7 min read',
    },
    {
      title: 'SEO Tips That Actually Work in 2023',
      description: 'Cut through the noise and focus on SEO strategies that deliver real results, based on the latest algorithm updates and industry best practices.',
      category: 'SEO',
      imageUrl: '/placeholder-blog.svg',
      readTime: '10 min read',
    },
  ];

  for (const t of tips) {
    const slug = slugify(t.title);
    await prisma.tip.upsert({
      where: { slug },
      update: { ...t, slug },
      create: { ...t, slug },
    });
  }

  // Site settings
  await prisma.siteSettings.upsert({
    where: { id: 1 },
    update: {
      siteTitle: 'TBS',
      logoUrl: '/primary2.png',
      footerText: '© TBS. All rights reserved.',
    },
    create: {
      siteTitle: 'TBS',
      logoUrl: '/primary2.png',
      footerText: '© TBS. All rights reserved.',
    },
  });

  // Home settings and featured/latest links
  const home = await prisma.homeSettings.upsert({
    where: { id: 1 },
    update: {
      bannerTitle: 'Learn Practical Skills That Convert Directly Into Income',
      bannerSubtitle:
        'Actionable courses, tools, and resources for freelancers, content creators, and side-hustlers',
      bannerCtaText: 'Explore Courses',
      bannerCtaLink: '/courses',
      bannerSecondaryCtaText: 'Try Free Tools',
      bannerSecondaryCtaLink: '/tools',
    },
    create: {
      bannerTitle: 'Learn Practical Skills That Convert Directly Into Income',
      bannerSubtitle:
        'Actionable courses, tools, and resources for freelancers, content creators, and side-hustlers',
      bannerCtaText: 'Explore Courses',
      bannerCtaLink: '/courses',
      bannerSecondaryCtaText: 'Try Free Tools',
      bannerSecondaryCtaLink: '/tools',
    },
  });

  const featuredCourseSlugs = ['freelance-web-development', 'youtube-growth-strategy', 'stock-trading-fundamentals'];
  for (const slug of featuredCourseSlugs) {
    const course = await prisma.course.findUnique({ where: { slug } });
    if (course) {
      await prisma.homeSettingsFeaturedCourse.upsert({
        where: { id: home.id * 100000 + course.id }, // unique-ish composite via id math to avoid duplicates
        update: {},
        create: { homeSettingsId: home.id, courseId: course.id },
      }).catch(async () => {
        // fallback: check existence then create
        const exists = await prisma.homeSettingsFeaturedCourse.findFirst({ where: { homeSettingsId: home.id, courseId: course.id } });
        if (!exists) await prisma.homeSettingsFeaturedCourse.create({ data: { homeSettingsId: home.id, courseId: course.id } });
      });
    }
  }

  const latestBlogSlugs = ['freelance-success-tips', 'youtube-algorithm-changes'];
  for (const slug of latestBlogSlugs) {
    const blog = await prisma.blog.findUnique({ where: { slug } });
    if (blog) {
      const exists = await prisma.homeSettingsLatestBlog.findFirst({ where: { homeSettingsId: home.id, blogId: blog.id } });
      if (!exists) await prisma.homeSettingsLatestBlog.create({ data: { homeSettingsId: home.id, blogId: blog.id } });
    }
  }

  const latestTipSlugs = tips.map(t => slugify(t.title)).slice(0, 2);
  for (const slug of latestTipSlugs) {
    const tip = await prisma.tip.findUnique({ where: { slug } });
    if (tip) {
      const exists = await prisma.homeSettingsLatestTip.findFirst({ where: { homeSettingsId: home.id, tipId: tip.id } });
      if (!exists) await prisma.homeSettingsLatestTip.create({ data: { homeSettingsId: home.id, tipId: tip.id } });
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

