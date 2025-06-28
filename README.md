# MinwonQuick

공공기관 민원 대기 현황 실시간 안내 서비스

## 🏗 시스템 아키텍처

### 전체 시스템 아키텍처

```mermaid
graph TB
    subgraph "Client Layer"
        A[Web Browser]
        B[Mobile PWA]
        C[Desktop App]
    end
    
    subgraph "Frontend Layer"
        D[Next.js App]
        E[React Components]
        F[PWA Service Worker]
    end
    
    subgraph "Backend Layer"
        G[Supabase]
        H[Vercel Edge Functions]
    end
    
    subgraph "External APIs"
        I[공공데이터포털 API]
        J[서울시 API]
        K[건강보험심사평가원 API]
        L[카카오맵 API]
    end
    
    subgraph "Data Layer"
        M[Supabase Database]
        N[PostgreSQL]
        O[Real-time Subscriptions]
    end
    
    A --> D
    B --> D
    C --> D
    D --> E
    D --> F
    D --> G
    D --> H
    G --> M
    M --> N
    M --> O
    H --> I
    H --> J
    H --> K
    D --> L
```

### 서비스 아키텍처

```mermaid
graph LR
    subgraph "Presentation Layer"
        A[UI Components]
        B[Pages]
        C[Layout]
    end
    
    subgraph "Application Layer"
        D[State Management]
        E[Form Handling]
        F[API Integration]
    end
    
    subgraph "Domain Layer"
        G[Business Logic]
        H[Data Models]
        I[Validation]
    end
    
    subgraph "Infrastructure Layer"
        J[Database]
        K[External APIs]
        L[Authentication]
    end
    
    A --> D
    B --> E
    C --> F
    D --> G
    E --> H
    F --> I
    G --> J
    H --> K
    I --> L
```

## 📊 데이터베이스 모델링

### ERD (Entity Relationship Diagram)

```mermaid
erDiagram
    USERS {
        uuid id PK
        string email
        string name
        timestamp created_at
        timestamp updated_at
    }
    
    OFFICES {
        int id PK
        string name
        string address
        string phone
        float latitude
        float longitude
        string category
        string operating_hours
        int current_waiting
        int estimated_wait_time
        timestamp last_updated
    }
    
    FAVORITES {
        bigint id PK
        uuid user_id FK
        int office_id FK
        timestamp created_at
    }
    
    CONTACT_INQUIRIES {
        bigint id PK
        uuid user_id FK
        string name
        string email
        string category
        string subject
        text message
        string status
        timestamp created_at
        timestamp updated_at
    }
    
    USERS ||--o{ FAVORITES : "has"
    USERS ||--o{ CONTACT_INQUIRIES : "submits"
    OFFICES ||--o{ FAVORITES : "favorited_by"
```

### 데이터베이스 스키마

```mermaid
graph TD
    subgraph "Tables"
        A[users<br/>- id: uuid<br/>- email: string<br/>- name: string<br/>- created_at: timestamp]
        
        B[offices<br/>- id: int<br/>- name: string<br/>- address: string<br/>- phone: string<br/>- latitude: float<br/>- longitude: float<br/>- category: string<br/>- operating_hours: string<br/>- current_waiting: int<br/>- estimated_wait_time: int<br/>- last_updated: timestamp]
        
        C[favorites<br/>- id: bigint<br/>- user_id: uuid<br/>- office_id: int<br/>- created_at: timestamp]
        
        D[contact_inquiries<br/>- id: bigint<br/>- user_id: uuid<br/>- name: string<br/>- email: string<br/>- category: string<br/>- subject: string<br/>- message: text<br/>- status: string<br/>- created_at: timestamp<br/>- updated_at: timestamp]
    end
    
    A --> C
    B --> C
    A --> D
```

## 🎯 유스케이스 다이어그램

```mermaid
graph TB
    subgraph "Actors"
        A[일반 사용자]
        B[관리자]
    end
    
    subgraph "Use Cases"
        C[기관 검색]
        D[대기 현황 확인]
        E[즐겨찾기 관리]
        F[지도에서 위치 확인]
        G[문의하기]
        H[PWA 설치]
        I[실시간 알림]
        J[데이터 관리]
        K[사용자 관리]
    end
    
    A --> C
    A --> D
    A --> E
    A --> F
    A --> G
    A --> H
    A --> I
    B --> J
    B --> K
```

## 🔄 컴포넌트 아키텍처

