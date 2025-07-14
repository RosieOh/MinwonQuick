"use client";

import { useState } from "react";
import Link from "next/link";
import { ContactForm, ContactInfo, SuccessMessage } from "@/components/contact";
import SubHeader from "@/components/common/SubHeader";

export default function ContactPage() {
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmitSuccess = () => {
    setSubmitSuccess(true);
  };

  const handleReset = () => {
    setSubmitSuccess(false);
  };

  if (submitSuccess) {
    return <SuccessMessage onReset={handleReset} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <SubHeader
        title="문의하기"
        description="기술적 문제나 개선 제안사항을 알려주세요"
        backLink="/support"
      />

      {/* 메인 콘텐츠 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <ContactForm onSubmitSuccess={handleSubmitSuccess} />
          <ContactInfo />
        </div>
      </div>
    </div>
  );
} 