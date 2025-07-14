"use client";

import Link from "next/link";
import { contactMethods } from "@/lib/contact";

export default function ContactInfo() {
  return (
    <div className="space-y-8">
      {/* 연락처 방법 */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">연락처 정보</h2>
        <div className="space-y-6">
          {contactMethods.map((method, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className={`w-12 h-12 bg-gradient-to-r ${method.color} rounded-xl flex items-center justify-center text-xl`}>
                {method.icon}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">{method.title}</h3>
                <p className="text-gray-600 text-sm mb-2">{method.description}</p>
                <p className="text-blue-600 font-medium">{method.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 응답 시간 안내 */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8">
        <h3 className="text-xl font-bold text-gray-900 mb-4">응답 시간 안내</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">일반 문의</span>
            <span className="font-medium text-gray-900">1-2일</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">기술적 문제</span>
            <span className="font-medium text-gray-900">2-3일</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">긴급 문의</span>
            <span className="font-medium text-gray-900">24시간 이내</span>
          </div>
        </div>
        <div className="mt-6 p-4 bg-blue-100 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>참고:</strong> 주말 및 공휴일에는 응답이 지연될 수 있습니다.
          </p>
        </div>
      </div>

      {/* 자주 묻는 질문 */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
        <h3 className="text-xl font-bold text-gray-900 mb-4">자주 묻는 질문</h3>
        <div className="space-y-3">
          <Link href="/support/help" className="block text-blue-600 hover:text-blue-700 transition-colors">
            • 서비스 사용 방법이 궁금해요
          </Link>
          <Link href="/support/help" className="block text-blue-600 hover:text-blue-700 transition-colors">
            • 대기 현황이 업데이트되지 않아요
          </Link>
          <Link href="/support/help" className="block text-blue-600 hover:text-blue-700 transition-colors">
            • 즐겨찾기가 저장되지 않아요
          </Link>
          <Link href="/support/help" className="block text-blue-600 hover:text-blue-700 transition-colors">
            • 지도가 표시되지 않아요
          </Link>
        </div>
      </div>
    </div>
  );
} 