"use client";

import Link from "next/link";
import { supportCategories } from "./supportCategories";
import SubHeader from "@/components/common/SubHeader";

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <SubHeader
        title="지원 센터"
        description="MinwonQuick 서비스 이용에 도움이 필요하시거나 궁금한 점이 있으시면 언제든 문의해 주세요."
        centered
      />

      {/* 메인 콘텐츠 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 지원 카테고리 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {supportCategories.map((category, index) => (
            <Link
              key={index}
              href={category.href}
              className="group block"
            >
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
                <div className="p-8">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-xl flex items-center justify-center text-2xl`}>
                      {category.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {category.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    {category.description}
                  </p>
                  <div className="mt-4 flex items-center text-blue-600 font-medium">
                    자세히 보기
                    <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* 빠른 도움말 */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">빠른 도움말</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-600 text-sm font-bold">1</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">기관 검색하기</h4>
                  <p className="text-gray-600 text-sm">지역명이나 기관명으로 원하는 공공기관을 찾아보세요.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-600 text-sm font-bold">2</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">대기 현황 확인</h4>
                  <p className="text-gray-600 text-sm">실시간으로 업데이트되는 대기 인원과 예상 대기 시간을 확인하세요.</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-600 text-sm font-bold">3</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">즐겨찾기 추가</h4>
                  <p className="text-gray-600 text-sm">자주 방문하는 기관을 즐겨찾기에 추가하여 빠르게 접근하세요.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-600 text-sm font-bold">4</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">지도로 위치 확인</h4>
                  <p className="text-gray-600 text-sm">카카오맵을 통해 기관의 정확한 위치와 경로를 확인하세요.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 연락처 정보 */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">연락처 정보</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-600 text-xl">📧</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">이메일</h4>
              <p className="text-gray-600 text-sm">support@minwonquick.com</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-green-600 text-xl">💬</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">카카오톡</h4>
              <p className="text-gray-600 text-sm">@MinwonQuick</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-purple-600 text-xl">⏰</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">응답 시간</h4>
              <p className="text-gray-600 text-sm">평일 09:00 - 18:00</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 