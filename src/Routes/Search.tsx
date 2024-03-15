import { PathMatch, useLocation, useMatch } from "react-router-dom";
import styled from "styled-components";
import { IGetSearchResult, getSearchMuti } from "../api";
import { useQuery } from "react-query";
import { makeImagePath } from "./utils";
import { motion } from "framer-motion";

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
    padding: 30px;
`;

const BoxTwo = styled(motion.div)`
    display: flex;
    height: 300px;
    width: 350px;
    border-radius: 10px ;
    margin: 5px;
    background-color: #555555;
    flex-wrap: wrap
`;

const Text = styled.p`
    height: 250px;
    margin-top:-160px;
    padding-left: 50px;
    font-size: 20px;
`;

const BigPhoto = styled.div<{ $bgPhoto: string }>`
    color: ${props => props.theme.white.lighter}; 
    background-color: white;
    background-image: url(${props => props.$bgPhoto});
    background-size: cover;
    background-position: center center;
    border-radius: 5px;
    height: 60vh;
    width: 20vw;
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

const LilType = styled.h2`
    font-size: 15px;
    margin-top: 8px;
`;

const LilOverView = styled.p`
    font-size: 10px;
    margin-top: 10px;
    word-wrap: break-word;
        display: -webkit-box;
        -webkit-line-clamp: 3 ;
        -webkit-box-orient: vertical;
`;

function Serch() {
    const location = useLocation();
    const keyword = new URLSearchParams(location.search).get("keyword");
    console.log(keyword);
    const page = 2;

    const { data, isLoading } = useQuery<IGetSearchResult>(
        ["getSearch", keyword, page], 
        () => keyword ? getSearchMuti(keyword, page) : Promise.resolve(),
        { enabled: !!keyword }
    );
    console.log(data);



    return (
        <Wrapper>
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
                                <Title>
                                {data?.results[0]?.title || data?.results[0]?.name}
                                </Title>
                                <OiginTitle>{data?.results[0]?.original_title || data?.results[0]?.original_name}</OiginTitle>
                                <Date>{data?.results[0].release_date || data?.results[0].first_air_date} / {data?.results[0].media_type && (
                                <span>{data.results[0].media_type.charAt(0).toUpperCase() + data.results[0].media_type.slice(1)}</span>
                                )}</Date>
                                <OverView>{data?.results[0]?.overview}</OverView>
                            </LilBox>
                        </Box>
                        </Banner>
                    )}
                    
                    <Text>
                            <span style={{ fontSize: '25px' }}> - " {keyword} "</span> 에 대한 검색 결과 입니다.
                    </Text>

                    <BigBox >
                    
                    {data && data.results.map((keywords, index) => (
                    <BoxTwo key={index}>
                        <LilPhoto $bgPhoto={makeImagePath(keywords.poster_path || "")} />
                        <LilBoxtwo>
                            <LilTitle>{ keywords.title || keywords.name}</LilTitle>
                            <LilType>{keywords.media_type && (
                                <span>{keywords.media_type.charAt(0).toUpperCase() + keywords.media_type.slice(1)}</span>
                            )}</LilType>
                            <LilOverView>{keywords.overview.length > 150 ? keywords.overview.substring(0, 150) + '...' : keywords.overview}</LilOverView>
                        </LilBoxtwo>
                    </BoxTwo>
                    ))}
                    </BigBox>
                </>
                
            )}
        </Wrapper>
    );
}

export default Serch;