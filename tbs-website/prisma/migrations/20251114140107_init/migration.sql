-- CreateTable
CREATE TABLE "AdminUser" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Course" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "instructor" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "discountPrice" REAL,
    "rating" REAL,
    "reviewCount" INTEGER,
    "imageUrl" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Blog" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "excerpt" TEXT NOT NULL,
    "content" TEXT,
    "authorName" TEXT NOT NULL,
    "authorAvatar" TEXT,
    "category" TEXT NOT NULL,
    "publishDate" TEXT NOT NULL,
    "readTime" TEXT,
    "imageUrl" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Tip" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "content" TEXT,
    "category" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "readTime" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "HomeSettings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "bannerTitle" TEXT NOT NULL,
    "bannerSubtitle" TEXT NOT NULL,
    "bannerCtaText" TEXT NOT NULL,
    "bannerCtaLink" TEXT NOT NULL,
    "bannerSecondaryCtaText" TEXT NOT NULL,
    "bannerSecondaryCtaLink" TEXT NOT NULL,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "SiteSettings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "siteTitle" TEXT NOT NULL,
    "logoUrl" TEXT NOT NULL,
    "footerText" TEXT NOT NULL,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "HomeSettingsFeaturedCourse" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "homeSettingsId" INTEGER NOT NULL,
    "courseId" INTEGER NOT NULL,
    CONSTRAINT "HomeSettingsFeaturedCourse_homeSettingsId_fkey" FOREIGN KEY ("homeSettingsId") REFERENCES "HomeSettings" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "HomeSettingsFeaturedCourse_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "HomeSettingsLatestBlog" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "homeSettingsId" INTEGER NOT NULL,
    "blogId" INTEGER NOT NULL,
    CONSTRAINT "HomeSettingsLatestBlog_homeSettingsId_fkey" FOREIGN KEY ("homeSettingsId") REFERENCES "HomeSettings" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "HomeSettingsLatestBlog_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "Blog" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "HomeSettingsLatestTip" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "homeSettingsId" INTEGER NOT NULL,
    "tipId" INTEGER NOT NULL,
    CONSTRAINT "HomeSettingsLatestTip_homeSettingsId_fkey" FOREIGN KEY ("homeSettingsId") REFERENCES "HomeSettings" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "HomeSettingsLatestTip_tipId_fkey" FOREIGN KEY ("tipId") REFERENCES "Tip" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "AdminUser_username_key" ON "AdminUser"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Course_slug_key" ON "Course"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Blog_slug_key" ON "Blog"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Tip_slug_key" ON "Tip"("slug");
