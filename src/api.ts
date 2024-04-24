
const API_KEY = "ec180f3d7555520fa9d4bcff596736b9";
const BASE_PATH = "https://api.themoviedb.org/3";
const LANGUAGE = "language=ko-KR";
const LANGU = "language=en-EN";

interface IGenreList {
    id:number;

}

interface IMovie {
    id: number;
    backdrop_path: string;
    poster_path: string;
    title: string;
    original_title: string;
    overview: string;
    release_date:number;
    popularity:number;
    vote_average:number;
    genre :string;
    videos: boolean;
    media_type: string;
}


interface ITv {
    id: number;
    backdrop_path: string;
    poster_path: string;
    name: string;
    original_name:string;
    overview: string;
    first_air_date:number;
    popularity:number;
    vote_average:number;
}

interface IYoutube {
    id: number;
    backdrop_path: string;
    poster_path: string;
    name: string;
    original_name:string;
    overview: string;
    first_air_date:number;
    popularity:number;
    vote_average:number;
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

export interface IGetTvResult {
    dates: {
        maximum: string;
        minimum: string;
    };
    page: number;
    results: ITv[];
    total_pages: number;
    total_results: number;
    vote_average:number;
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
    vote_average:number;
    } 

export interface IGetIGenreList {
    dates: {
        maximum: string;
        minimum: string;
    };
    page: number;
    results: IGenreList[];
    total_pages: number;
    total_results: number;
    vote_average:number;
    } 



    export function getMovies() {    
        return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}&${LANGUAGE}`).then(
            (response) => response.json()
        );
    }

    export function getPopular() {    
        return fetch(`${BASE_PATH}/movie/popular?api_key=${API_KEY}&${LANGUAGE}`).then(
            (response) => response.json()
        );
    }
    
    export function getRatedMovies() {    
        return fetch(`${BASE_PATH}/movie/top_rated?api_key=${API_KEY}&${LANGUAGE}`).then(
            (response) => response.json()
        );
    }

    export function getUpcoming() {    
        return fetch(`${BASE_PATH}/movie/upcoming?api_key=${API_KEY}&${LANGUAGE}`).then(
            (response) => response.json()
        );
    }



    export function getTvs() {        
        return fetch(`${BASE_PATH}/tv/on_the_air?api_key=${API_KEY}&${LANGUAGE}`).then(
            (response) => response.json()
        );
    }
    
    export function getPopulars() {        
        return fetch(`${BASE_PATH}/tv/popular?api_key=${API_KEY}&${LANGUAGE}`).then(
            (response) => response.json()
        );
    }
    
    export function getTodaysTvs() {        
        return fetch(`${BASE_PATH}/tv/airing_today?api_key=${API_KEY}&${LANGUAGE}`).then(
            (response) => response.json()
        );
    }
    
    export function getTopRated() {        
        return fetch(`${BASE_PATH}/tv/top_rated?api_key=${API_KEY}&${LANGUAGE}`).then(
            (response) => response.json()
        );
    }


    export function getSearchMulti(
        serchkeyword: string,
        page : number
        ){
        return fetch(`${BASE_PATH}/search/multi?query=${serchkeyword}&include_adult=false&api_key=${API_KEY}&${LANGUAGE}`)
            .then(response => response.json());
    }



    export function getMoviesList() {
        return fetch(`${BASE_PATH}/genre/movie/list?api_key=${API_KEY}&${LANGUAGE}`).then(
            (response) => response.json()
        );
    }

    export function getTvList() {
        return fetch(`${BASE_PATH}/genre/tv/list?api_key=${API_KEY}&${LANGUAGE}`).then(
            (response) => response.json()
        );
    }

    export function getYoutubeList(mediaType: string, itemId: string, language?: string) {
        let url;
        if (mediaType === "movie") {
            url = `${BASE_PATH}/movie/${itemId}/videos?api_key=${API_KEY}&${LANGU}`;
        } else if (mediaType === "tv") {
            url = `${BASE_PATH}/tv/${itemId}/videos?api_key=${API_KEY}&${LANGU}`;
        } else {
            throw new Error("Invalid media type");
        }
    
        return fetch(url).then((response) => response.json());
    }