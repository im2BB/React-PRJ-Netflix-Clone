import { motion } from "framer-motion";
import styled from "styled-components";

//슬라이드 내 출력물 Css

export const Title = styled.h2`
    font-size: 30px;
    margin-bottom: 15px;
    margin-left: 30px;
`;

export const LilTitle = styled.h2`
    font-size: 25px;
    margin-bottom: 10px;
    padding-left: 45px;
`;

export const Date = styled.h2`
    font-size: 18px;
    margin-left: 100px;
`;

export const OverView = styled.p`
    padding-top: 20px;
    font-size: 15px;
    margin-left: 40px;
    
`;

export const Slider1 = styled(motion.div)`
    top: -350px;
    
    
`;

export const FrontTitle = styled.h2`
    margin: 20px; 
    font-Size: 25px;
    top:-340px;
`;

export const Box = styled(motion.div)<{$bgPhoto:string}>`
    background-color: white;
    background-image: url(${props => props.$bgPhoto});
    background-size: cover;
    background-position: center center;
    transform: translate(-50%, -50%);
    color :white;
    font-size:24px;
    height: 250px;
    
`;


export const boxVariants = {
    
    normal: {
        scale:1,
    },
    hover: {
        scale:1.05,
        y: -5,
        transition: {
            delay:0.,
            type:"tween",
        },
    },
};


export const Info = styled(motion.div)`
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



export const infoVariants = {
    hover: {
        opacity:1.05,
        transition: {
            delay:0.1,
            type:"tween",
        },
    }
}




export const Popularity = styled.h2`
    font-size: 15px;
    margin-bottom: 40px;
    margin-left: 125px;
`;