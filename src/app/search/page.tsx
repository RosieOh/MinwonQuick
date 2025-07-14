"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Office } from "@/types/office";
import { fetchOffices } from "@/lib/fetchOffices";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorMessage from "@/components/ErrorMessage";

export default function SearchPage() {
  const [offices, setOffices] = useState<Office[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("name");
  const router = useRouter();

  useEffect(() => {
    const loadOffices = async () => {
      try {
        const data = await fetchOffices();
        setOffices(data);
      } catch (err) {
        setError("기관 정보를 불러오는데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    loadOffices();
  }, []);

  const categories = [
    { id: "all", name: "전체", icon: "🏛️" },
    { id: "district", name: "구청", icon: "🏢" },
    { id: "community", name: "주민센터", icon: "🏘️" },
    { id: "police", name: "경찰서", icon: "🚔" },
    { id: "hospital", name: "병원", icon: "🏥" },
  ];

  const sortOptions = [
    { id: "name", name: "기관명순", icon: "📝" },
    { id: "waiting", name: "대기인원순", icon: "👥" },
    { id: "category", name: "카테고리순", icon: "🏷️" },
  ];

  const filteredOffices = offices
    .filter((office) => {
      const matchesSearch = office.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           office.address.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "all" || office.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "waiting":
          return a.waiting - b.waiting;
        case "category":
          return a.category.localeCompare(b.category);
        default:
          return 0;
      }
    });

  const getQueueStatusColor = (waiting: number) => {
    if (waiting <= 5) return "text-green-600 bg-green-50 border-green-200";
    if (waiting <= 15) return "text-yellow-600 bg-yellow-50 border-yellow-200";
    return "text-red-600 bg-red-50 border-red-200";
  };

  const getQueueStatusText = (waiting: number) => {
    if (waiting <= 5) return "여유";
    if (waiting <= 15) return "보통";
    return "혼잡";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <ErrorMessage message={error} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* 검색 헤더 */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">기관 검색</h1>
            <p className="text-blue-100 text-lg">원하는 기관을 찾아보세요</p>
          </div>
          
          {/* 검색 바 */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="기관명 또는 주소로 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-4 pl-12 rounded-2xl border-0 bg-white/20 backdrop-blur-sm text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50 text-lg"
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-200">
                🔍
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 필터 및 정렬 */}
        <div className="mb-8 space-y-4">
          {/* 카테고리 필터 */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">카테고리</h3>
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedCategory === category.id
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25"
                      : "bg-white/70 backdrop-blur-sm text-gray-700 hover:bg-white/90 border border-gray-200/50"
                  }`}
                >
                  <span className="mr-2">{category.icon}</span>
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* 정렬 옵션 */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">정렬</h3>
            <div className="flex flex-wrap gap-3">
              {sortOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setSortBy(option.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    sortBy === option.id
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/25"
                      : "bg-white/70 backdrop-blur-sm text-gray-700 hover:bg-white/90 border border-gray-200/50"
                  }`}
                >
                  <span className="mr-2">{option.icon}</span>
                  {option.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 결과 카운트 */}
        <div className="mb-6">
          <p className="text-gray-600">
            총 <span className="font-semibold text-blue-600">{filteredOffices.length}</span>개의 기관이 검색되었습니다
          </p>
        </div>

        {/* 기관 목록 */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredOffices.map((office) => (
            <div
              key={office.id}
              onClick={() => router.push(`/search/${office.id}`)}
              className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 hover:shadow-xl hover:shadow-blue-500/10 hover:border-blue-300/50 transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
            >
              {/* 기관 헤더 */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                    {office.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">{office.address}</p>
                </div>
                <div className="ml-4">
                  <span className="text-2xl">
                    {office.category === "district" && "🏢"}
                    {office.category === "community" && "🏘️"}
                    {office.category === "police" && "🚔"}
                    {office.category === "hospital" && "🏥"}
                  </span>
                </div>
              </div>

              {/* 대기 현황 */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">현재 대기</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getQueueStatusColor(office.waiting)}`}>
                    {getQueueStatusText(office.waiting)}
                  </span>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">대기 인원</span>
                    <span className="text-lg font-bold text-gray-900">{office.waiting}명</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        office.waiting <= 5 ? "bg-green-500" :
                        office.waiting <= 15 ? "bg-yellow-500" : "bg-red-500"
                      }`}
                      style={{ width: `${Math.min((office.waiting / 30) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>

                {/* 운영 정보 */}
                <div className="pt-3 border-t border-gray-100">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">운영시간</span>
                    <span className="text-gray-700 font-medium">09:00 - 18:00</span>
                  </div>
                  <div className="flex items-center justify-between text-sm mt-1">
                    <span className="text-gray-500">예상 대기시간</span>
                    <span className="text-gray-700 font-medium">
                      {office.waiting <= 5 ? "5분 이내" :
                       office.waiting <= 15 ? "15-30분" : "30분 이상"}
                    </span>
                  </div>
                </div>
              </div>

              {/* 상세보기 버튼 */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <button className="w-full py-2 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105">
                  상세보기 →
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredOffices.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">검색 결과가 없습니다</h3>
            <p className="text-gray-500 mb-4">다른 검색어를 입력해보세요</p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
              }}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-200"
            >
              필터 초기화
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 