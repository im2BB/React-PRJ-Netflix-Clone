import { motion } from "framer-motion";
import styled from "styled-components";



//전체적 크기 및 기본 설정 Css

export const Wrapper = styled.div`
    background-color: black;
    padding-bottom: 200px;
`;

export const LilBox = styled.div`
    margin-top: 200px;
    display: column;
    width: 50vw;
    
`;

export const Box = styled.div`
    display: flex;
    
`;

export const BigPhoto = styled.div<{ $bgPhoto: string }>`
    background-image: url(${props => props.$bgPhoto});
    background-size: cover;
    border-radius: 5px;
    height: 450px;
    width: 300px;
    margin: 10px;
    `;



export const Loader = styled.div`
    height: 20vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Banner = styled.div<{ $bgPhoto: string }>`
    height: 70vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 60px;
    background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), 
    url(${props => props.$bgPhoto});
    background-size: cover;
`;

