"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Office } from "@/types/office";
import { fetchOffices } from "@/lib/fetchOffices";
import { useAuth } from "@/app/auth-provider";
import { supabase } from "@/lib/supabaseClient";
import { addFavorite, removeFavorite, isFavorite } from "@/lib/favorite";
import Map from "@/components/Map";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorMessage from "@/components/ErrorMessage";

export default function OfficeDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [office, setOffice] = useState<Office | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showMap, setShowMap] = useState(false);

  const { user, loading: authLoading } = useAuth();
  const [favLoading, setFavLoading] = useState(false);
  const [favError, setFavError] = useState<string | null>(null);

  useEffect(() => {
    const loadOffice = async () => {
      try {
        const offices = await fetchOffices();
        const foundOffice = offices.find(o => o.id === Number(params.id));
        if (foundOffice) {
          setOffice(foundOffice);
          // 즐겨찾기 상태 확인
          if (user) {
            const fav = await isFavorite(user.id, foundOffice.id);
            setIsFavorite(fav);
          }
        } else {
          setError("기관을 찾을 수 없습니다.");
        }
      } catch (err) {
        setError("기관 정보를 불러오는데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      loadOffice();
    }
  }, [params.id, user]);

  // 익명 로그인 (로그인 안 된 경우)
  async function ensureLogin() {
    if (!user) {
      await supabase.auth.signInAnonymously();
    }
  }

  // 즐겨찾기 추가
  async function handleAddFavorite() {
    try {
      setFavError(null);
      await ensureLogin();
      setFavLoading(true);
      if (user && office) {
        await addFavorite(user.id, office.id);
        setIsFavorite(true);
      }
    } catch (error) {
      setFavError("즐겨찾기 추가에 실패했습니다.");
    } finally {
      setFavLoading(false);
    }
  }

  // 즐겨찾기 삭제
  async function handleRemoveFavorite() {
    try {
      setFavError(null);
      setFavLoading(true);
      if (user && office) {
        await removeFavorite(user.id, office.id);
        setIsFavorite(false);
      }
    } catch (error) {
      setFavError("즐겨찾기 해제에 실패했습니다.");
    } finally {
      setFavLoading(false);
    }
  }

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

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "district": return "🏢";
      case "community": return "🏘️";
      case "police": return "🚔";
      case "hospital": return "🏥";
      default: return "🏛️";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !office) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <ErrorMessage message={error || "기관을 찾을 수 없습니다."} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* 헤더 */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => router.back()}
            className="mb-4 inline-flex items-center text-blue-100 hover:text-white transition-colors duration-200"
          >
            <span className="mr-2">←</span>
            뒤로가기
          </button>
          
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <span className="text-3xl">{getCategoryIcon(office.category)}</span>
                <h1 className="text-3xl md:text-4xl font-bold">{office.name}</h1>
              </div>
              <p className="text-blue-100 text-lg">{office.address}</p>
            </div>
            <button
              onClick={isFavorite ? handleRemoveFavorite : handleAddFavorite}
              className={`p-3 rounded-full transition-all duration-200 ${
                isFavorite 
                  ? "bg-red-500 hover:bg-red-600 text-white" 
                  : "bg-white/20 hover:bg-white/30 text-white"
              }`}
            >
              {isFavorite ? "❤️" : "🤍"}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* 메인 정보 */}
          <div className="lg:col-span-2 space-y-6">
            {/* 대기 현황 카드 */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="mr-3">📊</span>
                실시간 대기 현황
              </h2>
              
              <div className="grid gap-6 md:grid-cols-2">
                <div className="text-center">
                  <div className="text-4xl font-bold text-gray-900 mb-2">{office.waiting}</div>
                  <div className="text-gray-600">현재 대기 인원</div>
                </div>
                
                <div className="text-center">
                  <div className={`inline-block px-4 py-2 rounded-full text-sm font-medium border ${getQueueStatusColor(office.waiting)}`}>
                    {getQueueStatusText(office.waiting)}
                  </div>
                  <div className="text-gray-600 mt-2">대기 상태</div>
                </div>
              </div>

              {/* 대기 시간 바 */}
              <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">대기 시간 예상</span>
                  <span className="text-sm text-gray-600">
                    {office.waiting <= 5 ? "5분 이내" :
                     office.waiting <= 15 ? "15-30분" : "30분 이상"}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full transition-all duration-500 ${
                      office.waiting <= 5 ? "bg-green-500" :
                      office.waiting <= 15 ? "bg-yellow-500" : "bg-red-500"
                    }`}
                    style={{ width: `${Math.min((office.waiting / 30) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* 운영 정보 카드 */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="mr-3">🕒</span>
                운영 정보
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <span className="text-gray-600">운영시간</span>
                  <span className="font-semibold text-gray-900">09:00 - 18:00</span>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <span className="text-gray-600">점심시간</span>
                  <span className="font-semibold text-gray-900">12:00 - 13:00</span>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <span className="text-gray-600">휴무일</span>
                  <span className="font-semibold text-gray-900">토요일, 일요일, 공휴일</span>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <span className="text-gray-600">전화번호</span>
                  <span className="font-semibold text-blue-600">02-1234-5678</span>
                </div>
              </div>
            </div>

            {/* 지도 카드 */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                  <span className="mr-3">🗺️</span>
                  위치 및 길찾기
                </h2>
                <button
                  onClick={() => setShowMap(!showMap)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-200"
                >
                  {showMap ? "지도 숨기기" : "지도 보기"}
                </button>
              </div>
              
              {showMap && (
                <div className="h-64 rounded-xl overflow-hidden border border-gray-200">
                  <Map address={office.address} />
                </div>
              )}
              
              <div className="mt-4 space-y-2">
                <button className="w-full py-3 px-4 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors duration-200">
                  🚗 카카오맵으로 길찾기
                </button>
                <button className="w-full py-3 px-4 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors duration-200">
                  📞 전화하기
                </button>
              </div>
            </div>
          </div>

          {/* 사이드바 */}
          <div className="space-y-6">
            {/* 빠른 액션 */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">빠른 액션</h3>
              <div className="space-y-3">
                <button className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-200">
                  📋 민원 신청하기
                </button>
                <button className="w-full py-3 px-4 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors duration-200">
                  📋 민원 조회하기
                </button>
                <button className="w-full py-3 px-4 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors duration-200">
                  📋 민원 접수 현황
                </button>
              </div>
            </div>

            {/* 알림 설정 */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">알림 설정</h3>
              <div className="space-y-3">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500" />
                  <span className="text-gray-700">대기 인원 알림</span>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500" />
                  <span className="text-gray-700">운영시간 알림</span>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500" />
                  <span className="text-gray-700">특별 안내사항</span>
                </label>
              </div>
            </div>

            {/* 정보 */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">기관 정보</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div>기관 유형: {office.category === "district" ? "구청" : 
                                   office.category === "community" ? "주민센터" :
                                   office.category === "police" ? "경찰서" :
                                   office.category === "hospital" ? "병원" : "기타"}</div>
                <div>업데이트: {new Date().toLocaleString('ko-KR')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 