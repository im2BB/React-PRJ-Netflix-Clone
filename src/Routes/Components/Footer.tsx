import { motion } from "framer-motion";
import styled from "styled-components";

const Nav = styled(motion.nav)`
  height: 100%;
  color: ${(props) => props.theme.white.lighter};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 40px 60px;

  @media (max-width: 1024px) {
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 30px 40px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 20px;
  }

  @media (max-width: 480px) {
    padding: 15px;
  }
`;

const Col = styled.div`
  height: 120px;
  width: 100%;
  color: ${(props) => props.theme.white.lighter};
  align-items: center;
  margin: 30px;

  @media (max-width: 1024px) {
    height: 100px;
    margin: 20px;
  }

  @media (max-width: 768px) {
    height: auto;
    margin: 15px 0;
    width: 100%;
  }

  @media (max-width: 480px) {
    margin: 10px 0;
  }
`;

const Name = styled.div`
  font-size: 16px;
  margin-bottom: 5px;
  color: ${(props) => props.theme.white.darker};
  font-weight: 600;

  @media (max-width: 1024px) {
    font-size: 15px;
  }

  @media (max-width: 768px) {
    font-size: 14px;
    margin-bottom: 4px;
  }

  @media (max-width: 480px) {
    font-size: 13px;
    margin-bottom: 3px;
  }
`;

const Ather = styled.div`
  font-size: 12px;
  margin-bottom: 2px;
  padding-left: 30px;
  color: ${(props) => props.theme.white.lighter};
  transition: color 0.2s ease;

  &:hover {
    color: ${(props) => props.theme.green.main};
  }

  @media (max-width: 1024px) {
    font-size: 11px;
    padding-left: 25px;
  }

  @media (max-width: 768px) {
    font-size: 10px;
    padding-left: 20px;
    margin-bottom: 1px;
  }

  @media (max-width: 480px) {
    font-size: 9px;
    padding-left: 15px;
  }
`;

const Line = styled.hr`
  margin-top: 60px;
  height: 1px;
  background: ${(props) => props.theme.black.lighter};
  border: none;

  @media (max-width: 1024px) {
    margin-top: 40px;
  }

  @media (max-width: 768px) {
    margin-top: 30px;
  }

  @media (max-width: 480px) {
    margin-top: 20px;
  }
`;

function Footer() {
  return (
    <>
      <Line />
      <Nav>
        <Col>
          <Name>Producer : 이 경훈</Name>
          <Ather>github : https://github.com/im2BB</Ather>
          <Ather>mail: seoulbutter@gmail.com </Ather>
          <Ather>instargram: @im__2b</Ather>
        </Col>
        <Col>
          <Name>기술 사용 스텍</Name>
          <Ather>React</Ather>
          <Ather>Node.js</Ather>
          <Ather>TypeScript</Ather>
        </Col>
        <Col>
          <Name>API</Name>
          <Ather>https://www.themoviedb.org</Ather>
        </Col>
        <Col>
          <Name>Package</Name>
          <Ather>Styled-components</Ather>
          <Ather>Framer-motion</Ather>
          <Ather>Swiper</Ather>
          <Ather>React Player</Ather>
        </Col>
      </Nav>
    </>
  );
}

export default Footer;
