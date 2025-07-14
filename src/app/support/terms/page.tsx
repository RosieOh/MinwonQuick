"use client";

import Link from "next/link";
import { sections } from "./sections";
import SubHeader from "@/components/common/SubHeader";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <SubHeader
        title="이용약관"
        description="서비스 이용에 관한 약관 및 정책"
        backLink="/support"
      />

      {/* 메인 콘텐츠 */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 개요 */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-8">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center text-2xl">
              📋
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">이용약관 안내</h2>
              <p className="text-gray-600">MinwonQuick 서비스 이용에 관한 약관입니다</p>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-3">📋 이용약관 개요</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
              <div>
                <p><strong>시행일:</strong> 2024년 1월 1일</p>
                <p><strong>최종 수정:</strong> 2024년 1월 1일</p>
              </div>
              <div>
                <p><strong>서비스명:</strong> MinwonQuick</p>
                <p><strong>운영자:</strong> RosieOh</p>
              </div>
            </div>
          </div>
        </div>

        {/* 주요 내용 */}
        <div className="space-y-6">
          {sections.map((section, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold text-sm mr-3">
                  {index + 1}
                </span>
                {section.title}
              </h3>
              <div className="space-y-3">
                {section.content.map((item, itemIndex) => (
                  <p key={itemIndex} className={`text-gray-700 leading-relaxed ${
                    item.startsWith('•') ? 'ml-4' : ''
                  }`}>
                    {item}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* 부칙 */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mt-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">부칙</h3>
          <div className="space-y-3 text-gray-700">
            <p><strong>제1조 (시행일)</strong></p>
            <p>이 약관은 2024년 1월 1일부터 시행합니다.</p>
            <p><strong>제2조 (경과조치)</strong></p>
            <p>이 약관 시행 전에 체결된 계약에 대해서는 종전의 약관을 적용합니다.</p>
          </div>
        </div>

        {/* 연락처 */}
        <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-2xl p-8 mt-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">약관 관련 문의</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">서비스 운영자</h4>
              <p className="text-gray-600">RosieOh</p>
              <p className="text-blue-600">support@minwonquick.com</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">약관 변경 안내</h4>
              <p className="text-gray-600">약관 변경 시 서비스 내 공지사항을 통해 사전 안내드립니다.</p>
            </div>
          </div>
        </div>

        {/* 관련 링크 */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mt-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">관련 링크</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link 
              href="/support/privacy" 
              className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <span className="text-purple-500 text-xl">🔒</span>
              <div>
                <h4 className="font-semibold text-gray-900">개인정보처리방침</h4>
                <p className="text-sm text-gray-600">개인정보 수집 및 이용 안내</p>
              </div>
            </Link>
            <Link 
              href="/support/contact" 
              className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <span className="text-green-500 text-xl">📧</span>
              <div>
                <h4 className="font-semibold text-gray-900">문의하기</h4>
                <p className="text-sm text-gray-600">약관 관련 문의</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 