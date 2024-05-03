import { motion } from "framer-motion";
import styled from "styled-components";

export const OverLay = styled(motion.div)`
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

export const BigType = styled(motion.div)`
    position: absolute;
    width: 60vw;
    height: 90vh;
    top: 60px;
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

export const BigSearch = styled(motion.div)`
    height: 0;
    width: 50vw;
    padding-top: 60px;
`;

export const Bigposter = styled.div`
    width: 300px;
    height: 450px;
    background-size: cover;
    margin: 30px;
    position: relative;
    top:-455px;
    float: left;
    border-radius: 5px;
    box-shadow : 3px 3px 1px black;
    

`;

export const BigTitle = styled.h3`
    width: 55vw;
    position: center center;
    font-size: 41px;
    position:  relative;
    top:-355px;
    
`;

export const LlilTitle = styled.h3`
    font-size: 15px;
    position:  relative;
    top:-365px;
    padding-left: 20px;
    padding-top: 20px;
    width: 50vw;
`;

export const Bigrelease_date = styled.p`
    padding-top: 20px;
    padding-left: 20px;
    width: 30vw;
    position:  relative;
    top:-365px;
    
`;

export const Bigpopularity = styled.p`
    position: center center;
    padding-top: 5px;
    padding-left: 20px;
    position:  relative;
    width: 30vw;
    height: 5vh;
    top:-365px;

`;

export const BigOverview = styled.p`
    
    position:  relative;
    width: 30vw;
    height: 25vh;
    top:-365px;
    overflow: auto;
    
`;

export const Frame = styled.div`
    position: relative;
    padding-top: 150px;
    margin: 35px;
    top: -520px;
    height: 80vh;
    width: 70vw;
    .player {
        position: absolute;
        left: 0px;
        width: 100%;
        height: 100%;
        border-radius: 10px;
        overflow: hidden;
    }
`;

export const Dhk = styled.h1`
    font-size: 0px;
    color: white;
    position: absolute;

`;

export const BigCover = styled.div`
    width: 100%;
    background-size: cover;
    background-position: center center;
    height: 420px;


`;


export const BigMain = styled.div`
display: flex;
flex-wrap: wrap;
`;