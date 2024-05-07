
import { useQuery } from "react-query";
import { IGetTvResult, getTvs, getPopulars, getTodaysTvs, getTopRated, getYoutubeList } from "../../api";
import styled from "styled-components";
import { makeImagePath } from "../../Utils/utils";
import { AnimatePresence } from "framer-motion";
import { PathMatch, useMatch, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css";
import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import * as S from "../../CSS/LilBoxCss";
import * as o from "../../CSS/BigBoxCss";
import * as t from "../../CSS/MainCss";
import { renderStars } from "../../Utils/RenderStars";


const StyledSwiper = styled(Swiper)`
`;

//슬라이더 
function TvSlider({ title, Tvs }: { title: string, Tvs: any[] }) {
    const history = useNavigate()
    const onBoxClicked = (tvId: number) => {
        history(`/tv/${tvId}`);
    };

    return (
        <o.Slider1>
            <o.FrontTitle>{title}</o.FrontTitle>
            <StyledSwiper slidesPerView={5} autoHeight={true} navigation={true} spaceBetween={15} watchOverflow={true}>
                {Tvs.map((tv) => (
                    <SwiperSlide key={tv.id}>
                        <o.Box
                            layoutId={tv.id + ""}
                            whileHover="hover"
                            initial="normal"
                            variants={o.boxVariants}
                            onClick={() => onBoxClicked(tv.id)}
                            transition={{ type: "tween" }}
                            $bgPhoto={makeImagePath(tv.backdrop_path)}
                        >
                            <o.Info variants={o.infoVariants}>
                                <h4 style={{ fontSize: "26px", padding: "10px" }}>{tv.title}</h4>
                            </o.Info>
                        </o.Box>
                    </SwiperSlide>
                ))}
            </StyledSwiper>
        </o.Slider1>
    );
}

function Tv() {
    const history = useNavigate();
    const onOverLayClicked = () => history(`/tv`)
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
        
    const [selectedVideo, setSelectedVideo] = useState<any>(null);

    useEffect(() => {
        const fetchVideo = async () => {
            if (bigTvMatch && bigTvMatch.params.tvid) { 
                try {
                    const youtubeData = await getYoutubeList("tv", bigTvMatch.params.tvid); 
                    setSelectedVideo(youtubeData.results[0]); // 검색된 첫번째 사용
                } catch (error) {
                    console.error("데이터가 없는뎁쇼?: ", error);
                }
            } else {
                setSelectedVideo(null);
            }
        };
    
        fetchVideo();
    }, [bigTvMatch]);


    
    const clickedtv =      //클릭한 div에 해당값 들어있는지 확인
    bigTvMatch?.params.tvid &&
    ( 
        data?.results.find((tv) => tv.id+"" === bigTvMatch.params.tvid) ||
        Populars?.results.find((tv) => tv.id+"" === bigTvMatch.params.tvid) ||
        TodaysTvs?.results.find((tv) => tv.id+"" === bigTvMatch.params.tvid) ||
        TopRated?.results.find((tv) => tv.id+"" === bigTvMatch.params.tvid) 
    );
    console.log(clickedtv);

    const filterDuplicates = (tvToFilter: any[], excludedTv: any[]) => {
        return tvToFilter.filter(tv =>
            !excludedTv.some(excludedTv => excludedTv.id === tv.id)
        );
    };

    
    SwiperCore.use([Navigation,Pagination, Autoplay]);
    
        return <t.Wrapper>
        {isLoading ? (<t.Loader>Loding....</t.Loader>
        ) : (
            <>
            <t.Banner  
            $bgPhoto = {makeImagePath(data?.results[0].backdrop_path || "")}
            >
            <t.Box>
            <t.BigPhoto $bgPhoto={makeImagePath(data?.results[0].poster_path || "")}/>
                <t.LilBox>
                    <o.Title>{data?.results[0].name}</o.Title>
                    <o.LilTitle>{data?.results[0].original_name}</o.LilTitle>
                    <o.Popularity>좋아요👍:{data?.results[0].popularity}</o.Popularity>
                    <o.Date>첫 방영일: {data?.results[0].first_air_date}</o.Date>
                    <o.OverView>{data?.results[0].overview}</o.OverView>
                </t.LilBox>
            </t.Box>
            </t.Banner>
            
                <TvSlider title="가장 인기 있는 Tv Show" Tvs={Populars?.results || []} />
                <TvSlider title="On Air" Tvs={filterDuplicates(TodaysTvs?.results || [], data?.results || [])}  />
                <TvSlider title="꼭 봐야하는 Tv Show" Tvs={filterDuplicates(TopRated?.results || [], data?.results || [])} />
                        
            
                    
                <AnimatePresence>
                {bigTvMatch ? (
                    <>
                        <S.OverLay 
                        onClick={onOverLayClicked}
                        animate={{opacity:2}}
                        />
                        <S.BigType 
                        style={{position: "fixed"}} 
                        layoutId={bigTvMatch.params.movieId}>
                        
                            {clickedtv && 
                            <>
                            <S.BigMain>
                            <S.BigCover 
                            style={{backgroundImage:`linear-gradient(to top, black,transparent ),
                            url( ${makeImagePath (clickedtv.backdrop_path) 
                            })`}}/>
                                <S.BigSearch>
                                    <S.Bigposter 
                                    style={{backgroundImage :`url(${makeImagePath(clickedtv.poster_path)})`}}/>
                                    <S.BigTitle>{clickedtv.name}</S.BigTitle>
                                    <S.Bigrelease_date>  첫 방영일 :{clickedtv.first_air_date}</S.Bigrelease_date>
                                    <S.Bigpopularity> {clickedtv ? renderStars(clickedtv.vote_average) : null} / {(clickedtv.vote_average).toFixed(1)} </S.Bigpopularity>                        
                                    <S.BigOverview>{clickedtv.overview}</S.BigOverview>
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

export default Tv;