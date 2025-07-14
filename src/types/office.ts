export interface Office {
  id: number;
  name: string;
  address: string;
  category: string; // 기관 카테고리 (district, community, police, hospital 등)
  distance: number; // km
  waiting: number; // 현재 대기 인원
  expectedTime: number; // 예상 대기시간(분)
  desc?: string;
  lat?: number;
  lng?: number;
} 