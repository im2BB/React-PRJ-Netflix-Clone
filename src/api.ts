const API_KEY = "ec180f3d7555520fa9d4bcff596736b9";
const BASE_PATH = "https://api.themoviedb.org/3";
const LANGUAGE = "language=ko-KR";

// OMDB API 키 (무료로 사용 가능)
const OMDB_API_KEY = "http://www.omdbapi.com/?apikey=YOUR_OMDB_API_KEY"; // 실제 API 키로 교체 필요

// 로튼 토마토 스타일 평점 인터페이스
export interface IRottenTomatoScore {
  imdbRating: string;
  imdbVotes: string;
  tomatoScore?: string; // 로튼 토마토 점수 (OMDB에서 제공하는 경우)
  tomatoUserScore?: string; // 로튼 토마토 사용자 점수
  tomatoConsensus?: string; // 로튼 토마토 합의
  tomatoFresh?: string; // 신선한 토마토 수
  tomatoRotten?: string; // 썩은 토마토 수
  tomatoUserMeter?: string; // 사용자 미터
  tomatoUserReviews?: string; // 사용자 리뷰 수
  tomatoUserRatings?: string; // 사용자 평점 수
  tomatoURL?: string; // 로튼 토마토 URL
}

interface IProvider {
  logo_path: string;
  provider_id: number;
  provider_name: string;
  display_priority: number;
}

interface IPepleList {
  adult: string;
  gender: number;
  id: string;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  cast_id: number;
  character: string;
  credit_id: number;
  order: number;
}

interface IYoutubeList {
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  published_at: number;
}

interface IMovie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  original_title: string;
  overview: string;
  release_date: number;
  popularity: number;
  vote_average: number;
  genre: string;
  videos: boolean;
  media_type: string;
  key: string;
}

interface ITv {
  id: number;
  backdrop_path: string;
  poster_path: string;
  name: string;
  original_name: string;
  overview: string;
  first_air_date: number;
  popularity: number;
  vote_average: number;
}

interface IYoutube {
  id: number;
  backdrop_path: string;
  poster_path: string;
  name: string;
  original_name: string;
  overview: string;
  first_air_date: number;
  popularity: number;
  vote_average: number;
}

export interface ISearch {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  name: string;
  original_title: string;
  original_name: string;
  overview: string;
  release_date: number;
  first_air_date: number;
  popularity: number;
  vote_average: number;
  genre: string;
  videos: string;
  media_type: string;
}

export interface IWatchProvider {
  link: string;
  rent?: IProvider[];
  buy?: IProvider[];
}

export interface IGetWatchProvidersResult {
  id: number;
  results: Record<string, IWatchProvider>;
}

export interface IGetTvResult {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: ITv[];
  total_pages: number;
  total_results: number;
  vote_average: number;
}

export interface IGetSearchResult {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: ISearch[];
  total_pages: number;
  total_results: number;
  vote_average: number;
}

export interface IGetYoutubeResult {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IYoutube[];
  total_pages: number;
  total_results: number;
  vote_average: number;
  key: number;
}

export interface IGetMoviesResult {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
  vote_average: number;
  itemId: number;
}

export interface IGetIGenreList {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IYoutubeList[];
  total_pages: number;
  total_results: number;
  vote_average: number;
}

export interface IGetIPersonList {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IPepleList[];
  total_pages: number;
  total_results: number;
  vote_average: number;
}

//인물 관련 Api
export function getCreditsByMediaType(mediaType: string, mediaId: string) {
  return fetch(`${BASE_PATH}/person/person_id?${API_KEY}&${LANGUAGE}`).then(
    (response) => response.json()
  );
}

//영화 관련 Api
export function getMovies() {
  return fetch(
    `${BASE_PATH}/movie/now_playing?api_key=${API_KEY}&${LANGUAGE}`
  ).then((response) => response.json());
}

export function getPopular() {
  return fetch(
    `${BASE_PATH}/movie/popular?api_key=${API_KEY}&${LANGUAGE}`
  ).then((response) => response.json());
}

export function getRatedMovies() {
  return fetch(
    `${BASE_PATH}/movie/top_rated?api_key=${API_KEY}&${LANGUAGE}`
  ).then((response) => response.json());
}

export function getUpcoming() {
  return fetch(
    `${BASE_PATH}/movie/upcoming?api_key=${API_KEY}&${LANGUAGE}`
  ).then((response) => response.json());
}

export function getWatchProviders(
  itemId: string
): Promise<IGetWatchProvidersResult> {
  return fetch(
    `${BASE_PATH}/movie/${itemId}/watch/providers?api_key=${API_KEY}&${LANGUAGE}`
  ).then((response) => response.json());
}