```mermaid
graph TD
    subgraph "Pages"
        A[Home Page]
        B[Search Page]
        C[Office Detail Page]
        D[Support Pages]
    end
    
    subgraph "Common Components"
        E[Header]
        F[Footer]
        G[LoadingSpinner]
        H[ErrorMessage]
    end
    
    subgraph "Feature Components"
        I[OfficeCard]
        J[OfficeList]
        K[SearchForm]
        L[Map]
        M[ContactForm]
        N[ContactInfo]
    end
    
    subgraph "Layout"
        O[Root Layout]
        P[Auth Provider]
    end
    
    O --> P
    O --> E
    O --> F
    
    A --> I
    A --> J
    A --> L
    
    B --> K
    B --> J
    
    C --> I
    C --> L
    
    D --> M
    D --> N
    
    A --> G
    B --> G
    C --> G
    D --> G
    
    A --> H
    B --> H
    C --> H
    D --> H
```

## 🔌 API 아키텍처

```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant S as Supabase
    participant E as External APIs
    
    U->>F: 기관 검색 요청
    F->>S: 사용자 인증 확인
    S-->>F: 인증 결과
    
    F->>E: 공공데이터 API 호출
    E-->>F: 기관 목록 반환
    
    F->>S: 즐겨찾기 저장
    S-->>F: 저장 완료
    
    F-->>U: 검색 결과 표시
    
    U->>F: 대기 현황 확인
    F->>E: 실시간 대기 데이터 요청
    E-->>F: 대기 현황 반환
    F-->>U: 대기 현황 표시
```

## 🚀 배포 아키텍처

```mermaid
graph TB
    subgraph "Development"
        A[Local Development]
        B[Git Repository]
    end
    
    subgraph "CI/CD"
        C[GitHub Actions]
        D[Vercel Build]
        E[Automated Testing]
    end
    
    subgraph "Production"
        F[Vercel Edge Network]
        G[CDN]
        H[Supabase Production]
    end
    
    subgraph "Monitoring"
        I[Vercel Analytics]
        J[Error Tracking]
        K[Performance Monitoring]
    end
    
    A --> B
    B --> C
    C --> D
    D --> E
    E --> F
    F --> G
    F --> H
    F --> I
    F --> J
    F --> K
```

## 🔐 보안 아키텍처

```mermaid
graph TD
    subgraph "Client Security"
        A[HTTPS Only]
        B[Content Security Policy]
        C[XSS Protection]
    end
    
    subgraph "Authentication"
        D[Supabase Auth]
        E[JWT Tokens]
        F[Row Level Security]
    end
    
    subgraph "Data Protection"
        G[Encrypted Storage]
        H[API Rate Limiting]
        I[Input Validation]
    end
    
    subgraph "Infrastructure"
        J[Vercel Security]
        K[Supabase Security]
        L[Environment Variables]
    end
    
    A --> D
    B --> E
    C --> F
    D --> G
    E --> H
    F --> I
    G --> J
    H --> K
    I --> L
```

## 🚀 주요 기능

- **실시간 대기 현황**: 기관별 현재 대기 인원 및 예상 대기시간 안내
- **위치 기반 정렬**: 사용자 위치 기준으로 가까운 기관 순 정렬
- **즐겨찾기**: 관심 기관 저장 및 관리
- **검색 기능**: 기관명/주소로 빠른 검색
- **지도 연동**: 카카오맵을 통한 위치 확인 및 경로 안내
- **PWA 지원**: 모바일 앱처럼 설치 및 오프라인 접근
- **실제 공공 데이터 연동**: 공공데이터포털 API를 통한 실시간 데이터

## 🛠 기술 스택

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS
- **Backend**: Supabase (Auth, Database)
- **PWA**: next-pwa
- **지도**: 카카오맵 API
- **공공 데이터**: 공공데이터포털 API, 서울시 API
- **배포**: Vercel (권장)

## 📦 설치 및 실행

### 1. 프로젝트 클론
```bash
git clone <repository-url>
cd minwonquick
```

### 2. 의존성 설치
```bash
npm install
```

### 3. 환경변수 설정
`.env.local` 파일을 생성하고 다음 변수들을 설정하세요:

```env
# Supabase 설정
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# 카카오맵 API 키
NEXT_PUBLIC_KAKAO_MAP_API_KEY=your_kakao_map_api_key

# 공공 데이터 API 키 (선택사항)
NEXT_PUBLIC_PUBLIC_DATA_API_KEY=your_public_data_api_key
NEXT_PUBLIC_SEOUL_API_KEY=your_seoul_api_key
NEXT_PUBLIC_HEALTH_API_KEY=your_health_api_key
```

### 4. 공공 데이터 API 키 발급 (선택사항)

