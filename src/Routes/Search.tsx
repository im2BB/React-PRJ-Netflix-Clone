import { PathMatch, useLocation, useMatch } from "react-router-dom";
import styled from "styled-components";
import { getSearchMuti } from "../api";
import { useQuery } from "react-query";
import { makeImagePath } from "./utils";

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
    font-size: 105px;
    margin-bottom: 15px;
`;

const LilTitle = styled.h2`
    font-size: 20px;
    margin-bottom: 5px;
    padding-left: 45px;
`;

const OverView = styled.p`
    font-size: 18px;
    margin-left: 40px;
    width: 50%;
`;

function Serch() {
    const location = useLocation();
    const keyword = new URLSearchParams(location.search).get("keyword");
    const page = 1;

    const { data, isLoading } = useQuery(
        ["getSearch", keyword, page], // Include page in the query key
        () => keyword ? getSearchMuti(keyword, page) : Promise.resolve(),
        { enabled: !!keyword }
    );

    return (
        <Wrapper>
            {isLoading ? (
                <Loader>Loading....</Loader>
            ) : (
                <>
                    {data && data.total_results === 0 ? (
                        <Banner $bgPhoto="">
                            <p>No results found for "{keyword}"</p>
                        </Banner>
                    ) : (
                        <Banner $bgPhoto={makeImagePath(data?.results[0]?.backdrop_path || "")}>
                            <Title>{data?.results[0]?.title}</Title>
                            <LilTitle>{data?.results[0]?.original_title}</LilTitle>
                            <OverView>{data?.results[0]?.overview}</OverView>
                        </Banner>
                    )}
                </>
            )}
        </Wrapper>
    );
}

export default Serch;