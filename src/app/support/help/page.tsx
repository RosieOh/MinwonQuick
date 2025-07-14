"use client";

import { useState } from "react";
import Link from "next/link";
import SubHeader from "@/components/common/SubHeader";
import { faqs } from "./faqs";
import { features } from "./features";

export default function HelpPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <SubHeader
        title="도움말"
        description="MinwonQuick 서비스 사용 방법과 자주 묻는 질문"
        backLink="/support"
      />

      {/* 메인 콘텐츠 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 주요 기능 */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">주요 기능</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow">
                <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center text-2xl mb-4`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 사용 가이드 */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">사용 가이드</h2>
          <div className="space-y-8">
            <div className="flex items-start space-x-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 font-bold text-lg">1</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">기관 검색하기</h3>
                <p className="text-gray-600 mb-4">메인 페이지 상단의 검색창에 지역명(예: 강남구, 서초구) 또는 기관명(예: 구청, 세무서)을 입력하세요.</p>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-700 font-medium">검색 팁:</p>
                  <ul className="text-sm text-gray-600 mt-2 space-y-1">
                    <li>• "강남구청" → 강남구청 관련 기관들</li>
                    <li>• "세무서" → 전국 세무서 목록</li>
                    <li>• "보건소" → 지역별 보건소</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex items-start space-x-6">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-green-600 font-bold text-lg">2</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">대기 현황 확인</h3>
                <p className="text-gray-600 mb-4">검색 결과에서 원하는 기관을 클릭하면 상세 페이지로 이동합니다. 현재 대기 인원과 예상 대기 시간을 확인할 수 있습니다.</p>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-700 font-medium">정보 해석:</p>
                  <ul className="text-sm text-gray-600 mt-2 space-y-1">
                    <li>• 🟢 대기 적음 (0-5명)</li>
                    <li>• 🟡 보통 (6-15명)</li>
                    <li>• 🔴 대기 많음 (16명 이상)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex items-start space-x-6">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-purple-600 font-bold text-lg">3</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">즐겨찾기 관리</h3>
                <p className="text-gray-600 mb-4">자주 방문하는 기관은 하트 아이콘을 클릭하여 즐겨찾기에 추가하세요. 메인 페이지에서 빠르게 접근할 수 있습니다.</p>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-700 font-medium">즐겨찾기 활용:</p>
                  <ul className="text-sm text-gray-600 mt-2 space-y-1">
                    <li>• 자주 방문하는 기관들을 미리 등록</li>
                    <li>• 대기 현황을 한눈에 확인</li>
                    <li>• 빠른 접근으로 시간 절약</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex items-start space-x-6">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-orange-600 font-bold text-lg">4</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">지도로 위치 확인</h3>
                <p className="text-gray-600 mb-4">기관 상세 페이지에서 '지도 보기' 버튼을 클릭하면 카카오맵으로 이동하여 정확한 위치와 경로를 확인할 수 있습니다.</p>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-700 font-medium">지도 기능:</p>
                  <ul className="text-sm text-gray-600 mt-2 space-y-1">
                    <li>• 정확한 기관 위치 표시</li>
                    <li>• 현재 위치에서 경로 안내</li>
                    <li>• 대중교통 및 자동차 경로</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 자주 묻는 질문 */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">자주 묻는 질문 (FAQ)</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg">
                <button
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <span className="font-semibold text-gray-900">{faq.question}</span>
                  <svg
                    className={`w-5 h-5 text-gray-500 transform transition-transform ${
                      openFaq === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 