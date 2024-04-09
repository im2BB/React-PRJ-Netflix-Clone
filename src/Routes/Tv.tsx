
import { useQuery } from "react-query";
import { IGetTvResult, getTvs, getPopulars, getTodaysTvs, getTopRated } from "../api";
import styled from "styled-components";
import { makeImagePath } from "./utils";
import { motion,AnimatePresence } from "framer-motion";
import { PathMatch, useMatch, useNavigate } from "react-router-dom";
import { BsStarFill, BsStarHalf } from "react-icons/bs";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css";
import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper";





const Wrapper = styled.div`
    background-color: black;
    padding-bottom: 200px;
`;

const Loder = styled.div`
    height: 20vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Banner = styled.div<{ $bgPhoto: string }>`
    height: 90vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 60px;
    background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.$bgPhoto });
    background-size: cover;
    pointer-events: none;
`;

const Title = styled.h2`
    font-size: 105px;
    margin-bottom: 15px;
`;

const LilTitle = styled.h2`
    font-size: 20px;
    margin-bottom: 5px;
    padding-left: 45px;
`;

const Popularity = styled.h2`
    font-size: 15px;
    margin-bottom: 40px;
    margin-left: 125px;
`

const Date = styled.h2`
    font-size: 22px;
    margin-left: 40px;
    margin-bottom: 20px;
    width: 50%;
`;

const OverView = styled.p`
    font-size: 18px;
    margin-left: 40px;
    width: 50%;
`;

const StyledSwiper = styled(SwiperSlide)`
    position: relative;
    top: -200px;
`;


const Box = styled(motion.div)<{$bgPhoto:string}>`
    background-color: white;
    background-image: url(${props => props.$bgPhoto});
    background-size: cover;
    background-position: center center;
    transform: translate(-50%, -50%);
    height: auto;
    color :white;
    font-size:24px;
    height: 250px;
    
`;



const boxVariants = {
    normal: {
        scale:1,
    },
    hover: {
        scale:1.05,
        y: 0,
        transition: {
            delay:0.1,
            type:"tween",
        },
    },
};





const Bigtv = styled(motion.div)`
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

const BigCover = styled.div`
    width: 100%;
    background-size: cover;
    background-position: center center;
    height: 400px;
    color: ${props => props.theme.white.lighter};
`;


const BigTitle = styled.h3`
    color: ${props => props.theme.white.lighter};
    font-size: 41px;
    position:  relative;
    top:-165px;
    padding-left: 345px;
`;

const BigOverview = styled.p`
    padding: 20px;
    position:  relative;
    top:-85px;
    color: ${props => props.theme.white.lighter};
    overflow: auto;
`;

const Bigrelease_date = styled.p`
    padding: 20px;  
    position:  relative;
    top:-115px;
    color: ${props => props.theme.white.lighter};
    
`;

const Bigpopularity = styled.p`
    padding-left: 20px;
    padding-bottom: 20px;  
    position:  relative;
    top:-115px;
    color: ${props => props.theme.white.lighter};
`;

const Bigposter = styled.div`
    width: 300px;
    height: 450px;
    background-size: cover;
    margin: 30px;
    position: relative;
    top:-330px;
    float: left;
    border-radius: 10px;
    box-shadow : 3px 3px 1px black;

`;

