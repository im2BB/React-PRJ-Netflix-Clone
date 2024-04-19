import { motion } from "framer-motion";
import styled from "styled-components";


const Nav = styled(motion.nav)`
    height: 100%;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    `;

const Col =styled.div`
    height: 120px;
    width: 100%;
    color: white;
    align-items: center;
    margin: 30px;
`;

const Name =styled.div`
    font-size: 16px;
    margin-bottom: 5px;
`;
const Ather = styled.div`
    font-size: 12px;
    margin-bottom: 2px;
    padding-left: 30px;
`;

const Line =styled.hr`
    height: 1px;
`;


function Footer (){
    return (
        <>
        <Line />
        <Nav>
            
            <Col>
                <Name>Producer  : 이 경훈</Name>
                <Ather>Tel : 010 6783 0603</Ather>
                <Ather>github : https://github.com/im222b/react-PRJ2</Ather>
                <Ather>mail: seoulbutter@gmail.com </Ather>
                <Ather>instargram: @im__2b</Ather>
            </Col>
            <Col>
                <Name>기술 사용 스텍</Name>
                <Ather>React</Ather>
                <Ather>Node.js</Ather>
                <Ather>TypeScript</Ather>
                <Ather>Visual Studio Code</Ather>
            </Col>
            <Col>
                <Name>API</Name>
                    <Ather>https://www.themoviedb.org</Ather>
                <Name>Package</Name>
                    <Ather>Styled-components</Ather>
                    <Ather>Framer-motion</Ather>
                    <Ather>Swiper</Ather>
            </Col>
            
        </Nav>
        </>
    );
}
    


export default Footer;