import Link from "next/link";
import React from "react";

interface SubHeaderProps {
  title: string;
  description?: string;
  backLink?: string;
  centered?: boolean;
  children?: React.ReactNode;
}

export default function SubHeader({
  title,
  description,
  backLink,
  centered = false,
  children,
}: SubHeaderProps) {
  return (
    <div className="bg-white/80 backdrop-blur-md border-b border-gray-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className={centered ? "text-center" : "flex items-center space-x-4 mb-4"}>
          {backLink && (
            <Link href={backLink} className="text-blue-600 hover:text-blue-700 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
          )}
          <div className={centered ? undefined : undefined} style={centered ? { width: "100%" } : undefined}>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              {title}
            </h1>
            {description && (
              <p className={`text-lg text-gray-600 mt-2${centered ? " max-w-2xl mx-auto" : ""}`}>
                {description}
              </p>
            )}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
} 