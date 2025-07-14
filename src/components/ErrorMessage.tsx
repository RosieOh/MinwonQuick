"use client";

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center space-y-6 p-8">
      {/* 에러 아이콘 */}
      <div className="relative">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
          <span className="text-3xl">⚠️</span>
        </div>
        <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
          <span className="text-white text-xs">!</span>
        </div>
      </div>
      
      {/* 에러 메시지 */}
      <div className="text-center max-w-md">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">오류가 발생했습니다</h3>
        <p className="text-gray-600 leading-relaxed">{message}</p>
      </div>
      
      {/* 재시도 버튼 */}
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
        >
          다시 시도
        </button>
      )}
      
      {/* 홈으로 돌아가기 */}
      <button
        onClick={() => window.location.href = '/'}
        className="px-4 py-2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
      >
        홈으로 돌아가기
      </button>
    </div>
  );
} 