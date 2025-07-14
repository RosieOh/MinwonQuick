"use client";

import Link from "next/link";

interface SuccessMessageProps {
  onReset: () => void;
}

export default function SuccessMessage({ onReset }: SuccessMessageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
      <div className="max-w-md mx-auto text-center">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-green-600 text-2xl">✅</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">문의가 접수되었습니다!</h2>
          <p className="text-gray-600 mb-6">
            빠른 시일 내에 답변드리겠습니다. 평일 기준 1-2일 내에 이메일로 답변을 보내드립니다.
          </p>
          <div className="space-y-3">
            <button
              onClick={onReset}
              className="block w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              추가 문의하기
            </button>
            <Link
              href="/support"
              className="block w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors"
            >
              지원 센터로 돌아가기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 