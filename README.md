# React-PRJ-Netflix-Clone

스포티파이 톤앤톤 디자인을 적용한 영화/드라마 스트리밍 플랫폼 클론 프로젝트입니다.

## 🚀 주요 기능

- **영화 & TV 쇼 검색**: TMDB API를 활용한 실시간 검색
- **로튼 토마토 스타일 평점**: OMDB API를 통한 실제 평점 데이터
- **반응형 디자인**: 모든 디바이스에서 최적화된 경험
- **YouTube 예고편**: 영화/드라마 예고편 자동 재생
- **스포티파이 톤앤톤**: 현대적이고 세련된 UI/UX

## 🛠️ 기술 스택

- **Frontend**: React 18, TypeScript
- **Styling**: Styled Components
- **Animation**: Framer Motion
- **State Management**: Recoil
- **API**: TMDB API, OMDB API, YouTube API
- **Carousel**: Swiper.js
- **Icons**: React Icons

## 📦 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm start

# 빌드
npm run build
```

## 🔑 API 키 설정

### TMDB API 키

1. [TMDB](https://www.themoviedb.org/settings/api)에서 API 키 발급
2. 프로젝트 루트에 `.env` 파일 생성
3. 다음 내용 추가:

```
REACT_APP_API_KEY=your_tmdb_api_key_here
```

### OMDB API 키 (선택사항)

로튼 토마토 스타일 평점을 사용하려면:

1. [OMDB API](http://www.omdbapi.com/)에서 무료 API 키 발급
2. `.env` 파일에 다음 내용 추가:

```
REACT_APP_OMDB_API_KEY=your_omdb_api_key_here
```

> **참고**: OMDB API 키가 설정되지 않으면 기본 TMDB 평점이 표시됩니다.

## 🎨 디자인 특징

- **스포티파이 톤앤톤**: 깊이 있는 다크 테마와 그린 액센트
- **반응형 레이아웃**: 1024px, 768px, 480px 브레이크포인트
- **부드러운 애니메이션**: Framer Motion을 활용한 자연스러운 전환
- **그라데이션 효과**: 배경과 슬라이더 간의 자연스러운 연결

## 📱 반응형 지원

- **데스크톱**: 5개 슬라이드 표시
- **태블릿**: 4개 슬라이드 표시
- **모바일**: 3개 슬라이드 표시
- **소형 모바일**: 2개 슬라이드 표시

## 🎯 주요 페이지

- **홈**: 현재 상영중, 인기작, 예정작 슬라이더
- **TV**: 드라마/시리즈 콘텐츠
- **검색**: 실시간 검색 기능
- **상세 페이지**: 영화/드라마 상세 정보 및 예고편

## 🔧 문제 해결

### OMDB API 오류

```
GET https://www.omdbapi.com/?t=...&apikey=YOUR_OMDB_API_KEY 401 (Unauthorized)
```

이 오류가 발생하면:

1. OMDB API 키가 올바르게 설정되었는지 확인
2. `.env` 파일이 프로젝트 루트에 있는지 확인
3. 개발 서버를 재시작

## 📄 라이선스

이 프로젝트는 학습 목적으로 제작되었습니다.
