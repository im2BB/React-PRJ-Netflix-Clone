
import { useQuery } from "react-query";
import { IGetMoviesResult, getMovies } from "../api";
import styled from "styled-components";
import { makeImagePath } from "./utils";
import { motion,AnimatePresence } from "framer-motion";
import { useState } from "react";

const Wrapper = styled.div`
    background-color: black;
`;

const Loder = styled.div`
    height: 20vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Banner = styled.div<{ bgPhoto: string }>`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 60px;
    background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
    background-size: cover;
`;

const Title = styled.h2`
    font-size: 68px;
    margin-bottom: 20px;
`;

const OverView = styled.p`
    font-size: 28px;
    width: 50%;
`;

const Slider = styled.div`
    position: relative;
    top: -100px;
`;

const Row = styled(motion.div)`
    display: grid;
    gap: 10px;
    grid-template-columns: repeat(6, 1fr);
    position: absolute;
    width: 100%;
    `;

const Box = styled(motion.div)`
    background-color: white;
    height: 200px;
    color :pink;
    font-size:64px;
`;

const rowVariants = {
    hidden : {
        x : window.outerWidth-50,
    },
    visible: {
        x : 0,
    },
    exiting: {
        x : -window.outerWidth-50,
    },
}

function Home() {
    const {data,isLoading} = useQuery<IGetMoviesResult>
    (["movies","nowPlaying"],getMovies);
    const [index, setIndex] = useState(0);
    const incraseIndex = () => setIndex((prev) => prev + 1);
    return <Wrapper>
            {isLoading ? (<Loder>Loding....</Loder>
            ) : (
                <>
                <Banner onClick={incraseIndex} 
                bgPhoto={makeImagePath(data?.results[0].backdrop_path || "")}
                >
                    <Title>{data?.results[0].title}</Title>
                    <OverView>{data?.results[0].overview}</OverView>
                </Banner>
                <Slider>
                    <AnimatePresence>
                        <Row 
                        variants={rowVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        transition={{type:"tween", duration: 4}}
                        key={index}
                        >
                            {[1,2,3,4,5,6].map(i=>(
                            <Box key={i}>{i}</Box>
                            ))}
                        </Row>
                    </AnimatePresence>
                </Slider>
                </>
            )}
            </Wrapper>;
    
}

export default Home;