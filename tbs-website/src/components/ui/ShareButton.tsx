"use client";

import React from "react";

type ShareButtonProps = {
  title: string;
  url: string;
  description?: string;
  compact?: boolean;
  className?: string;
  variant?: 'primary' | 'ghost';
  showLabel?: boolean;
};

function buildShareUrls(title: string, url: string, description?: string) {
  const text = encodeURIComponent(description || title);
  const shareUrl = encodeURIComponent(url);
  return {
    twitter: `https://twitter.com/intent/tweet?text=${text}&url=${shareUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`,
    whatsapp: `https://api.whatsapp.com/send?text=${text}%20${shareUrl}`,
  };
}

const ShareButton: React.FC<ShareButtonProps> = ({ title, url, description, compact = false, className, variant = 'primary', showLabel = true }) => {
  let computedUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
  if (typeof window !== 'undefined' && computedUrl) {
    // Convert relative paths to absolute URLs for reliable sharing/copying
    if (computedUrl.startsWith('/')) {
      computedUrl = `${window.location.origin}${computedUrl}`;
    }
  }
  const shareUrls = buildShareUrls(title, computedUrl, description);

  const onShare = async () => {
    // Prefer copying the link first to meet expectation "clicking copies link"
    try {
      await navigator.clipboard.writeText(computedUrl);
      alert("Link copied to clipboard");
      return;
    } catch (_) {
      // Clipboard may fail on some browsers/contexts; fall through
    }

    try {
      if (navigator.share) {
        await navigator.share({ title, text: description || title, url: computedUrl });
        return;
      }
    } catch (_) {
      // User cancelled or share failed; continue to fallback
    }

    // Final fallback: open Twitter share with constructed URL
    window.open(shareUrls.twitter, "_blank");
  };

  if (compact) {
    const baseCompactClasses =
      variant === 'ghost'
        ? 'inline-flex items-center gap-2 rounded-md px-2 py-2 text-sm font-medium bg-transparent text-gray-600 hover:text-primary transition'
        : 'inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium bg-primary text-white hover:bg-primary/90 transition';
    return (
      <button
        type="button"
        onClick={onShare}
        aria-label="Share"
        className={`${baseCompactClasses} ${className || ''}`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
          <path d="M13.5 6a3 3 0 1 1 3 3 3 3 0 0 1-3-3Zm-9 6a3 3 0 1 1 3 3 3 3 0 0 1-3-3Zm12 3a3 3 0 1 1-3 3 3 3 0 0 1 3-3Z" />
          <path d="M7.94 12.72a.75.75 0 0 1 1.02-.28l6.2 3.58a.75.75 0 1 1-.74 1.3l-6.2-3.58a.75.75 0 0 1-.28-1.02Zm7.22-6.02a.75.75 0 0 1 .74 1.3l-6.2 3.58a.75.75 0 1 1-.74-1.3l6.2-3.58Z" />
        </svg>
        {showLabel && 'Share'}
      </button>
    );
  }

  return (
    <div className={`flex items-center gap-2 ${className || ""}`}>
      <button
        type="button"
        onClick={onShare}
        className="rounded-md px-3 py-2 text-sm font-medium bg-primary text-white hover:bg-primary/90 transition"
      >
        Share
      </button>
      <a href={shareUrls.twitter} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">Twitter</a>
      <a href={shareUrls.facebook} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-700 hover:underline">Facebook</a>
      <a href={shareUrls.linkedin} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-800 hover:underline">LinkedIn</a>
      <a href={shareUrls.whatsapp} target="_blank" rel="noopener noreferrer" className="text-sm text-green-600 hover:underline">WhatsApp</a>
    </div>
  );
};

export default ShareButton;
