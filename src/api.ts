

const API_KEY = "ec180f3d7555520fa9d4bcff596736b9";
const BASE_PATH = "https://api.themoviedb.org/3";


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
    videos:string;
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

export interface IGetTvResult {
    dates: {
        maximum: string;
        minimum: string;
    };
    page: number;
    results: ITv[];
    total_pages: number;
    total_results: number;
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
    } 


    export function getMovies() {    
        return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}&language=ko-KR`).then(
            (response) => response.json()
        );
    }

    export function getPopular() {    
        return fetch(`${BASE_PATH}/movie/popular?api_key=${API_KEY}&language=ko-KR`).then(
            (response) => response.json()
        );
    }
    
    export function getRatedMovies() {    
        return fetch(`${BASE_PATH}/movie/top_rated?api_key=${API_KEY}&language=ko-KR`).then(
            (response) => response.json()
        );
    }

    export function getUpcoming() {    
        return fetch(`${BASE_PATH}/movie/upcoming?api_key=${API_KEY}&language=ko-KR`).then(
            (response) => response.json()
        );
    }



    export function getTvs() {        
        return fetch(`${BASE_PATH}/tv/on_the_air?api_key=${API_KEY}&language=ko-KR`).then(
            (response) => response.json()
        );
    }
    
    export function getPopulars() {        
        return fetch(`${BASE_PATH}/tv/popular?api_key=${API_KEY}&language=ko-KR`).then(
            (response) => response.json()
        );
    }
    
    export function getTodaysTvs() {        
        return fetch(`${BASE_PATH}/tv/airing_today?api_key=${API_KEY}&language=ko-KR`).then(
            (response) => response.json()
        );
    }
    
    export function getTopRated() {        
        return fetch(`${BASE_PATH}/tv/top_rated?api_key=${API_KEY}&language=ko-KR`).then(
            (response) => response.json()
        );
    }