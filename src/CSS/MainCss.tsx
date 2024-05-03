import { motion } from "framer-motion";
import styled from "styled-components";



export const Wrapper = styled.div`
    background-color: black;
    padding-bottom: 200px;
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

