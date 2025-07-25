import { BsStarFill, BsStarHalf } from "react-icons/bs";
import styled from "styled-components";
import { IRottenTomatoScore } from "../api";

const TomatoContainer = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-weight: bold;

  @media (max-width: 768px) {
    gap: 3px;
  }

  @media (max-width: 480px) {
    gap: 2px;
  }
`;

const TomatoIcon = styled.div<{ $score: number }>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => {
    if (props.$score >= 60) return "#21d07a"; // 신선 (녹색)
    if (props.$score >= 40) return "#d2d531"; // 보통 (노란색)
    return "#da3743"; // 썩음 (빨간색)
  }};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: white;
  font-weight: bold;

  @media (max-width: 768px) {
    width: 18px;
    height: 18px;
    font-size: 11px;
  }

  @media (max-width: 480px) {
    width: 16px;
    height: 16px;
    font-size: 10px;
  }
`;

const ScoreText = styled.span<{ $score: number }>`
  color: ${(props) => {
    if (props.$score >= 60) return "#21d07a";
    if (props.$score >= 40) return "#d2d531";
    return "#da3743";
  }};
  font-size: 14px;

  @media (max-width: 768px) {
    font-size: 13px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

const RealTomatoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 10px 0;
`;

const TomatoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const TomatoLabel = styled.span`
  font-size: 12px;
  color: #999;
  min-width: 80px;

  @media (max-width: 768px) {
    font-size: 11px;
    min-width: 70px;
  }

  @media (max-width: 480px) {
    font-size: 10px;
    min-width: 60px;
  }
`;

export const renderStars = (rating: number, color = "#f1f169") => {
  //별점 출력 함수
  const integerPart = Math.floor(rating / 2); // 평점을 2로 나눈 정수 부분을 계산
  const hasHalfStar = rating % 2 !== 0; // 반 별표가 있는지 확인

  const filledStars = Array(integerPart).fill(2); // 평점에 해당하는 별표 배열 생성
  const emptyStars = Array(Math.max(0, 4 - integerPart)).fill(2); // 남은 빈 별표 배열 생성

  return (
    <>
      {filledStars.map((_, i) => (
        <BsStarFill key={i} size="13" color={color} />
      ))}
      {hasHalfStar && <BsStarHalf key="half" size="13" color={color} />}
      {emptyStars.map((_, i) => (
        <BsStarFill key={i + integerPart} size="13" color="#E3E3E3" />
      ))}
    </>
  );
};

// 로튼 토마토 스타일 평점 표시 함수 (TMDB 평점 기반)
export const renderTomatoScore = (voteAverage: number) => {
  // TMDB 평점(0-10)을 퍼센트로 변환
  const percentage = Math.round(voteAverage * 10);

  return (
    <TomatoContainer>
      <TomatoIcon $score={percentage}>{percentage}%</TomatoIcon>
      <ScoreText $score={percentage}>
        {percentage >= 60 ? "신선" : percentage >= 40 ? "보통" : "썩음"}
      </ScoreText>
    </TomatoContainer>
  );
};

// 실제 로튼 토마토 API 데이터를 사용하는 컴포넌트
export const renderRealTomatoScore = (
  tomatoData: IRottenTomatoScore | null
) => {
  if (!tomatoData) {
    return (
      <TomatoContainer>
        <span style={{ fontSize: "12px", color: "#999" }}>평점 정보 없음</span>
      </TomatoContainer>
    );
  }

  const criticScore = tomatoData.tomatoScore
    ? parseInt(tomatoData.tomatoScore)
    : null;
  const userScore = tomatoData.tomatoUserMeter
    ? parseInt(tomatoData.tomatoUserMeter)
    : null;
  const imdbScore = tomatoData.imdbRating
    ? parseFloat(tomatoData.imdbRating) * 10
    : null;
  const metacriticScore = tomatoData.metacriticScore
    ? parseInt(tomatoData.metacriticScore)
    : null;

  return (
    <RealTomatoContainer>
      {criticScore !== null && (
        <TomatoRow>
          <TomatoLabel>평론가:</TomatoLabel>
          <TomatoContainer>
            <TomatoIcon $score={criticScore}>{criticScore}%</TomatoIcon>
            <ScoreText $score={criticScore}>
              {criticScore >= 60 ? "신선" : "썩음"}
            </ScoreText>
          </TomatoContainer>
        </TomatoRow>
      )}

      {userScore !== null && (
        <TomatoRow>
          <TomatoLabel>사용자:</TomatoLabel>
          <TomatoContainer>
            <TomatoIcon $score={userScore}>{userScore}%</TomatoIcon>
            <ScoreText $score={userScore}>
              {userScore >= 60 ? "신선" : "썩음"}
            </ScoreText>
          </TomatoContainer>
        </TomatoRow>
      )}

      {imdbScore !== null && (
        <TomatoRow>
          <TomatoLabel>IMDB:</TomatoLabel>
          <TomatoContainer>
            <span style={{ fontSize: "14px", color: "#f5c518" }}>
              ⭐ {tomatoData.imdbRating}/10
            </span>
          </TomatoContainer>
        </TomatoRow>
      )}

      {metacriticScore !== null && (
        <TomatoRow>
          <TomatoLabel>Metacritic:</TomatoLabel>
          <TomatoContainer>
            <span style={{ fontSize: "14px", color: "#00c030" }}>
              🟢 {tomatoData.metacriticScore}
            </span>
          </TomatoContainer>
        </TomatoRow>
      )}

      {tomatoData.tomatoConsensus && (
        <div style={{ fontSize: "11px", color: "#666", marginTop: "5px" }}>
          "{tomatoData.tomatoConsensus}"
        </div>
      )}
    </RealTomatoContainer>
  );
};

// 간단한 토마토 아이콘만 표시하는 함수
export const renderSimpleTomato = (voteAverage: number) => {
  const percentage = Math.round(voteAverage * 10);

  let icon = "";
  if (percentage >= 60) {
    icon = "🍅";
  } else if (percentage >= 40) {
    icon = "🟡";
  } else {
    icon = "💀";
  }

  return (
    <TomatoContainer>
      <span style={{ fontSize: "16px" }}>{icon}</span>
      <ScoreText $score={percentage}>{percentage}%</ScoreText>
    </TomatoContainer>
  );
};
