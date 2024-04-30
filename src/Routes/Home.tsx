
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
import YouTube, { YouTubeProps } from "react-youtube";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";



const Wrapper = styled.div`
    background-color: black;
    padding-bottom: 200px;
    `;

const StyledSwiper = styled(Swiper)`
    
`;

const Loder = styled.div`
    height: 20vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Banner = styled.div<{ $bgPhoto: string }>`
    height: 70vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 60px;
    background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.$bgPhoto });
    background-size: cover;
    
`;

const Title = styled.h2`
    font-size: 85px;
    padding-top: 300px;
    margin-bottom: 15px;
`;

const LilTitle = styled.h2`
    font-size: 20px;
    margin-bottom: 40px;
    padding-left: 45px;
`;

const Date = styled.h2`
    font-size: 22px;
    margin-left: 150px;
    margin-bottom: 20px;
    width: 50%;
`;

const OverView = styled.p`
    font-size: 15px;
    margin-left: 40px;
    padding-bottom: 200px;
    width: 50%;
`;


const Slider1 = styled(motion.div)`
    top: -350px;
    
`

const Box = styled(motion.div)<{$bgPhoto:string}>`
    //color: ${props => props.theme.white.lighter}; 
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



const BigMovie = styled(motion.div)`
    position: absolute;
    width: 60vw;
    height: 90vh;
    top: 40px;
    left: 0;
    right: 0;
    margin: 0 auto;
    background-color: ${props => props.theme.black.lighter};
    border-radius: 15px;
    overflow: auto;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE and Edge */
    &::-webkit-scrollbar {
        display: none; /* Chrome, Safari, Opera */
    }
    z-index: 1000;
    
`;

const OverLay = styled(motion.div)`
    position: fixed;
    top: 0;
    width:  100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
    opacity:0;
    ::-webkit-scrollbar {
    display: none;
    }
`;

const BigMain = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const BigCover = styled.div`
    width: 100%;
    background-size: cover;
    background-position: center center;
    height: 420px;


`;


const BigTitle = styled.h3`
    width: 55vw;
    position: center center;
    font-size: 41px;
    position:  relative;
    top:-355px;
    
`;

const LlilTitle = styled.h3`
    font-size: 15px;
    position:  relative;
    top:-365px;
    padding-left: 20px;
    padding-top: 20px;
    width: 50vw;
`;

const BigOverview = styled.p`
    padding-bottom: 20px;
    padding-top: 20px;
    padding-left: 20px;
    position:  relative;
    width: 30vw;
    height: 25vh;
    top:-365px;
    overflow: auto;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
`;

const Frame = styled.div`
    position: relative;
    top: -440px;
    height: 70vh;
    width: 60vw;
    padding: 20px;
    .player {
        position: absolute;
        left: 0px;
        width: 100%;
        height: 100%;
        border-radius: 10px;
        overflow: hidden;
    }
`;

const Dhk = styled.h1`
    font-size: 28px;
    color: white;
    position: absolute;
    padding-top: 330px;
    padding-left: 40px;
`
const BigSerch = styled.div`
    height: 0;
    width: 50vw;
    padding-top: 60px;
`;

const Bigrelease_date = styled.p`
    padding-top: 20px;
    padding-left: 20px;
    width: 30vw;
    position:  relative;
    top:-365px;
    
`;

const Biggenres = styled.div`
    padding: 20px;  
    position:  relative;
    top:-115px;
    color: ${props => props.theme.white.lighter};
    
`;

const Bigpopularity = styled.p`
    position: center center;
    padding-top: 5px;
    padding-left: 20px;
    position:  relative;
    width: 30vw;
    height: 5vh;
    top:-365px;
 
`;

const Bigposter = styled.div`
    width: 300px;
    height: 450px;
    background-size: cover;
    margin: 30px;
    position: relative;
    top:-455px;
    float: left;
    border-radius: 10px;
    box-shadow : 3px 3px 1px black;
    

`;


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

