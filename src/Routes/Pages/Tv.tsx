import { useQuery } from "react-query";
import {
  IGetTvResult,
  getTvs,
  getPopulars,
  getTodaysTvs,
  getTopRated,
  getYoutubeList,
} from "../../api";
import styled from "styled-components";
import { makeImagePath } from "../../Utils/utils";
import { AnimatePresence } from "framer-motion";
import { PathMatch, useMatch, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css";
import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import * as S from "../../CSS/LilBoxCss";
import * as o from "../../CSS/BigBoxCss";
import * as t from "../../CSS/MainCss";
import { renderStars, renderTomatoScore } from "../../Utils/RenderStars";

const StyledSwiper = styled(Swiper)`
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      90deg,
      rgba(18, 18, 18, 0.8) 0%,
      rgba(18, 18, 18, 0.4) 20%,
      rgba(18, 18, 18, 0) 50%,
      rgba(18, 18, 18, 0.4) 80%,
      rgba(18, 18, 18, 0.8) 100%
    );
    pointer-events: none;
    z-index: 1;
  }

  .swiper-wrapper {
    z-index: 2;
    position: relative;
  }

  .swiper-button-next,
  .swiper-button-prev {
    color: white;
    z-index: 3;

    @media (max-width: 768px) {
      display: none;
    }
  }

  .swiper-pagination {
    z-index: 3;

    @media (max-width: 768px) {
      display: none;
    }
  }
`;

//슬라이더
function TvSlider({ title, Tvs }: { title: string; Tvs: any[] }) {
  const history = useNavigate();
  const onBoxClicked = (tvId: number) => {
    history(`/tv/${tvId}`);
  };

  return (
    <o.Slider1>
      <o.FrontTitle>{title}</o.FrontTitle>
      <StyledSwiper
        slidesPerView={5}
        autoHeight={true}
        navigation={true}
        spaceBetween={15}
        watchOverflow={true}
        breakpoints={{
          320: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          480: {
            slidesPerView: 3,
            spaceBetween: 12,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 13,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 15,
          },
        }}
      >
        {Tvs.map((tv) => (
          <SwiperSlide key={tv.id}>
            <o.Box
              layoutId={tv.id + ""}
              whileHover="hover"
              initial="normal"
              variants={o.boxVariants}
              onClick={() => onBoxClicked(tv.id)}
              transition={{ type: "tween" }}
              $bgPhoto={makeImagePath(tv.backdrop_path)}
            >
              <o.Info variants={o.infoVariants}>
                <h4 style={{ fontSize: "26px", padding: "10px" }}>
                  {tv.title}
                </h4>
              </o.Info>
            </o.Box>
          </SwiperSlide>
        ))}
      </StyledSwiper>
    </o.Slider1>
  );
}

function Tv() {
  const history = useNavigate();
  const onOverLayClicked = () => history(`/tv`);
  const bigTvMatch: PathMatch<string> | null = useMatch("/tv/:tvid");
  const { data, isLoading } = useQuery<IGetTvResult>(
    ["tv", "onTheAir"],
    getTvs
  );

  const { data: Populars } = useQuery<IGetTvResult>(
    ["getPopulars"],
    getPopulars
  );

  const { data: TodaysTvs } = useQuery<IGetTvResult>(
    ["getTodaysTvs"],
    getTodaysTvs
  );

  const { data: TopRated } = useQuery<IGetTvResult>(
    ["getTopRated"],
    getTopRated
  );

  const [selectedVideo, setSelectedVideo] = useState<any>(null);

  useEffect(() => {
    const fetchVideo = async () => {
      if (bigTvMatch && bigTvMatch.params.tvid) {
        try {
          const youtubeData = await getYoutubeList(
            "tv",
            bigTvMatch.params.tvid
          );
          setSelectedVideo(youtubeData.results[0]); // 검색된 첫번째 사용
        } catch (error) {
          console.error("데이터가 없는뎁쇼?: ", error);
        }
      } else {
        setSelectedVideo(null);
      }
    };

    fetchVideo();
  }, [bigTvMatch]);

  const clickedTv = //클릭한 div에 해당값 들어있는지 확인
    bigTvMatch?.params.tvid &&
    (data?.results.find((tv) => tv.id + "" === bigTvMatch.params.tvid) ||
      Populars?.results.find((tv) => tv.id + "" === bigTvMatch.params.tvid) ||
      TodaysTvs?.results.find((tv) => tv.id + "" === bigTvMatch.params.tvid) ||
      TopRated?.results.find((tv) => tv.id + "" === bigTvMatch.params.tvid));
  console.log(clickedTv);

  const filterDuplicates = (tvToFilter: any[], excludedTv: any[]) => {
    return tvToFilter.filter(
      (tv) => !excludedTv.some((excludedTv) => excludedTv.id === tv.id)
    );
  };

  SwiperCore.use([Navigation, Pagination, Autoplay]);

  return (
    <t.Wrapper>
      {isLoading ? (
        <t.Loader>Loding....</t.Loader>
      ) : (
        <>
          <t.Banner
            $bgPhoto={makeImagePath(data?.results[0].backdrop_path || "")}
          >
            <t.Box>
              <t.BigPhoto
                $bgPhoto={makeImagePath(data?.results[0].poster_path || "")}
              />
              <t.LilBox>
                <o.Title>{data?.results[0].name}</o.Title>
                <o.LilTitle>{data?.results[0].original_name}</o.LilTitle>
                <o.Date>첫 방송일 : {data?.results[0].first_air_date}</o.Date>
                <div style={{ marginTop: "10px", marginBottom: "10px" }}>
                  {renderTomatoScore(data?.results[0].vote_average || 0)}
                </div>
                <o.OverView>{data?.results[0].overview}</o.OverView>
              </t.LilBox>
            </t.Box>
          </t.Banner>

          <TvSlider title="현재 방영중" Tvs={data?.results.slice(1) || []} />
          <TvSlider
            title="인기 방영작"
            Tvs={filterDuplicates(Populars?.results || [], data?.results || [])}
          />
          <TvSlider
            title="오늘 방영"
            Tvs={filterDuplicates(
              TodaysTvs?.results || [],
              data?.results || []
            )}
          />
          <TvSlider
            title="최고 평점"
            Tvs={filterDuplicates(TopRated?.results || [], data?.results || [])}
          />

          <AnimatePresence>
            {bigTvMatch ? (
              <>
                <S.OverLay
                  onClick={onOverLayClicked}
                  animate={{ opacity: 2 }}
                />
                <S.BigType
                  style={{ position: "fixed" }}
                  layoutId={bigTvMatch.params.original_name}
                >
                  {clickedTv && (
                    <>
                      <S.BigMain>
                        <S.BigCover
                          style={{
                            backgroundImage: `linear-gradient(to top, black,transparent),
                          url( ${makeImagePath(clickedTv.backdrop_path)})`,
                          }}
                        />
                        <S.BigSearch>
                          <S.Bigposter
                            style={{
                              backgroundImage: `url(${makeImagePath(
                                clickedTv.poster_path
                              )})`,
                            }}
                          />
                          <S.BigTitle>{clickedTv.name}</S.BigTitle>
                          <S.LlilTitle>{clickedTv.original_name}</S.LlilTitle>
                          <S.Bigrelease_date>
                            {" "}
                            첫 방송일 : {clickedTv.first_air_date}
                          </S.Bigrelease_date>
                          <S.Bigpopularity>
                            평점 :{" "}
                            {clickedTv
                              ? renderStars(clickedTv.vote_average)
                              : null}{" "}
                            / {clickedTv.vote_average.toFixed(1)}
                            <div style={{ marginTop: "5px" }}>
                              {renderTomatoScore(clickedTv.vote_average)}
                            </div>
                          </S.Bigpopularity>
                          <S.BigOverview>{clickedTv.overview}</S.BigOverview>
                          <S.Frame>
                            {selectedVideo && selectedVideo.key ? (
                              <ReactPlayer
                                className="react-player"
                                url={`https://www.youtube.com/watch?v=${selectedVideo.key}`}
                                width="100%"
                                height="100%"
                                playing={true}
                                loop={true}
                                style={{
                                  maxWidth: "100%",
                                  maxHeight: "100%",
                                }}
                              />
                            ) : (
                              <S.Dhk>😅예고편/미리보기가 없어요😅</S.Dhk>
                            )}
                          </S.Frame>
                        </S.BigSearch>
                      </S.BigMain>
                    </>
                  )}
                </S.BigType>
              </>
            ) : null}
          </AnimatePresence>
        </>
      )}
    </t.Wrapper>
  );
}

export default Tv;
