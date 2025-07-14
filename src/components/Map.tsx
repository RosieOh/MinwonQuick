"use client";
import React, { useEffect, useRef, useState } from "react";

interface MapProps {
  address: string;
}

declare global {
  interface Window {
    kakao: any;
  }
}

export default function Map({ address }: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMap = async () => {
      try {
        setLoading(true);
        setError(null);

        // 카카오맵 API 로드 (실제 구현에서는 카카오맵 API 키가 필요)
        if (typeof window !== 'undefined' && window.kakao && window.kakao.maps) {
          const options = {
            center: new window.kakao.maps.LatLng(37.5665, 126.9780), // 서울 시청
            level: 3
          };
          
          if (mapRef.current) {
            const map = new window.kakao.maps.Map(mapRef.current, options);
            
            // 주소로 좌표 검색
            const geocoder = new window.kakao.maps.services.Geocoder();
            geocoder.addressSearch(address, (result: any, status: any) => {
              if (status === window.kakao.maps.services.Status.OK) {
                const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
                
                // 마커 생성
                const marker = new window.kakao.maps.Marker({
                  map: map,
                  position: coords
                });
                
                // 인포윈도우 생성
                const infowindow = new window.kakao.maps.InfoWindow({
                  content: `<div style="padding:5px;font-size:12px;">${address}</div>`
                });
                
                infowindow.open(map, marker);
                map.setCenter(coords);
              } else {
                setError("주소를 찾을 수 없습니다.");
              }
              setLoading(false);
            });
          }
        } else {
          // 카카오맵 API가 없는 경우 대체 UI
          setError("지도를 불러올 수 없습니다.");
          setLoading(false);
        }
      } catch (err) {
        setError("지도를 불러오는데 실패했습니다.");
        setLoading(false);
      }
    };

    loadMap();
  }, [address]);

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50 rounded-xl">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-2"></div>
          <p className="text-sm text-gray-500">지도 로딩 중...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50 rounded-xl">
        <div className="text-center p-4">
          <div className="text-2xl mb-2">🗺️</div>
          <p className="text-sm text-gray-500 mb-2">{error}</p>
          <button
            onClick={() => window.open(`https://map.kakao.com/link/search/${encodeURIComponent(address)}`, '_blank')}
            className="px-3 py-1 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            카카오맵에서 보기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full">
      <div ref={mapRef} className="w-full h-full rounded-xl" />
      <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs text-gray-600">
        카카오맵
      </div>
    </div>
  );
} 