export function getCredits(itemId: string) {
  return fetch(
    `${BASE_PATH}/movie/${itemId}/credits?api_key=${API_KEY}&${LANGUAGE}`
  ).then((response) => response.json());
}

//Tv 관련 Api

export function getTvs() {
  return fetch(
    `${BASE_PATH}/tv/on_the_air?api_key=${API_KEY}&${LANGUAGE}`
  ).then((response) => response.json());
}

export function getPopulars() {
  return fetch(`${BASE_PATH}/tv/popular?api_key=${API_KEY}&${LANGUAGE}`).then(
    (response) => response.json()
  );
}

export function getTodaysTvs() {
  return fetch(
    `${BASE_PATH}/tv/airing_today?api_key=${API_KEY}&${LANGUAGE}`
  ).then((response) => response.json());
}

export function getTopRated() {
  return fetch(`${BASE_PATH}/tv/top_rated?api_key=${API_KEY}&${LANGUAGE}`).then(
    (response) => response.json()
  );
}

export function getTvList() {
  return fetch(
    `${BASE_PATH}/genre/tv/list?api_key=${API_KEY}&${LANGUAGE}`
  ).then((response) => response.json());
}

//검색 관련 Api
export function getSearchMulti(serchkeyword: string, page: number) {
  return fetch(
    `${BASE_PATH}/search/multi?query=${serchkeyword}&include_adult=false&api_key=${API_KEY}&${LANGUAGE}`
  ).then((response) => response.json());
}

//유튜브 관련 Api
export function getYoutubeList(
  mediaType: string,
  itemId: string,
  language?: string
): Promise<IGetYoutubeResult> {
  let url;
  let searchLanguage = "ko-KR"; // 우선적으로 사용할 언어 설정

  if (language && language.toLowerCase() === "en-en") {
    searchLanguage = "en-EN"; // 입력된 언어 값이 "en-EN"인 경우, 검색 언어를 변경
  }

  if (mediaType === "movie") {
    url = `${BASE_PATH}/movie/${itemId}/videos?api_key=${API_KEY}&language=${searchLanguage}`;
  } else if (mediaType === "tv") {
    url = `${BASE_PATH}/tv/${itemId}/videos?api_key=${API_KEY}&language=${searchLanguage}`;
  } else {
    throw new Error("Invalid media type");
  }

  return fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // 만약 검색 결과가 없음 en으로 검색
      if (data.results.length === 0 && searchLanguage === "ko-KR") {
        return getYoutubeList(mediaType, itemId, "en-EN");
      }
      return data;
    });
}

// OMDB API를 통한 로튼 토마토 스타일 평점 가져오기
export async function getRottenTomatoScore(
  title: string,
  year?: string
): Promise<IRottenTomatoScore | null> {
  try {
    // OMDB API 호출
    const searchUrl = `http://www.omdbapi.com/?t=${encodeURIComponent(title)}${
      year ? `&y=${year}` : ""
    }&apikey=YOUR_OMDB_API_KEY`;

    const response = await fetch(searchUrl);
    const data = await response.json();

    if (data.Response === "True") {
      return {
        imdbRating: data.imdbRating || "N/A",
        imdbVotes: data.imdbVotes || "N/A",
        tomatoScore: data.tomatoScore || undefined,
        tomatoUserScore: data.tomatoUserScore || undefined,
        tomatoConsensus: data.tomatoConsensus || undefined,
        tomatoFresh: data.tomatoFresh || undefined,
        tomatoRotten: data.tomatoRotten || undefined,
        tomatoUserMeter: data.tomatoUserMeter || undefined,
        tomatoUserReviews: data.tomatoUserReviews || undefined,
        tomatoUserRatings: data.tomatoUserRatings || undefined,
        tomatoURL: data.tomatoURL || undefined,
      };
    }

    return null;
  } catch (error) {
    console.error("Error fetching Rotten Tomatoes data:", error);
    return null;
  }
}

// TMDB 영화 정보로 로튼 토마토 데이터 가져오기
export async function getRottenTomatoFromTMDB(
  movieTitle: string,
  releaseDate?: string
): Promise<IRottenTomatoScore | null> {
  try {
    // TMDB에서 가져온 제목으로 OMDB 검색
    const year = releaseDate
      ? new Date(releaseDate).getFullYear().toString()
      : undefined;
    return await getRottenTomatoScore(movieTitle, year);
  } catch (error) {
    console.error("Error fetching Rotten Tomatoes data from TMDB:", error);
    return null;
  }
}
