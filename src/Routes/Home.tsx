
import { useQuery } from "react-query";
import { IGetMoviesResult, getMovies,  getPopular, getRatedMovies, getUpcoming, getYoutubeList } from "../api";
import styled from "styled-components";
import { makeImagePath } from "./utils";
import { motion,AnimatePresence } from "framer-motion";
import { PathMatch, useMatch, useNavigate } from "react-router-dom";
import { BsStarFill, BsStarHalf } from "react-icons/bs";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css";
import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper";
import { YouTubeProps } from "react-youtube";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import * as S from "../CSS/LilBoxCss";
import * as o from "../CSS/BigBoxCss";
import * as t from "../CSS/MainCss";



const StyledSwiper = styled(Swiper)`

`;


const Box = styled(motion.div)<{$bgPhoto:string}>` 
    background-color: white;
    background-image: url(${(props) => props.$bgPhoto });
    background-size: cover;
    background-position: center center;
    transform: translate(-10%, -10%);
    height: 250px;
    font-size: 35px;
    z-index: 1000;
    border-radius: 2px;
    position: relative;
`;    



const boxVariants = {
    
    normal: {
        scale:1,
    },
    hover: {
        scale:1.05,
        y: -5,
        transition: {
            delay:0.1,
            type:"tween",
        },
    },
};


const Info = styled(motion.div)`
    background-color: ${(props) => props.theme.black.mediumdark};
    opacity: 0;
    position: absolute;
    width: 100%;
    bottom: 0;
    h4{
        text-align: center;
        font-size: 15px;
    }
`;



const infoVariants = {
    hover: {
        opacity:1.05,
        transition: {
            delay:0.1,
            type:"tween",
        },
    }
}





const renderStars = (rating:number, color = "#f1f169") => {  //별점 출력 함수
    const integerPart = Math.floor(rating / 2); // 평점을 2로 나눈 정수 부분을 계산
    const hasHalfStar = rating % 2 !== 0; // 반 별표가 있는지 확인

    const filledStars = Array(integerPart).fill(2); // 평점에 해당하는 별표 배열 생성
    const emptyStars = Array(Math.max(0, 4 - integerPart)).fill(2); // 남은 빈 별표 배열 생성

    return (
        <>
            {filledStars.map((_, i) => (
                <BsStarFill key={i} size="13" color={color} />
            ))}
            {hasHalfStar && <BsStarHalf key="half" size="13" color={color} />}
            {emptyStars.map((_, i) => (
                <BsStarFill key={i + integerPart} size="13" color="#E3E3E3" />
            ))}
        </>
    );
};

