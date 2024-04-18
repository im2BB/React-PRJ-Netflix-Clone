import styled from "styled-components";
import { motion, useAnimate, useAnimation, useScroll } from "framer-motion";

const Fot = styled(motion.nav)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    width: 100%;
    top: 0;
    font-size: 14px;
    padding: 20px 60px;
    `;

const Col =styled.div`
    width: 100%;
    height: 100%;
    `;
const Name = styled.h1`
    color:white;
    font-size: 15px;
    padding-bottom: 10px;
    margin: 0 auto;
`;
const Ather = styled.h2`
    color:white;
    font-size: 12px;
    padding-bottom: 5px;
    padding-left: 20px;
    margin: 0 auto;
`;


function Footer() {
    return(
        <>
        <hr />
        <Fot>
            <Col>
            <Name>Developer : 이 경훈</Name>
            <Ather>Tel : 010 6783 0603</Ather>
            <Ather>Mail : seoulbutter@gmail</Ather>
            <Ather>Instagram : @im__2b</Ather>
            <Ather>Github : https://github.com/im222b/react-PRJ2</Ather>
            </Col>
        </Fot>
        </>
    );
    
} 

export default Footer;