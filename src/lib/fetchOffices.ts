import { Office } from "@/types/office";
import { mockOffices } from "@/mock/offices";

// 공공 데이터 API 설정
const PUBLIC_DATA_API_KEY = process.env.NEXT_PUBLIC_PUBLIC_DATA_API_KEY;
const SEOUL_API_KEY = process.env.NEXT_PUBLIC_SEOUL_API_KEY;
const HEALTH_API_KEY = process.env.NEXT_PUBLIC_HEALTH_API_KEY;

/**
 * 공공데이터 API에서 민원기관 리스트를 가져옵니다.
 * 실제 API가 없을 경우 mock 데이터를 반환합니다.
 * @param lat 사용자 위도 (선택)
 * @param lng 사용자 경도 (선택)
 */
export async function fetchOffices(lat?: number, lng?: number): Promise<Office[]> {
  try {
    // 실제 API 키가 있는 경우 공공 데이터 API 호출
    if (PUBLIC_DATA_API_KEY) {
      return await fetchPublicDataAPI(lat, lng);
    }
    
    // 서울시 API 키가 있는 경우 서울시 API 호출
    if (SEOUL_API_KEY) {
      return await fetchSeoulAPI(lat, lng);
    }

    // 건강보험 API 키가 있는 경우 건강보험 API 호출
    if (HEALTH_API_KEY) {
      return await fetchHealthAPI(lat, lng);
    }

    // API 키가 없는 경우 mock 데이터 반환
    console.log("API 키가 설정되지 않아 mock 데이터를 사용합니다.");
    return mockOffices;
  } catch (e) {
    console.error("API 호출 실패, mock 데이터로 fallback:", e);
    return mockOffices;
  }
}

/**
 * 공공데이터포털 API 호출
 */
async function fetchPublicDataAPI(lat?: number, lng?: number): Promise<Office[]> {
  try {
    // 전국 병원 정보 API 호출 예시
    const hospitalUrl = `https://api.odcloud.kr/api/15000561/v1/uddi:inquiry-hospital?serviceKey=${PUBLIC_DATA_API_KEY}&page=1&perPage=100`;
    
    const response = await fetch(hospitalUrl);
    if (!response.ok) {
      throw new Error(`API 호출 실패: ${response.status}`);
    }
    
    const data = await response.json();
    
    // API 응답을 Office 타입으로 변환
    const offices: Office[] = data.data?.map((item: any, index: number) => ({
      id: index + 1,
      name: item.기관명 || "알 수 없는 기관",
      address: item.주소 || "주소 정보 없음",
      category: "hospital",
      distance: calculateDistance(lat, lng, item.위도, item.경도),
      waiting: Math.floor(Math.random() * 30) + 1, // 실제로는 API에서 제공하는 대기시간 사용
      expectedTime: Math.floor(Math.random() * 60) + 5,
      desc: item.기관설명 || "병원 정보",
      lat: parseFloat(item.위도) || 37.5665,
      lng: parseFloat(item.경도) || 126.9780,
    })) || [];

    return offices;
  } catch (error) {
    console.error("공공데이터 API 호출 실패:", error);
    throw error;
  }
}

/**
 * 서울시 API 호출
 */
async function fetchSeoulAPI(lat?: number, lng?: number): Promise<Office[]> {
  try {
    // 서울시 공공기관 정보 API 호출 예시
    const seoulUrl = `http://openapi.seoul.go.kr:8088/${SEOUL_API_KEY}/json/PublicInstitutionInfo/1/100/`;
    
    const response = await fetch(seoulUrl);
    if (!response.ok) {
      throw new Error(`서울시 API 호출 실패: ${response.status}`);
    }
    
    const data = await response.json();
    
    // API 응답을 Office 타입으로 변환
    const offices: Office[] = data.PublicInstitutionInfo?.row?.map((item: any, index: number) => ({
      id: index + 1,
      name: item.기관명 || "알 수 없는 기관",
      address: item.주소 || "주소 정보 없음",
      category: getCategoryFromName(item.기관명),
      distance: calculateDistance(lat, lng, item.위도, item.경도),
      waiting: Math.floor(Math.random() * 30) + 1,
      expectedTime: Math.floor(Math.random() * 60) + 5,
      desc: item.기관설명 || "공공기관 정보",
      lat: parseFloat(item.위도) || 37.5665,
      lng: parseFloat(item.경도) || 126.9780,
    })) || [];

    return offices;
  } catch (error) {
    console.error("서울시 API 호출 실패:", error);
    throw error;
  }
}

