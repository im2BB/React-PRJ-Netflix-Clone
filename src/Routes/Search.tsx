import { PathMatch, useLocation, useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IGetSearchResult, getSearchMulti  } from "../api";
import { useQuery } from "react-query";
import { makeImagePath } from "./utils";
import { AnimatePresence, motion } from "framer-motion";
import { BsStarFill, BsStarHalf } from "react-icons/bs";

const Wrapper = styled.div`
    background-color: black;
    padding-bottom: 200px;
`;

const Loader = styled.div`
    height: 20vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Banner = styled.div<{ $bgPhoto: string }>`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 60px;
    background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(${props => props.$bgPhoto});
    background-size: cover;
`;

const Title = styled.h2`
    font-size: 30px;
    margin-bottom: 15px;
    margin-left: 30px;
`;

const Date = styled.h2`
    font-size: 18px;
    margin-left: 100px;
`;

const OiginTitle = styled.h2`
    font-size: 25px;
    margin-bottom: 10px;
    padding-left: 45px;
`;

const OverView = styled.p`
    padding-top: 20px;
    font-size: 15px;
    margin-left: 40px;
`;

const Box = styled.div`
    display: flex;
    margin-left:50px;
`;

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

const LilBox = styled.div`
    margin-top: 300px;
    display: column;
    width: 480px;
    
`;
const BigBox = styled.div`
    margin-top: -200px;
    display: flex;
    flex-wrap: wrap;
    background-position: center center;
    
`;

const Text = styled.p`
    height: 250px;
    margin-top:-160px;
    padding-left: 50px;
    font-size: 20px;
`;

const MainBox = styled.div`
    margin-left: 50px;
`

const BigPhoto = styled.div<{ $bgPhoto: string }>`
    color: ${props => props.theme.white.lighter}; 
    background-color: white;
    background-image: url(${props => props.$bgPhoto});
    background-size: cover;
    background-position: center center;
    border-radius: 5px;
    height: 450px;
    width: 315px;
    margin: 10px;
    `;

const LilPhoto = styled.div<{ $bgPhoto: string }>`
    color: ${props => props.theme.white.lighter}; 
    background-color: white;
    background-image: url(${props => props.$bgPhoto});
    background-size: cover;
    background-position: center center;
    border-radius: 5px;
    height: 250px;
    width: 150px;
    margin: 10px;
    `;

    const LilBoxtwo = styled.div`
        display: column ;
        width: 150px;
    
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

const BigSearch = styled(motion.div)`
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



const BigCover = styled.div`
    width: 100%;
    background-size: cover;
    background-position: center center;
    height: 420px;
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

const BigTitle = styled.h3`
    color: ${props => props.theme.white.lighter};
    font-size: 41px;
    position:  relative;
    top:-165px;
    padding-left: 345px;
`;

const LlilTitle = styled.h3`
    color: ${props => props.theme.white.lighter};
    font-size: 15px;
    position:  relative;
    top:-165px;
    padding-left: 520px;
    padding-top: 20px;
`;

const Biggenres = styled.div`
    padding: 20px;  
    position:  relative;
    top:-115px;
    color: ${props => props.theme.white.lighter};
    
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

const BigOverview = styled.p`
    padding: 20px;
    position:  relative;
    top:-85px;
    color: ${props => props.theme.white.lighter};
    overflow: auto;
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


function Search() {
    const history = useNavigate();
    const location = useLocation();
    const keyword = new URLSearchParams(location.search).get("keyword");
    const keywordMatch: PathMatch<string> | null  = useMatch("/search/:clickId");
    const page = 1;

    const { data, isLoading } = useQuery<IGetSearchResult>(
        ["getSearch", keyword, page], 
        () => keyword ? getSearchMulti(keyword, page) : Promise.resolve(),
        { enabled: !!keyword }
    );
    
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
    
    

    return <Wrapper>
        
            {isLoading ? (
                <Loader>Loading....</Loader>
            ) : (
                <>
                    {data && data.total_results === 0 ? (
                        <Banner $bgPhoto="">
                            <p>"{keyword}" 에 관련된 정보가 존재하지 않습니다.</p>
                        </Banner>
                    ) : (
                        <Banner $bgPhoto={makeImagePath(data?.results[0]?.backdrop_path || "")}>
                            <Box>
                                <BigPhoto $bgPhoto={makeImagePath(data?.results[0].poster_path || "")}/>
                                <LilBox>
                                    <Title>{data?.results[0]?.title || data?.results[0]?.name}</Title>
                                    <OiginTitle>{data?.results[0]?.original_title || data?.results[0]?.original_name}</OiginTitle>
                                    <Date>{data?.results[0].release_date || data?.results[0].first_air_date} / {data?.results[0].media_type && (
                                        <span>{data.results[0].media_type.charAt(0).toUpperCase() + data.results[0].media_type.slice(1)}
                                        </span>
                                    )}</Date>
                                    <OverView>{data?.results[0]?.overview}</OverView>
                                </LilBox>
                            </Box>
                        </Banner>
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
                                                    <LilOverView>{keywords.overview.length > 150 ? keywords.overview.substring(0, 150) + '.....' : keywords.overview}</LilOverView>
                                                </LilBoxtwo>
                                        </BoxTwo>
                                    ))}
                                </BigBox>
                                
                        </MainBox>
                    </AnimatePresence>
                        
                    <AnimatePresence>
                        { keywordMatch ? (
                            <>
                                <OverLay 
                                onClick={onOverLayClicked}
                                exit={{opacity:0}}
                                animate={{opacity:2}}
                                />
                                <BigSearch
                                style={{ position: "fixed"} } 
                                layoutId={keywordMatch.params.clickId}>
                                    
                                    {clickedSearch &&
                                    <>
                                    <BigCover
                                    style={{backgroundImage:`linear-gradient(to top, black,transparent),
                                    url( ${makeImagePath (clickedSearch.backdrop_path) 
                                    })`}} />
                                    <BigTitle>{clickedSearch.title || clickedSearch.name}</BigTitle>
                                    <LlilTitle>{clickedSearch.original_title || clickedSearch.original_name}</LlilTitle>
                                    <Bigposter
                                    style={{backgroundImage :`url(${makeImagePath(clickedSearch.poster_path)})`}}
                                    />
                                    <Biggenres>{clickedSearch.videos}</Biggenres>
                                    <Bigrelease_date>개봉일 : {clickedSearch.release_date || clickedSearch.first_air_date}</Bigrelease_date>
                                    <Bigpopularity> 평점 : {clickedSearch ? renderStars(clickedSearch.vote_average) : null} / {(clickedSearch.vote_average).toFixed(1)} </Bigpopularity>                        
                                    <BigOverview>{clickedSearch.overview}</BigOverview>
                                    </>}

                                    </BigSearch>
                                </>
                            ): null }
                    </AnimatePresence>
                </>
            )}
        
    
    </Wrapper>;
}

export default Search;