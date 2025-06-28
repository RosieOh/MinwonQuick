# 공공 데이터 API 연동 가이드

MinwonQuick에서 실제 공공 데이터 API를 연동하는 방법을 안내합니다.

## 🎯 지원하는 API 목록

### 1. 전국 병원 정보 조회 서비스
- **제공기관**: 건강보험심사평가원
- **데이터**: 병원 위치, 운영시간, 진료과목
- **API 문서**: https://www.data.go.kr/data/15000561/openapi.do
- **환경변수**: `NEXT_PUBLIC_PUBLIC_DATA_API_KEY`

### 2. 서울시 공공기관 정보
- **제공기관**: 서울특별시
- **데이터**: 서울시 소재 공공기관 상세 정보
- **API 문서**: https://data.seoul.go.kr/dataList/OA-21276/S/1/datasetView.do
- **환경변수**: `NEXT_PUBLIC_SEOUL_API_KEY`

### 3. 건강보험심사평가원 병원 정보
- **제공기관**: 건강보험심사평가원
- **데이터**: 실제 대기시간, 예상 대기시간
- **API 문서**: https://www.hira.or.kr/rd/hosp/getHospList.do
- **환경변수**: `NEXT_PUBLIC_HEALTH_API_KEY`

## 🔑 API 키 발급 방법

### 공공데이터포털 API 키 발급

