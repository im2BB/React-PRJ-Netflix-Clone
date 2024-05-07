
import { BsStarFill, BsStarHalf } from "react-icons/bs";

export const renderStars = (rating:number, color = "#f1f169") => {  //별점 출력 함수
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
