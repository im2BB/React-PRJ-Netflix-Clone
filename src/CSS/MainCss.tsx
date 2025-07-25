import styled from "styled-components";

//전체적 크기 및 기본 설정 Css

export const Wrapper = styled.div`
  background-color: ${(props) => props.theme.black.veryDark};
  padding-bottom: 200px;

  @media (max-width: 768px) {
    padding-bottom: 100px;
  }

  @media (max-width: 480px) {
    padding-bottom: 50px;
  }
`;

export const LilBox = styled.div`
  margin-top: 200px;
  display: column;
  width: 50vw;

  @media (max-width: 1024px) {
    width: 70vw;
    margin-top: 150px;
  }

  @media (max-width: 768px) {
    width: 85vw;
    margin-top: 60px;
    order: 1;
  }

  @media (max-width: 480px) {
    width: 90vw;
    margin-top: 30px;
    order: 1;
  }
`;

export const Box = styled.div`
  display: flex;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 25px;
    padding: 20px 0;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
    gap: 20px;
    padding: 15px 0;
  }
`;

export const BigPhoto = styled.div<{ $bgPhoto: string }>`
  background-image: url(${(props) => props.$bgPhoto});
  background-size: cover;
  border-radius: 12px;
  height: 50vh;
  width: 300px;
  margin: 80px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
  }

  @media (max-width: 1024px) {
    height: 40vh;
    width: 280px;
    margin: 60px;
  }

  @media (max-width: 768px) {
    height: 35vh;
    width: 250px;
    margin: 0;
    order: -1;
  }

  @media (max-width: 480px) {
    height: 30vh;
    width: 200px;
    margin: 0;
    order: -1;
  }
`;

export const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.green.main};
  font-size: 18px;
  font-weight: 600;

  @media (max-width: 768px) {
    height: 15vh;
    font-size: 16px;
  }

  @media (max-width: 480px) {
    height: 10vh;
    font-size: 14px;
  }
`;

export const Banner = styled.div<{ $bgPhoto: string }>`
  height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 60px;
  background-image: linear-gradient(
      to bottom,
      rgba(18, 18, 18, 0.3) 0%,
      rgba(18, 18, 18, 0.5) 50%,
      rgba(18, 18, 18, 0.8) 80%,
      rgba(18, 18, 18, 1) 100%
    ),
    url(${(props) => props.$bgPhoto});
  background-size: cover;
  background-position: center;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100px;
    background: linear-gradient(
      to bottom,
      rgba(18, 18, 18, 0) 0%,
      rgba(18, 18, 18, 1) 100%
    );
    pointer-events: none;
  }

  @media (max-width: 1024px) {
    height: 60vh;
    padding-left: 40px;
  }

  @media (max-width: 768px) {
    height: auto;
    min-height: 60vh;
    padding: 30px 20px;
    justify-content: flex-start;
    align-items: center;
  }

  @media (max-width: 480px) {
    min-height: 50vh;
    padding: 20px 15px;
  }
`;