function Home() {
    const history = useNavigate()
    const bigMovieMatch: PathMatch<string> | null = useMatch("/movies/:movieId")
    const { data, isLoading } = useQuery<IGetMoviesResult>(
        ["Getmovies", "GetnowPlaying"],
        getMovies
    );

    const { data: PopularMovie } = useQuery<IGetMoviesResult>(
        ["getRatedMovies"],
        getPopular
    );

    const { data: RatedMovie } = useQuery<IGetMoviesResult>(
        ["getPopular"],
        getRatedMovies
    );
    
    const { data: Upcoming } = useQuery<IGetMoviesResult>(
        ["GetUpcoming"],
        getUpcoming
    );

    const [selectedVideo, setSelectedVideo] = useState<any>(null);

    const onBoxClicked = (movieId:number) => {
        history(`/movies/${movieId}`)
    };
    const onOverLayClicked = () => history(`/react-PRJ2`)  
    
    

    useEffect(() => {
        const fetchVideo = async () => {
            if (bigMovieMatch && bigMovieMatch.params.movieId) {
                try {
                    const youtubeData = await getYoutubeList("movie", bigMovieMatch.params.movieId);
                    setSelectedVideo(youtubeData.results[0]); // Use the first video only
                } catch (error) {
                    console.error("데이터가 없는뎁쇼?: ", error);
                }
            } else {
                setSelectedVideo(null);
            }
        };
    
        fetchVideo();
    }, [bigMovieMatch]);

    const clickedMovie =      //클릭한 div에 해당값 들어있는지 확인
    bigMovieMatch?.params.movieId &&
    (
        data?.results.find((movie) => movie.id+"" === bigMovieMatch.params.movieId) ||
        RatedMovie?.results.find((movie) => movie.id+"" === bigMovieMatch.params.movieId) ||
        PopularMovie?.results.find((movie) => movie.id+"" === bigMovieMatch.params.movieId)||
        Upcoming?.results.find((movie) => movie.id+"" === bigMovieMatch.params.movieId)
    );
    console.log(clickedMovie);
    
    
        SwiperCore.use([Navigation,Pagination, Autoplay]);
        
        return <t.Wrapper>
                {isLoading ? (<t.Loader>Loding....</t.Loader>
                ) : (
                    
                    
                    <>
                    <t.Banner  
                    $bgPhoto = {makeImagePath(data?.results[0].backdrop_path || "")}
                    >
                        <o.Title>{data?.results[0].title}</o.Title>
                        <o.LilTitle>{data?.results[0].original_title}</o.LilTitle>
                        <o.Date>개봉일 : {data?.results[0].release_date}</o.Date>
                        <o.OverView>{data?.results[0].overview}</o.OverView>
                    </t.Banner>
                    <o.Slider1>
                        
                        <o.FrontTitle>현재 상영중</o.FrontTitle>
                                <StyledSwiper slidesPerView={5} autoHeight={true} navigation={true} spaceBetween={15} watchOverflow={true}>
                                    {data?.results.map((movie) => (
                                                <SwiperSlide 
                                                        key={movie.id}>
                                                        <Box
                                                            layoutId={movie.id + ""}
                                                            whileHover="hover"
                                                            initial="normal"
                                                            variants={boxVariants}
                                                            onClick={() => onBoxClicked(movie.id)}
                                                            transition={{ type: "tween" }}
                                                            $bgPhoto={makeImagePath(movie.backdrop_path)}
                                                    >
                                                        
                                                        <Info variants={infoVariants}>
                                                            <h4 style={{ fontSize: "26px", padding: "10px" }}>{movie.title}</h4>
                                                        </Info>
                                                    </Box>
                                                </SwiperSlide>
                                                
                                    ))}
                                </StyledSwiper>
                    </o.Slider1>
                    
                    <o.Slider1>
                        <o.FrontTitle style={{ margin: "20px", fontSize: "25px" }}>죽기전에 봐야 할 영화</o.FrontTitle>
                        <StyledSwiper slidesPerView={5} navigation={true} spaceBetween={15} watchOverflow={true}>
                            {RatedMovie?.results.map((movie) => {
                                if (data?.results.some((dataMovie) => dataMovie.id === movie.id)) return null;
                                return (
                                    <SwiperSlide key={movie.id}>
                                        <Box
                                            layoutId={movie.id + ""}
                                            whileHover="hover"
                                            initial="normal"
                                            variants={boxVariants}
                                            onClick={() => onBoxClicked(movie.id)}
                                            transition={{ type: "tween" }}
                                            $bgPhoto={makeImagePath(movie.backdrop_path)}
                                        >
                                            
                                            <Info variants={infoVariants}>
                                                <h4 style={{ fontSize: "26px", padding: "10px" }}>{movie.title}</h4>
                                            </Info>
                                        </Box>
                                    </SwiperSlide>
                                );
                            })}
                        </StyledSwiper>
                    </o.Slider1>

                    <o.Slider1>
                        <o.FrontTitle style={{ margin: "20px", fontSize: "25px" }}>인기 상영작</o.FrontTitle>
                        <StyledSwiper  slidesPerView={5} navigation={true} spaceBetween={15} watchOverflow={true}>
                            {PopularMovie?.results.map((movie) => {
                                if (data?.results.some((dataMovie) => dataMovie.id === movie.id)) return null;
                                return (
                                    <SwiperSlide key={movie.id}>
                                        <Box
                                            layoutId={movie.id + ""}
                                            whileHover="hover"
                                            initial="normal"
                                            variants={boxVariants}
                                            onClick={() => onBoxClicked(movie.id)}
                                            transition={{ type: "tween" }}
                                            $bgPhoto={makeImagePath(movie.backdrop_path)}
                                        >
                                        
                                            <Info variants={infoVariants}>
                                                <h4 style={{ fontSize: "26px", padding: "10px" }}>{movie.title}</h4>
                                            </Info>
                                        </Box>
                                    </SwiperSlide>
                                );
                            })}
                        </StyledSwiper>
                    </o.Slider1>

                    <o.Slider1>
                        <o.FrontTitle style={{ margin: "20px", fontSize: "25px" }}>예정작</o.FrontTitle>
                        <StyledSwiper  slidesPerView={5} navigation={true} spaceBetween={15} watchOverflow={true}>
                            {Upcoming?.results.map((movie) => {
                                if (data?.results.some((dataMovie) => dataMovie.id === movie.id)) return null;
                                return (
                                    <SwiperSlide key={movie.id}>
                                        <Box
                                            layoutId={movie.id + ""}
                                            whileHover="hover"
                                            initial="normal"
                                            variants={boxVariants}
                                            onClick={() => onBoxClicked(movie.id)}
                                            transition={{ type: "tween" }}
                                            $bgPhoto={makeImagePath(movie.backdrop_path)}
                                        >
                                            
                                            <Info variants={infoVariants}>
                                                <h4 style={{ fontSize: "26px", padding: "10px" }}>{movie.title}</h4>
                                            </Info>
                                        </Box>
                                    </SwiperSlide>
                                );
                            })}
                        </StyledSwiper>
                    </o.Slider1>

                
                <AnimatePresence>
                {bigMovieMatch ? (
                        <>
                            <S.OverLay 
                            onClick={onOverLayClicked}
                            exit={{opacity:0}}
                            animate={{opacity:2}}
                            />
                            <S.BigType
                            style={{ position: "fixed"} } 
                            layoutId={bigMovieMatch.params.movieId}>
                            
                                {clickedMovie && 
                                <>
                                <S.BigMain>
                                <S.BigCover 
                                style={{backgroundImage:`linear-gradient(to top, black,transparent),
                                url( ${makeImagePath (clickedMovie.backdrop_path) 
                                })`}}/>
                                    <S.BigSearch>
                                        <S.Bigposter 
                                        style={{backgroundImage :`url(${makeImagePath(clickedMovie.poster_path)})`}}/>
                                        <S.BigTitle>{clickedMovie.title}</S.BigTitle>
                                        <S.LlilTitle>{clickedMovie.original_title}</S.LlilTitle> 
                                        <S.Bigrelease_date> 개봉일 : {clickedMovie.release_date}</S.Bigrelease_date>
                                        <S.Bigpopularity> 평점 : {clickedMovie ? renderStars(clickedMovie.vote_average) : null} / {(clickedMovie.vote_average).toFixed(1)} </S.Bigpopularity>                        
                                        <S.BigOverview>{clickedMovie.overview}</S.BigOverview>
                                        <S.Frame>
                                            {selectedVideo && selectedVideo.key ? (
                                                    <ReactPlayer 
                                                        className="react-player" 
                                                        url={`https://www.youtube.com/watch?v=${selectedVideo.key}`}
                                                        width="80%" 
                                                        height="80%" 
                                                        playing={true} 
                                                        loop={true} />
                                                    ) : (
                                                        <S.Dhk>😅예고편/미리보기가 없어요😅</S.Dhk>
                                                    )}
                                        </S.Frame>
                                    </S.BigSearch>
                                </S.BigMain>
                                </>}

                            </S.BigType>
                        </>  
                    ): null}
                </AnimatePresence>
                </>
            )}
            </t.Wrapper>;
    
}

export default Home;