#### 공공데이터포털 API 키 발급
1. [공공데이터포털](https://www.data.go.kr) 회원가입
2. "전국 병원 정보 조회 서비스" API 신청
3. 승인 후 발급받은 서비스 키를 `NEXT_PUBLIC_PUBLIC_DATA_API_KEY`에 설정

#### 서울시 API 키 발급
1. [서울시 열린데이터 광장](https://data.seoul.go.kr) 회원가입
2. "서울시 공공기관 정보" API 신청
3. 승인 후 발급받은 서비스 키를 `NEXT_PUBLIC_SEOUL_API_KEY`에 설정

#### 건강보험심사평가원 API 키 발급
1. [건강보험심사평가원](https://www.hira.or.kr) 회원가입
2. "병원 정보 조회 서비스" API 신청
3. 승인 후 발급받은 서비스 키를 `NEXT_PUBLIC_HEALTH_API_KEY`에 설정

### 5. Supabase 설정
1. [Supabase](https://supabase.com)에서 새 프로젝트 생성
2. 다음 테이블 생성:

```sql
-- 즐겨찾기 테이블
CREATE TABLE favorites (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  office_id INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 문의 테이블
CREATE TABLE contact_inquiries (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  category VARCHAR(50) NOT NULL,
  subject VARCHAR(200) NOT NULL,
  message TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS 정책 설정
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own favorites" ON favorites
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own favorites" ON favorites
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own favorites" ON favorites
  FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own inquiries" ON contact_inquiries
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own inquiries" ON contact_inquiries
  FOR INSERT WITH CHECK (auth.uid() = user_id);
```

### 6. 개발 서버 실행
```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

## 🚀 배포

### Vercel 배포 (권장)
1. [Vercel](https://vercel.com)에 GitHub 저장소 연결
2. 환경변수 설정 (위의 환경변수들)
3. 자동 배포 완료

### 수동 배포
```bash
npm run build
npm start
```

## 📱 PWA 설치

1. 브라우저에서 서비스 접속
2. 주소창 옆 설치 아이콘 클릭 또는 브라우저 메뉴에서 "앱 설치" 선택
3. 모바일 앱처럼 홈 화면에 추가됨

## 🔧 API 연동

### 공공데이터 API 연동

#### 지원하는 API
1. **전국 병원 정보 조회 서비스** (건강보험심사평가원)
   - 병원 위치, 운영시간, 진료과목 정보
   - API 키: `NEXT_PUBLIC_PUBLIC_DATA_API_KEY`

2. **서울시 공공기관 정보** (서울특별시)
   - 서울시 소재 공공기관 상세 정보
   - API 키: `NEXT_PUBLIC_SEOUL_API_KEY`

3. **건강보험심사평가원 병원 정보** (건강보험심사평가원)
   - 실제 대기시간, 예상 대기시간 데이터
   - API 키: `NEXT_PUBLIC_HEALTH_API_KEY`

#### API 키 설정 방법
1. 각 API 제공기관에서 API 키 발급
2. `.env.local` 파일에 키 설정
3. 앱 재시작 후 실제 데이터 확인

#### Fallback 동작
- API 키가 설정되지 않은 경우: Mock 데이터 사용
- API 호출 실패 시: Mock 데이터로 자동 fallback
- 콘솔에서 API 상태 확인 가능

## 📁 프로젝트 구조

```
src/
├── app/                    # Next.js App Router
│   ├── auth-provider.tsx   # Supabase 인증 Provider
│   ├── layout.tsx         # 루트 레이아웃
│   ├── page.tsx           # 홈 페이지
│   ├── search/            # 검색 관련 페이지
│   └── support/           # 지원 페이지들
├── components/            # 재사용 컴포넌트
│   ├── common/            # 공통 컴포넌트
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── index.ts
│   ├── contact/           # 문의 관련 컴포넌트
│   │   ├── ContactForm.tsx
│   │   ├── ContactInfo.tsx
│   │   ├── SuccessMessage.tsx
│   │   └── index.ts
│   ├── LoadingSpinner.tsx
│   ├── ErrorMessage.tsx
│   └── Map.tsx
├── lib/                   # 유틸리티 함수
│   ├── supabaseClient.ts
│   ├── fetchOffices.ts    # 공공 데이터 API 연동
│   ├── favorite.ts
│   └── contact.ts         # 문의 관련 함수
├── types/                 # TypeScript 타입 정의
│   └── office.ts
└── mock/                  # Mock 데이터
    └── offices.ts
```

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 📞 문의

프로젝트 관련 문의사항이 있으시면 이슈를 생성해주세요.