const Img = styled(motion.img)`
    background-color: ${(props) => props.theme.black.mediumdark};
    color: ${props => props.theme.white.lighter};
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
    const bigMovieMatch: PathMatch<string> | null = useMatch("/movies/:movieId");
    const onPlayerReady: YouTubeProps['onReady'] = (event) => {
        event.target.pauseVideo();
    }
    
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
    
    

    const opts: YouTubeProps['opts'] = {
        height: '540',
        width: '620',
        playerVars: {
        autoplay: 1,
        rel: 0, //관련 동영상 표시하지 않음 (근데 별로 쓸모 없는듯..)
        modestbranding: 1, // 컨트롤 바에 youtube 로고를 표시하지 않음
        },
    };

    

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
        
        return <Wrapper>
                {isLoading ? (<Loder>Loding....</Loder>
                ) : (
                    <>
                    <Banner  
                    $bgPhoto = {makeImagePath(data?.results[0].backdrop_path || "")}
                    >
                        <Title>{data?.results[0].title}</Title>
                        <LilTitle>{data?.results[0].original_title}</LilTitle>
                        <Date>개봉일 : {data?.results[0].release_date}</Date>
                        <OverView>{data?.results[0].overview}</OverView>
                    </Banner>
                    <Slider1>
                        
                        <h1 style={{ margin: "20px", fontSize: "25px" }}>현재 상영중</h1>
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
                    </Slider1>
                    
                    <Slider1>
                        <h1 style={{ margin: "20px", fontSize: "25px" }}>죽기전에 봐야 할 영화</h1>
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
                    </Slider1>

                    <Slider1>
                        <h1 style={{ margin: "20px", fontSize: "25px" }}>인기 상영작</h1>
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
                    </Slider1>

                    <Slider1>
                        <h1 style={{ margin: "20px", fontSize: "25px" }}>예정작</h1>
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
                    </Slider1>

                
                <AnimatePresence>
                {bigMovieMatch ? (
                        <>
                            <OverLay 
                            onClick={onOverLayClicked}
                            exit={{opacity:0}}
                            animate={{opacity:2}}
                            />
                            <BigMovie
                            style={{ position: "fixed"} } 
                            layoutId={bigMovieMatch.params.movieId}>
                            
                                {clickedMovie && 
                                <>
                                <BigMain>
                                <BigCover 
                                style={{backgroundImage:`linear-gradient(to top, black,transparent),
                                url( ${makeImagePath (clickedMovie.backdrop_path) 
                                })`}}/>
                                    <BigSerch>
                                        <Bigposter 
                                        style={{backgroundImage :`url(${makeImagePath(clickedMovie.poster_path)})`}}/>
                                        <BigTitle>{clickedMovie.title}</BigTitle>
                                        <LlilTitle>{clickedMovie.original_title}</LlilTitle> 
                                        <Bigrelease_date> 개봉일 : {clickedMovie.release_date}</Bigrelease_date>
                                        <Bigpopularity> 평점 : {clickedMovie ? renderStars(clickedMovie.vote_average) : null} / {(clickedMovie.vote_average).toFixed(1)} </Bigpopularity>                        
                                        <BigOverview>{clickedMovie.overview}</BigOverview>
                                        <Frame>
                                            {selectedVideo && selectedVideo.key ? (
                                                    <ReactPlayer 
                                                        className="react-player" 
                                                        url={`https://www.youtube.com/watch?v=${selectedVideo.key}`}
                                                        width="100%" 
                                                        height="100%" 
                                                        playing={true} 
                                                        loop={true} />
                                                    ) : (
                                                        <Dhk>😅예고편/미리보기가 없어요😅</Dhk>
                                                    )}
                                        </Frame>
                                    </BigSerch>
                                </BigMain>
                                </>}

                            </BigMovie>
                        </>  
                    ): null}
                </AnimatePresence>
                </>
            )}
            </Wrapper>;
    
}

export default Home;