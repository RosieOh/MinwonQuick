"use client";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 메인 푸터 콘텐츠 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* 브랜드 정보 */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                MinwonQuick
              </h3>
            </div>
            <p className="text-gray-300 mb-4 leading-relaxed">
              실시간으로 공공기관 민원 대기 현황을 확인하고, 
              대기 적은 시간에 방문할 수 있도록 도와주는 서비스입니다.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                <span className="sr-only">GitHub</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* 빠른 링크 */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-blue-300">서비스</h4>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-300 hover:text-white transition-colors duration-200">대기 현황</a></li>
              <li><a href="/search" className="text-gray-300 hover:text-white transition-colors duration-200">기관 검색</a></li>
              <li><a href="/" className="text-gray-300 hover:text-white transition-colors duration-200">즐겨찾기</a></li>
              <li><a href="/" className="text-gray-300 hover:text-white transition-colors duration-200">지도 보기</a></li>
            </ul>
          </div>

          {/* 지원 */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-blue-300">지원</h4>
            <ul className="space-y-2">
              <li><a href="/support/help" className="text-gray-300 hover:text-white transition-colors duration-200">도움말</a></li>
              <li><a href="/support/contact" className="text-gray-300 hover:text-white transition-colors duration-200">문의하기</a></li>
              <li><a href="/support/privacy" className="text-gray-300 hover:text-white transition-colors duration-200">개인정보처리방침</a></li>
              <li><a href="/support/terms" className="text-gray-300 hover:text-white transition-colors duration-200">이용약관</a></li>
            </ul>
          </div>
        </div>

        {/* 구분선 */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* 저작권 정보 */}
            <div className="text-center md:text-left">
              <p className="text-gray-400 text-sm">
                © 2025 <span className="text-blue-400 font-semibold">Copyright By RosieOh</span>. 
                All rights reserved.
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Made with ❤️ for better public service experience
              </p>
            </div>

            {/* 기술 스택 */}
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-gray-400 text-sm">
                <span>Built with</span>
                <div className="flex space-x-1">
                  <span className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-medium">Next.js</span>
                  <span className="bg-indigo-500 text-white px-2 py-1 rounded text-xs font-medium">Supabase</span>
                  <span className="bg-cyan-500 text-white px-2 py-1 rounded text-xs font-medium">PWA</span>
                </div>
              </div>
            </div>
          </div>

          {/* 추가 정보 */}
          <div className="mt-6 text-center">
            <p className="text-gray-500 text-xs">
              실시간 민원 대기 현황 안내 서비스 | 
              공공데이터포털 API 연동 | 
              Next.js + Supabase + PWA로 제작되었습니다
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
} 