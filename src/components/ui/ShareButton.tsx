"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type ShareButtonProps = {
  url: string;
  title?: string;
  description?: string;
  compact?: boolean;
  className?: string;
};

const buildShareUrls = (url: string, title?: string, description?: string) => {
  const text = title || "Check this out";
  const summary = description || "";
  const encodedUrl = encodeURIComponent(url);
  const encodedText = encodeURIComponent(text);
  const encodedSummary = encodeURIComponent(summary);

  return {
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedText}&summary=${encodedSummary}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodedText}%20${encodedUrl}`,
  };
};

export default function ShareButton({ url, title, description, compact = false, className = "" }: ShareButtonProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const shareUrls = useMemo(() => buildShareUrls(url, title, description), [url, title, description]);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ url, title, text: description });
      } catch (err) {
        // User cancelled share or share failed; silently ignore
      }
    } else {
      setOpen((v) => !v);
    }
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setOpen(false);
    } catch (_) {
      // Fallback: open prompt
      const _ = window.prompt("Copy this link", url);
    }
  };

  const baseBtn = compact
    ? "inline-flex items-center px-2.5 py-1.5 text-xs font-medium rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50"
    : "inline-flex items-center px-3 py-2 text-sm font-medium rounded-md bg-primary text-white hover:bg-accent";

  return (
    <div className={`relative ${className}`} ref={menuRef}>
      <button type="button" onClick={handleShare} className={baseBtn} aria-haspopup="true" aria-expanded={open}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 12v.01M12 4v.01M20 12v.01M12 20v.01M7.5 7.5l9 9M16.5 7.5l-9 9" />
        </svg>
        Share
      </button>

      {!navigator.share && open && (
        <div className="absolute z-10 mt-2 w-44 rounded-md border border-gray-200 bg-white shadow-lg">
          <div className="py-1">
            <button onClick={copyLink} className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
              Copy link
            </button>
            <a href={shareUrls.twitter} target="_blank" rel="noopener noreferrer" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
              Share on Twitter
            </a>
            <a href={shareUrls.facebook} target="_blank" rel="noopener noreferrer" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
              Share on Facebook
            </a>
            <a href={shareUrls.linkedin} target="_blank" rel="noopener noreferrer" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
              Share on LinkedIn
            </a>
            <a href={shareUrls.whatsapp} target="_blank" rel="noopener noreferrer" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
              Share on WhatsApp
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

