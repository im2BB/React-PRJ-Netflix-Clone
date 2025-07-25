import { motion } from "framer-motion";
import styled from "styled-components";

//작은 박스내 출력물 css

export const OverLay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(18, 18, 18, 0.8);
  opacity: 0;
  backdrop-filter: blur(4px);
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
  background-color: ${(props) => props.theme.black.darker};
  border-radius: 16px;
  overflow: auto;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
  z-index: 1000;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  border: 1px solid ${(props) => props.theme.black.lighter};

  @media (max-width: 1024px) {
    width: 80vw;
    height: 85vh;
    top: 50px;
  }

  @media (max-width: 768px) {
    width: 90vw;
    height: 80vh;
    top: 40px;
  }

  @media (max-width: 480px) {
    width: 95vw;
    height: 75vh;
    top: 30px;
  }
`;

export const BigSearch = styled(motion.div)`
  height: 0;
  width: 50vw;
  padding-top: 60px;

  @media (max-width: 1024px) {
    width: 70vw;
    padding-top: 50px;
  }

  @media (max-width: 768px) {
    width: 85vw;
    padding-top: 40px;
  }

  @media (max-width: 480px) {
    width: 90vw;
    padding-top: 30px;
  }
`;

export const Bigposter = styled.div`
  width: 300px;
  height: 450px;
  background-size: cover;
  margin: 30px;
  position: relative;
  top: -455px;
  float: left;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.5);
  }

  @media (max-width: 1024px) {
    width: 250px;
    height: 375px;
    margin: 25px;
    top: -380px;
  }

  @media (max-width: 768px) {
    width: 200px;
    height: 300px;
    margin: 20px;
    top: -305px;
    float: none;
    display: block;
    margin-left: auto;
    margin-right: auto;
  }

  @media (max-width: 480px) {
    width: 150px;
    height: 225px;
    margin: 15px;
    top: -230px;
  }
`;

export const BigTitle = styled.h3`
  width: 55vw;
  position: center center;
  font-size: 41px;
  position: relative;
  top: -355px;
  color: ${(props) => props.theme.white.darker};
  font-weight: 700;

  @media (max-width: 1024px) {
    width: 70vw;
    font-size: 35px;
    top: -280px;
  }

  @media (max-width: 768px) {
    width: 85vw;
    font-size: 28px;
    top: -205px;
    text-align: center;
  }

  @media (max-width: 480px) {
    width: 90vw;
    font-size: 22px;
    top: -130px;
  }
`;

export const LlilTitle = styled.h3`
  font-size: 15px;
  position: relative;
  top: -365px;
  padding-left: 20px;
  padding-top: 20px;
  width: 50vw;
  color: ${(props) => props.theme.white.lighter};
  font-weight: 500;

  @media (max-width: 1024px) {
    width: 65vw;
    font-size: 14px;
    top: -290px;
    padding-left: 15px;
  }

  @media (max-width: 768px) {
    width: 80vw;
    font-size: 13px;
    top: -215px;
    padding-left: 10px;
    text-align: center;
  }

  @media (max-width: 480px) {
    width: 85vw;
    font-size: 12px;
    top: -140px;
    padding-left: 5px;
  }
`;

export const Bigrelease_date = styled.p`
  padding-top: 20px;
  padding-left: 20px;
  width: 30vw;
  position: relative;
  top: -365px;
  color: ${(props) => props.theme.white.lighter};
  font-weight: 400;

  @media (max-width: 1024px) {
    width: 40vw;
    padding-top: 15px;
    padding-left: 15px;
    top: -290px;
  }

  @media (max-width: 768px) {
    width: 60vw;
    padding-top: 10px;
    padding-left: 10px;
    top: -215px;
    text-align: center;
  }

  @media (max-width: 480px) {
    width: 70vw;
    padding-top: 8px;
    padding-left: 5px;
    top: -140px;
  }
`;

export const Bigpopularity = styled.div`
  position: center center;
  padding-top: 5px;
  padding-left: 20px;
  position: relative;
  width: 30vw;
  height: 5vh;
  top: -365px;
  color: ${(props) => props.theme.white.lighter};
  font-weight: 400;

  @media (max-width: 1024px) {
    width: 40vw;
    padding-left: 15px;
    top: -290px;
  }

  @media (max-width: 768px) {
    width: 60vw;
    padding-left: 10px;
    top: -215px;
    text-align: center;
  }

  @media (max-width: 480px) {
    width: 70vw;
    padding-left: 5px;
    top: -140px;
  }
`;

export const BigOverview = styled.p`
  position: relative;
  width: 30vw;
  height: 25vh;
  top: -250px;
  overflow: auto;
  color: ${(props) => props.theme.white.lighter};
  line-height: 1.6;
  font-weight: 400;

  @media (max-width: 1024px) {
    width: 40vw;
    height: 20vh;
    top: -290px;
  }

  @media (max-width: 768px) {
    width: 60vw;
    height: 15vh;
    top: -215px;
    text-align: center;
  }

  @media (max-width: 480px) {
    width: 70vw;
    height: 12vh;
    top: -140px;
  }
`;

export const Frame = styled.div`
  position: relative;
  padding-top: 150px;
  margin: 35px;
  top: -500px;
  height: 96vh;
  width: 70vw;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);

  .player {
    position: absolute;
    left: 0px;
    width: 100%;
    height: 100%;
    border-radius: 12px;
    overflow: hidden;
  }

  @media (max-width: 1024px) {
    padding-top: 120px;
    margin: 25px;
    top: -400px;
    height: 90vh;
    width: 80vw;
  }

  @media (max-width: 768px) {
    padding-top: 100px;
    margin: 20px;
    top: -300px;
    height: 85vh;
    width: 85vw;
  }

  @media (max-width: 480px) {
    padding-top: 80px;
    margin: 15px;
    top: -200px;
    height: 80vh;
    width: 90vw;
  }
`;

export const Dhk = styled.h1`
  font-size: 0px;
  color: white;
  position: absolute;
`;

export const BigCover = styled(motion.div)`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 420px;
  border-radius: 16px 16px 0 0;

  @media (max-width: 1024px) {
    height: 350px;
  }

  @media (max-width: 768px) {
    height: 280px;
  }

  @media (max-width: 480px) {
    height: 200px;
  }
`;

export const BigMain = styled(motion.div)`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;

  @media (max-width: 768px) {
    align-items: center;
  }
`;
