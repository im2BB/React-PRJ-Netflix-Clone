# React Movie App

TMDB API를 사용한 영화 정보 웹 애플리케이션입니다.

## 주요 기능

- 영화 및 TV 쇼 정보 조회
- 반응형 웹 디자인
- 로튼 토마토 스타일 평점 시스템
- YouTube 예고편 재생
- 검색 기능

## API 설정

### TMDB API

이미 설정되어 있습니다.

### OMDB API (로튼 토마토 평점용)

1. [OMDB API](http://www.omdbapi.com/)에서 무료 API 키를 발급받으세요.
2. `src/api.ts` 파일에서 다음 줄을 찾아 API 키를 교체하세요:
   ```typescript
   const OMDB_API_KEY = "http://www.omdbapi.com/?apikey=YOUR_OMDB_API_KEY"; // 실제 API 키로 교체 필요
   ```
3. `getRottenTomatoScore` 함수에서도 API 키를 교체하세요:
   ```typescript
   const searchUrl = `http://www.omdbapi.com/?t=${encodeURIComponent(title)}${
     year ? `&y=${year}` : ""
   }&apikey=YOUR_OMDB_API_KEY`;
   ```

## 설치 및 실행

```bash
npm install
npm start
```

## 기술 스택

- React
- TypeScript
- Styled Components
- Framer Motion
- React Query
- Swiper

## 반응형 지원

- 데스크톱: 1024px 이상
- 태블릿: 768px - 1024px
- 모바일: 480px - 768px
- 소형 모바일: 480px 이하
