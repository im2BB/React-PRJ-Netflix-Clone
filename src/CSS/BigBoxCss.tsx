import { motion } from "framer-motion";
import styled from "styled-components";

//슬라이드 내 출력물 Css

export const Title = styled.h2`
  font-size: 30px;
  margin-bottom: 15px;
  margin-left: 30px;
  color: ${(props) => props.theme.white.darker};
  font-weight: 700;

  @media (max-width: 1024px) {
    font-size: 26px;
    margin-left: 25px;
  }

  @media (max-width: 768px) {
    font-size: 22px;
    margin-left: 0;
    margin-bottom: 12px;
    text-align: center;
  }

  @media (max-width: 480px) {
    font-size: 20px;
    margin-left: 0;
    margin-bottom: 10px;
    text-align: center;
  }
`;

export const LilTitle = styled.h2`
  font-size: 25px;
  margin-bottom: 10px;
  padding-left: 45px;
  color: ${(props) => props.theme.white.lighter};
  font-weight: 500;

  @media (max-width: 1024px) {
    font-size: 22px;
    padding-left: 35px;
  }

  @media (max-width: 768px) {
    font-size: 19px;
    padding-left: 0;
    text-align: center;
  }

  @media (max-width: 480px) {
    font-size: 16px;
    padding-left: 0;
    text-align: center;
  }
`;

export const Date = styled.h2`
  font-size: 18px;
  margin-left: 100px;
  color: ${(props) => props.theme.white.lighter};
  font-weight: 400;

  @media (max-width: 1024px) {
    font-size: 16px;
    margin-left: 80px;
  }

  @media (max-width: 768px) {
    font-size: 14px;
    margin-left: 0;
    text-align: center;
  }

  @media (max-width: 480px) {
    font-size: 12px;
    margin-left: 0;
    text-align: center;
  }
`;

export const OverView = styled.p`
  padding-top: 20px;
  font-size: 15px;
  margin-left: 40px;
  color: ${(props) => props.theme.white.lighter};
  line-height: 1.6;
  font-weight: 400;

  @media (max-width: 1024px) {
    font-size: 14px;
    margin-left: 30px;
    padding-top: 15px;
  }

  @media (max-width: 768px) {
    font-size: 13px;
    margin-left: 0;
    padding-top: 12px;
    text-align: center;
    max-width: 100%;
  }

  @media (max-width: 480px) {
    font-size: 12px;
    margin-left: 0;
    padding-top: 10px;
    text-align: center;
    max-width: 100%;
  }
`;

export const Slider1 = styled(motion.div)`
  top: -60px;
  position: relative;
  z-index: 2;

  @media (max-width: 1024px) {
    top: -50px;
  }

  @media (max-width: 768px) {
    top: -40px;
  }

  @media (max-width: 480px) {
    top: -30px;
  }
`;

export const FrontTitle = styled.h2`
  margin: 20px;
  font-size: 25px;
  top: 0px;
  color: ${(props) => props.theme.white.darker};
  font-weight: 600;
  position: relative;
  z-index: 3;

  @media (max-width: 1024px) {
    font-size: 22px;
    margin: 15px;
    top: -40px;
  }

  @media (max-width: 768px) {
    font-size: 19px;
    margin: 12px;
    top: -30px;
  }

  @media (max-width: 480px) {
    font-size: 16px;
    margin: 10px;
    top: -20px;
  }
`;

export const Box = styled(motion.div)<{ $bgPhoto: string }>`
  background-color: ${(props) => props.theme.black.darker};
  background-image: url(${(props) => props.$bgPhoto});
  background-size: cover;
  background-position: center center;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 24px;
  height: 250px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);

  @media (max-width: 1024px) {
    height: 220px;
    font-size: 20px;
  }

  @media (max-width: 768px) {
    height: 180px;
    font-size: 18px;
  }

  @media (max-width: 480px) {
    height: 150px;
    font-size: 16px;
  }
`;

export const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.05,
    y: -5,
    transition: {
      delay: 0,
      type: "tween",
      duration: 0.2,
    },
  },
};

export const Info = styled(motion.div)`
  background: linear-gradient(
    to top,
    rgba(18, 18, 18, 0.9) 0%,
    rgba(18, 18, 18, 0.7) 50%,
    rgba(18, 18, 18, 0.3) 100%
  );
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  padding: 20px 15px 15px;
  border-radius: 0 0 8px 8px;

  h4 {
    text-align: center;
    font-size: 15px;
    font-weight: 600;
    color: ${(props) => props.theme.white.darker};

    @media (max-width: 768px) {
      font-size: 13px;
    }

    @media (max-width: 480px) {
      font-size: 11px;
    }
  }
`;

export const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.1,
      type: "tween",
      duration: 0.2,
    },
  },
};

export const Popularity = styled.h2`
  font-size: 15px;
  margin-bottom: 40px;
  margin-left: 125px;
  color: ${(props) => props.theme.white.lighter};
  font-weight: 400;

  @media (max-width: 1024px) {
    font-size: 14px;
    margin-left: 100px;
    margin-bottom: 30px;
  }

  @media (max-width: 768px) {
    font-size: 13px;
    margin-left: 80px;
    margin-bottom: 25px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
    margin-left: 60px;
    margin-bottom: 20px;
  }
`;