const FrontTitle = styled.h2`
    margin: 20px; 
    font-Size: 25px;
    top:-340px;
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

function Tv() {
    const history = useNavigate()
    const bigTvMatch: PathMatch<string> | null = useMatch("/tv/:tvid");
    const { data, isLoading } = useQuery<IGetTvResult>(
        ["tv", "onTheAir"],
        getTvs
    );

    const { data: Populars } = useQuery<IGetTvResult>(
        ["getPopulars"],
        getPopulars
    );

    const { data: TodaysTvs } = useQuery<IGetTvResult>(
        ["getTodaysTvs"],
        getTodaysTvs
    );

    const { data: TopRated } = useQuery<IGetTvResult>(
        ["getTopRated"],
        getTopRated
    );
        
    const onBoxClicked = (tvid:number) => {
        history(`/tv/${tvid}`)
    };
    const onOverLayClicked = () => history(`/tv`)  
    
    const clickedtv =      //클릭한 div에 해당값 들어있는지 확인
    bigTvMatch?.params.tvid &&( 
    data?.results.find((tv) => tv.id+"" === bigTvMatch.params.tvid) ||
    Populars?.results.find((tv) => tv.id+"" === bigTvMatch.params.tvid) ||
    TodaysTvs?.results.find((tv) => tv.id+"" === bigTvMatch.params.tvid) ||
    TopRated?.results.find((tv) => tv.id+"" === bigTvMatch.params.tvid) 
    );
    
    console.log(clickedtv);

    SwiperCore.use([Navigation,Pagination, Autoplay]);
    
        return <Wrapper>
        {isLoading ? (<Loder>Loding....</Loder>
        ) : (
            <>
            <Banner  
            $bgPhoto = {makeImagePath(data?.results[0].backdrop_path || "")}
            >
                <Title>{data?.results[0].name}</Title>
                <LilTitle>{data?.results[0].original_name}</LilTitle>
                <Popularity>좋아요👍:{data?.results[0].popularity}</Popularity>
                <Date>첫 방영일: {data?.results[0].first_air_date}</Date>
                <OverView>{data?.results[0].overview}</OverView>
            </Banner>
            
                
                <StyledSwiper>
                <FrontTitle style={{margin:"20px", fontSize:"25px"}}>On the Air</FrontTitle>
                <Swiper 
                    slidesPerView={5}
                    navigation={true}
                    spaceBetween= {10} 
                    >
                    {data?.results.map((tv) => (
                        <SwiperSlide 
                        key={tv.id}> 
                        <Box
                            layoutId={tv.id + ""}
                            whileHover="hover"
                            initial="normal"
                            variants={boxVariants}
                            onClick={() => onBoxClicked(tv.id)}
                            transition={{ type: "tween" }}
                            $bgPhoto={makeImagePath(tv.backdrop_path)}
                        >
                            <img /> 
                            <Info variants={infoVariants}>
                            <h4 style={{fontSize:"26px",padding:"10px"}}>{tv.name}</h4>
                            </Info>
                        </Box>
                        </SwiperSlide>
                    ))}
                    </Swiper>
                </StyledSwiper>
                
                <StyledSwiper>
                <FrontTitle style={{margin:"20px", fontSize:"25px"}}>Top 10</FrontTitle>
                <Swiper slidesPerView={5} navigation={true} spaceBetween= {10} >
                    {Populars?.results.map((tv) =>{
                    if (data?.results.some((dataTv)=> dataTv.id === tv.id)) return null;
                    return (
                        <SwiperSlide 
                        key={tv.id}> 
                        <Box
                            layoutId={tv.id + ""}
                            whileHover="hover"
                            initial="normal"
                            variants={boxVariants}
                            onClick={() => onBoxClicked(tv.id)}
                            transition={{ type: "tween" }}
                            $bgPhoto={makeImagePath(tv.backdrop_path)}
                        >
                            <img /> 
                            <Info variants={infoVariants}>
                            <h4 style={{fontSize:"26px",padding:"10px"}}>{tv.name}</h4>
                            </Info>
                        </Box>
                        </SwiperSlide>
                    );
                    })}
                    </Swiper>
                    </StyledSwiper>
                    <StyledSwiper>
                <FrontTitle style={{margin:"20px", fontSize:"25px"}}>최근 인기 프로그램</FrontTitle>
                <Swiper slidesPerView={5} navigation={true} spaceBetween= {10} >
                    {TodaysTvs?.results.map((tv) =>{
                    if (data?.results.some((dataTv)=> dataTv.id === tv.id)) return null;
                    return (
                        <SwiperSlide 
                        key={tv.id}> 
                        <Box
                            layoutId={tv.id + ""}
                            whileHover="hover"
                            initial="normal"
                            variants={boxVariants}
                            onClick={() => onBoxClicked(tv.id)}
                            transition={{ type: "tween" }}
                            $bgPhoto={makeImagePath(tv.backdrop_path)}
                        >
                            <img /> 
                            <Info variants={infoVariants}>
                            <h4 style={{fontSize:"26px",padding:"10px"}}>{tv.name}</h4>
                            </Info>
                        </Box>
                        </SwiperSlide>
                    );
                    })}
                    </Swiper>
                    </StyledSwiper>
                    <StyledSwiper>
                <FrontTitle style={{margin:"20px", fontSize:"25px"}}>죽기전에 봐야할 Tv 프로그램</FrontTitle>
                <Swiper slidesPerView={5} navigation={true} spaceBetween= {10} >
                    {TopRated?.results.map((tv) =>{
                    if (data?.results.some((dataTv)=> dataTv.id === tv.id)) return null;
                    return (
                        <SwiperSlide 
                        key={tv.id}> 
                        <Box
                            layoutId={tv.id + ""}
                            whileHover="hover"
                            initial="normal"
                            variants={boxVariants}
                            onClick={() => onBoxClicked(tv.id)}
                            transition={{ type: "tween" }}
                            $bgPhoto={makeImagePath(tv.backdrop_path)}
                        >
                            <img /> 
                            <Info variants={infoVariants}>
                            <h4 style={{fontSize:"26px",padding:"10px"}}>{tv.name}</h4>
                            </Info>
                        </Box>
                        </SwiperSlide>
                    );
                    })}
                    </Swiper>
                    </StyledSwiper>
                    
                <AnimatePresence>
                {bigTvMatch ? (
                    <>
                        <OverLay 
                        onClick={onOverLayClicked}
                        exit={{opacity:0}}
                        animate={{opacity:2}}
                        
                        />
                        <Bigtv
                        style={{position: "fixed"}} 
                        layoutId={bigTvMatch.params.movieId}>
                        
                        {clickedtv && 
                        <>
                        <BigCover 
                        style={{backgroundImage:`linear-gradient(to top, black,transparent ),
                        url( ${makeImagePath (clickedtv.backdrop_path) 
                        })`}}/>
                        <BigTitle>{clickedtv.name}</BigTitle>
                        <Bigposter 
                        style={{backgroundImage :`url(${makeImagePath(clickedtv.poster_path)})`}}/>
                        <Bigrelease_date>  첫 방영일 :{clickedtv.first_air_date}</Bigrelease_date>
                        <Bigpopularity> {clickedtv ? renderStars(clickedtv.vote_average) : null} / {(clickedtv.vote_average).toFixed(1)} </Bigpopularity>                        
                        <BigOverview>{clickedtv.overview}</BigOverview>
                        </>}
                        
                        </Bigtv>
                        
                    </>  
                    ): null}
                </AnimatePresence> 
                </>
            )} 
            </Wrapper>;
    
}

export default Tv;