1. **회원가입**
   - [공공데이터포털](https://www.data.go.kr) 접속
   - 회원가입 및 로그인

2. **API 신청**
   - "전국 병원 정보 조회 서비스" 검색
   - API 신청 버튼 클릭
   - 신청 사유 작성 후 제출

3. **승인 대기**
   - 보통 1-2일 내 승인 완료
   - 승인 후 서비스 키 발급

4. **환경변수 설정**
   ```env
   NEXT_PUBLIC_PUBLIC_DATA_API_KEY=your_service_key_here
   ```

### 서울시 API 키 발급

1. **회원가입**
   - [서울시 열린데이터 광장](https://data.seoul.go.kr) 접속
   - 회원가입 및 로그인

2. **API 신청**
   - "서울시 공공기관 정보" 검색
   - API 신청 및 승인 대기

3. **환경변수 설정**
   ```env
   NEXT_PUBLIC_SEOUL_API_KEY=your_service_key_here
   ```

### 건강보험심사평가원 API 키 발급

1. **회원가입**
   - [건강보험심사평가원](https://www.hira.or.kr) 접속
   - 개발자 계정 신청

2. **API 신청**
   - "병원 정보 조회 서비스" 신청
   - 승인 후 API 키 발급

3. **환경변수 설정**
   ```env
   NEXT_PUBLIC_HEALTH_API_KEY=your_service_key_here
   ```

## 🔧 API 연동 설정

### 1. 환경변수 파일 생성

프로젝트 루트에 `.env.local` 파일을 생성하고 API 키를 설정합니다:

```env
# Supabase 설정
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# 카카오맵 API 키
NEXT_PUBLIC_KAKAO_MAP_API_KEY=your_kakao_map_api_key

# 공공 데이터 API 키들
NEXT_PUBLIC_PUBLIC_DATA_API_KEY=your_public_data_api_key
NEXT_PUBLIC_SEOUL_API_KEY=your_seoul_api_key
NEXT_PUBLIC_HEALTH_API_KEY=your_health_api_key
```

### 2. 앱 재시작

환경변수를 설정한 후 개발 서버를 재시작합니다:

```bash
npm run dev
```

### 3. API 동작 확인

브라우저 개발자 도구 콘솔에서 다음 메시지를 확인할 수 있습니다:

- **API 키 설정됨**: "공공데이터 API 호출 중..."
- **API 키 없음**: "API 키가 설정되지 않아 mock 데이터를 사용합니다."
- **API 호출 실패**: "API 호출 실패, mock 데이터로 fallback"

## 📊 API 데이터 구조

### 공공데이터포털 API 응답 예시

```json
{
  "data": [
    {
      "기관명": "서울대학교병원",
      "주소": "서울특별시 종로구 대학로 101",
      "위도": "37.5796",
      "경도": "126.9980",
      "진료과목": "내과, 외과, 소아과",
      "기관설명": "종합병원"
    }
  ]
}
```

### 서울시 API 응답 예시

```json
{
  "PublicInstitutionInfo": {
    "row": [
      {
        "기관명": "종로구청",
        "주소": "서울특별시 종로구 삼봉로 43",
        "위도": "37.5731",
        "경도": "126.9794",
        "기관설명": "구청"
      }
    ]
  }
}
```

## 🚨 주의사항

### 1. API 호출 제한
- 각 API마다 일일 호출 제한이 있습니다
- 개발 시에는 적절한 캐싱을 사용하세요

### 2. 데이터 정확성
- API에서 제공하는 데이터의 정확성을 확인하세요
- 대기시간 데이터는 실시간이 아닐 수 있습니다

### 3. 에러 처리
- API 호출 실패 시 자동으로 mock 데이터로 fallback됩니다
- 사용자에게 적절한 에러 메시지를 표시하세요

### 4. CORS 이슈
- 일부 API는 CORS 정책으로 인해 브라우저에서 직접 호출이 제한될 수 있습니다
- 이 경우 서버 사이드에서 API를 호출해야 합니다

## 🔄 API 우선순위

API 키가 여러 개 설정된 경우 다음 우선순위로 동작합니다:

1. **공공데이터포털 API** (`NEXT_PUBLIC_PUBLIC_DATA_API_KEY`)
2. **서울시 API** (`NEXT_PUBLIC_SEOUL_API_KEY`)
3. **건강보험 API** (`NEXT_PUBLIC_HEALTH_API_KEY`)
4. **Mock 데이터** (API 키가 없는 경우)

## 📝 커스터마이징

### 새로운 API 추가

`src/lib/fetchOffices.ts` 파일에서 새로운 API를 추가할 수 있습니다:

```typescript
// 새로운 API 키 추가
const NEW_API_KEY = process.env.NEXT_PUBLIC_NEW_API_KEY;

// fetchOffices 함수에 조건 추가
if (NEW_API_KEY) {
  return await fetchNewAPI(lat, lng);
}

// 새로운 API 함수 구현
async function fetchNewAPI(lat?: number, lng?: number): Promise<Office[]> {
  // API 호출 로직 구현
}
```

### 데이터 변환 로직 수정

API 응답을 Office 타입으로 변환하는 로직을 수정할 수 있습니다:

```typescript
const offices: Office[] = data.items?.map((item: any, index: number) => ({
  id: index + 1,
  name: item.기관명,
  address: item.주소,
  category: getCategoryFromName(item.기관명),
  distance: calculateDistance(lat, lng, item.위도, item.경도),
  waiting: getWaitingTimeFromAPI(item),
  expectedTime: getExpectedTimeFromAPI(item),
  desc: item.기관설명,
  lat: parseFloat(item.위도),
  lng: parseFloat(item.경도),
})) || [];
```

## 🆘 문제 해결

### API 호출이 안 되는 경우

1. **API 키 확인**
   - 환경변수가 올바르게 설정되었는지 확인
   - API 키가 유효한지 확인

2. **CORS 이슈**
   - 브라우저 개발자 도구에서 CORS 에러 확인
   - 서버 사이드에서 API 호출하도록 수정

3. **API 제한**
   - 일일 호출 제한에 도달했는지 확인
   - API 제공기관에서 서비스 상태 확인

### 데이터가 표시되지 않는 경우

1. **API 응답 확인**
   - 브라우저 개발자 도구에서 API 응답 확인
   - 응답 구조가 예상과 다른지 확인

2. **데이터 변환 로직 확인**
   - `fetchOffices.ts`의 변환 로직 확인
   - API 응답 필드명이 올바른지 확인

## 📞 지원

API 연동 관련 문제가 있으시면:

1. 브라우저 개발자 도구의 콘솔 로그 확인
2. API 제공기관의 공식 문서 참조
3. GitHub 이슈 생성

---

이 가이드를 통해 실제 공공 데이터를 활용한 민원 대기 현황 서비스를 구축할 수 있습니다! 🚀 