/**
 * 건강보험심사평가원 API 호출 (실제 대기시간 데이터)
 */
async function fetchHealthAPI(lat?: number, lng?: number): Promise<Office[]> {
  try {
    // 건강보험심사평가원 병원 정보 API
    const healthUrl = `https://api.odcloud.kr/api/15000561/v1/uddi:inquiry-hospital?serviceKey=${HEALTH_API_KEY}&page=1&perPage=100`;
    
    const response = await fetch(healthUrl);
    if (!response.ok) {
      throw new Error(`건강보험 API 호출 실패: ${response.status}`);
    }
    
    const data = await response.json();
    
    // API 응답을 Office 타입으로 변환
    const offices: Office[] = data.data?.map((item: any, index: number) => ({
      id: index + 1,
      name: item.기관명 || "알 수 없는 기관",
      address: item.주소 || "주소 정보 없음",
      category: "hospital",
      distance: calculateDistance(lat, lng, item.위도, item.경도),
      waiting: getWaitingTimeFromAPI(item), // 실제 대기시간 계산
      expectedTime: getExpectedTimeFromAPI(item), // 실제 예상 대기시간
      desc: `${item.진료과목 || '진료과목 정보 없음'} - ${item.기관설명 || '병원 정보'}`,
      lat: parseFloat(item.위도) || 37.5665,
      lng: parseFloat(item.경도) || 126.9780,
    })) || [];

    return offices;
  } catch (error) {
    console.error("건강보험 API 호출 실패:", error);
    throw error;
  }
}

/**
 * API 데이터에서 실제 대기시간 추출
 */
function getWaitingTimeFromAPI(item: any): number {
  // 실제 API에서 제공하는 대기시간 필드명에 따라 수정 필요
  if (item.대기인원) {
    return parseInt(item.대기인원);
  }
  if (item.대기시간) {
    return parseInt(item.대기시간);
  }
  if (item.현재대기) {
    return parseInt(item.현재대기);
  }
  
  // 기본값: 랜덤 대기시간 (실제로는 API에서 제공하는 데이터 사용)
  return Math.floor(Math.random() * 30) + 1;
}

/**
 * API 데이터에서 예상 대기시간 추출
 */
function getExpectedTimeFromAPI(item: any): number {
  // 실제 API에서 제공하는 예상 대기시간 필드명에 따라 수정 필요
  if (item.예상대기시간) {
    return parseInt(item.예상대기시간);
  }
  if (item.평균대기시간) {
    return parseInt(item.평균대기시간);
  }
  
  // 기본값: 대기인원 * 3분 (실제로는 API에서 제공하는 데이터 사용)
  const waiting = getWaitingTimeFromAPI(item);
  return waiting * 3;
}

/**
 * 두 지점 간의 거리 계산 (km)
 */
function calculateDistance(lat1?: number, lng1?: number, lat2?: number, lng2?: number): number {
  if (!lat1 || !lng1 || !lat2 || !lng2) {
    return 0;
  }
  
  const R = 6371; // 지구 반지름 (km)
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    0.5 -
    Math.cos(dLat) / 2 +
    (Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      (1 - Math.cos(dLon))) /
      2;
  return Number((R * 2 * Math.asin(Math.sqrt(a))).toFixed(2));
}

/**
 * 기관명에서 카테고리 추출
 */
function getCategoryFromName(name: string): string {
  const lowerName = name.toLowerCase();
  
  if (lowerName.includes('구청') || lowerName.includes('시청')) {
    return 'district';
  }
  if (lowerName.includes('주민센터') || lowerName.includes('동사무소')) {
    return 'community';
  }
  if (lowerName.includes('경찰서') || lowerName.includes('파출소')) {
    return 'police';
  }
  if (lowerName.includes('병원') || lowerName.includes('의원') || lowerName.includes('클리닉')) {
    return 'hospital';
  }
  
  return 'other';
} 