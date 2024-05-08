import { PathMatch, useLocation, useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IGetSearchResult,  getSearchMulti, getYoutubeList  } from "../../api";
import { useQuery } from "react-query";
import { makeImagePath } from "../../Utils/utils";
import { AnimatePresence, motion } from "framer-motion";
import { YouTubeProps } from 'react-youtube';
import { useEffect, useState } from "react";
import ReactPlayer from 'react-player/lazy';
import * as S from "../../CSS/LilBoxCss";
import * as t from "../../CSS/MainCss";
import * as o from "../../CSS/BigBoxCss";
import { renderStars } from "../../Utils/RenderStars";



const BoxTwo = styled(motion.div)`
    display: flex;
    height: 300px;
    width: 350px;
    border-radius: 10px;
    margin: 5px;
    background-color: #555555;
    border-style:solid;
    border-width:0.1px;
    border-color: black;
    flex-wrap: wrap;
`;

const BigBox = styled(motion.div)`
    display: flex;
    flex-wrap: wrap;
`;

const Text = styled.p`
    height: 10vh;
    padding-left: 50px;
    font-size: 20px;
    padding-bottom: 10px;
    padding-top: 10px;
`;

const MainBox = styled.div`
    margin-left: 50px;
    `;

const LilPhoto = styled.div<{ $bgPhoto: string }>`
    background-image: url(${props => props.$bgPhoto});
    background-size: cover;
    background-position: center center;
    border-radius: 5px;
    height: 290px;
    width: 185px;
    margin: 5px;
    
    `;

    const LilBoxtwo = styled.div`
        display: column ;
        width: 150px;
        padding: 10px;
    
    `;

const LilTitle = styled.h2`
    font-size: 15px;
    margin-top: 10px;
`;

const LilName = styled.h2`
    font-size: 10px;
    margin-top: 8px;
    margin-left: 25px;
`;

const LilType = styled.h2`
    font-size: 15px;
    margin-top: 8px;
`;

const LilOverView = styled.p`
    font-size: 12px;
    margin-top: 10px;
    word-wrap: break-word;
        display: -webkit-box;
        -webkit-line-clamp: 3 ;
        -webkit-box-orient: vertical;
`;

const boxVariants = {
    normal: { 
        scale: 1
    },
    hover: { 
        scale: 1.05, 
        y: -5,
        transition: { 
            delay: 0.2,
            type:"tween", 
        } 
    }
};


function Search() {
    const history = useNavigate();
    const location = useLocation();
    const keyword = new URLSearchParams(location.search).get("keyword");
    const keywordMatch: PathMatch<string> | null  = useMatch("/search/:clickId");
    const page = 1;
    const onPlayerReady: YouTubeProps['onReady'] = (event) => {
        event.target.pauseVideo();
    }

    const { data, isLoading } = useQuery<IGetSearchResult>(
        ["getSearch", keyword, page], 
        () => keyword ? getSearchMulti(keyword, page) : Promise.resolve(),
        { enabled: !!keyword }
    );
    const [selectedVideo, setSelectedVideo] = useState<any>(null);



    useEffect(() => {
        const fetchVideo = async () => {
            if (keywordMatch && keywordMatch.params.clickId) {
                try {
                    const item = data?.results.find((keyword) => keyword.id.toString() === keywordMatch.params.clickId);
                    if (item) {
                        const mediaType = item.media_type || "movie"; // media_type가 없을 경우 기본값으로 "movie" 설정
                        const youtubeData = await getYoutubeList(mediaType, keywordMatch.params.clickId);
                        setSelectedVideo(youtubeData.results[0]); // 여기서는 첫 번째 비디오만 사용
                    }
                } catch (error) {
                    console.error("Failed to fetch video data: ", error);
                }
            } else {
                setSelectedVideo(null);
            }
        };

        fetchVideo();
    }, [keywordMatch, data]);




    const onBoxClicked = (clickId:number) => {  //클릭한 값 
        const clickedItem = data?.results.find(keyword => keyword.id === clickId);
        console.log(clickedItem);
        history(`/search/${clickId}?keyword=${keyword}`);
    };
    
    const onOverLayClicked = () => history(`/search?keyword=${keyword}`)  //기존으로 돌아기기

    const clickedSearch =  
    keywordMatch?.params.clickId &&
    (
        data?.results.find((keywords) => keywords.id+"" === keywordMatch.params.clickId)
    );
    
    
    return <t.Wrapper>
        
            {isLoading ? (
                <t.Loader>Loading....</t.Loader>
            ) : (
                <>
                    {data && data.total_results === 0 ? (
                        <t.Banner $bgPhoto="">
                            <p>"{keyword}" 에 관련된 정보가 존재하지 않습니다.</p>
                        </t.Banner>
                    ) : (
                        <t.Banner $bgPhoto={makeImagePath(data?.results[0]?.backdrop_path || "")}>
                            <t.Box>
                                <t.BigPhoto $bgPhoto={makeImagePath(data?.results[0].poster_path || "")}/>
                                <t.LilBox>
                                    <o.Title>{data?.results[0]?.title || data?.results[0]?.name}</o.Title>
                                    <o.LilTitle>{data?.results[0]?.original_title || data?.results[0]?.original_name}</o.LilTitle>
                                    <o.Date>{data?.results[0].release_date || data?.results[0].first_air_date} / {data?.results[0].media_type && (
                                        <span>{data.results[0].media_type.charAt(0).toUpperCase() + data.results[0].media_type.slice(1)}
                                        </span>
                                    )}</o.Date>
                                    <o.OverView>{data?.results[0]?.overview}</o.OverView>
                                </t.LilBox>
                            </t.Box>
                        </t.Banner>
                    )}
                    
                    <AnimatePresence>
                        <MainBox>
                            <Text>
                                <span style={{ fontSize: '25px' }}> - " {keyword} "</span> 에 대한 검색 결과 입니다.
                            </Text>
                                <BigBox>
                                    {data && data.results.map((keywords, index) => (
                                        <BoxTwo 
                                            key={index}
                                            whileHover="hover"
                                            initial="nomal"
                                            variants={boxVariants}
                                            onClick={() => onBoxClicked(keywords.id)}
                                            transition={{ type: "tween" }}
                                        >
                                            <LilPhoto $bgPhoto={makeImagePath(keywords.poster_path || "")} />
                                                <LilBoxtwo>
                                                    <LilTitle>{keywords.title || keywords.name}</LilTitle>
                                                    <LilName>{keywords.original_title || keywords.original_name}</LilName>
                                                    <LilType>{keywords.media_type && (
                                                        <span>{keywords.media_type.charAt(0).toUpperCase() + keywords.media_type.slice(1)}</span>
                                                    )}</LilType>
                                                    <LilOverView>{keywords.overview.length > 150 ? keywords.overview.substring(0, 120) + '.....' : keywords.overview}</LilOverView>
                                                </LilBoxtwo>
                                        </BoxTwo>
                                    ))}
                                </BigBox>
                                
                        </MainBox>
                    </AnimatePresence>
                        
                    <AnimatePresence>
                        { keywordMatch ? (
                            <>
                                <S.OverLay 
                                onClick={onOverLayClicked}
                                exit={{opacity:0}}
                                animate={{opacity:2}}
                                />
                                <S.BigType
                                style={{ position: "fixed"} } 
                                layoutId={keywordMatch.params.clickId}>
                                    
                                    {clickedSearch &&
                                    <>
                                    <S.BigMain>
                                    <S.BigCover
                                    style={{backgroundImage:`linear-gradient(to top, black,transparent),
                                    url( ${makeImagePath (clickedSearch.backdrop_path) 
                                    })`}} />
                                        <S.BigSearch>
                                                <S.Bigposter
                                                style={{backgroundImage :`url(${makeImagePath(clickedSearch.poster_path)})`}}/>
                                                <S.BigTitle>{clickedSearch.title || clickedSearch.name}</S.BigTitle>
                                                <S.LlilTitle>{clickedSearch.original_title || clickedSearch.original_name}</S.LlilTitle>
                                                <S.Bigrelease_date>개봉일 : {clickedSearch.release_date || clickedSearch.first_air_date}</S.Bigrelease_date>
                                                <S.Bigpopularity> 평점 : {clickedSearch ? renderStars(clickedSearch.vote_average) : null} / {(clickedSearch.vote_average).toFixed(1)} </S.Bigpopularity>                        
                                                <S.BigOverview>{clickedSearch.overview}</S.BigOverview>
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
                            ): null }
                    </AnimatePresence>
                    
                </>
            )}
        </t.Wrapper>;
}

export default Search;