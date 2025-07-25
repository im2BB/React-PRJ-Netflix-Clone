import { useQuery } from "react-query";
import {
  IGetMoviesResult,
  getMovies,
  getPopular,
  getRatedMovies,
  getUpcoming,
  getYoutubeList,
  getRottenTomatoFromTMDB,
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
import {
  renderStars,
  renderTomatoScore,
  renderRealTomatoScore,
} from "../../Utils/RenderStars";

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
function MovieSlider({ title, movies }: { title: string; movies: any[] }) {
  const history = useNavigate();

  const onBoxClicked = (movieId: number) => {
    history(`/movies/${movieId}`);
  };

  return (
    <o.Slider1>
      <o.FrontTitle>{title}</o.FrontTitle>
      <StyledSwiper
        slidesPerView={5}
        autoHeight={true}
        spaceBetween={15}
        watchOverflow={true}
        navigation={true}
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
        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <o.Box
              layoutId={movie.id + ""}
              whileHover="hover"
              initial="normal"
              variants={o.boxVariants}
              onClick={() => onBoxClicked(movie.id)}
              transition={{ type: "tween" }}
              $bgPhoto={makeImagePath(movie.backdrop_path)}
            >
              <o.Info variants={o.infoVariants}>
                <h4 style={{ fontSize: "26px", padding: "10px" }}>
                  {movie.title}
                </h4>
              </o.Info>
            </o.Box>
          </SwiperSlide>
        ))}
      </StyledSwiper>
    </o.Slider1>
  );
}

function Home() {
  const history = useNavigate();
  const bigMovieMatch: PathMatch<string> | null = useMatch("/movies/:movieId");
  const onOverLayClicked = () => history(`/react-PRJ2`);
  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  const [tomatoData, setTomatoData] = useState<any>(null);
  const [detailTomatoData, setDetailTomatoData] = useState<any>(null);

  const { data, isLoading } = useQuery<IGetMoviesResult>(
    ["Getmovies", "GetnowPlaying"],
    getMovies
  );

  const { data: PopularMovie } = useQuery<IGetMoviesResult>(
    ["getRatedMovies"],
    getPopular
  );

  const { data: RatedMovie } = useQuery<IGetMoviesResult>(
    ["getPopular"],
    getRatedMovies
  );

  const { data: Upcoming } = useQuery<IGetMoviesResult>(
    ["getUpcoming"],
    getUpcoming
  );

  const clickedMovie = //클릭한 div에 해당값 들어있는지 확인
    bigMovieMatch?.params.movieId &&
    (data?.results.find(
      (movie) => movie.id + "" === bigMovieMatch.params.movieId
    ) ||
      RatedMovie?.results.find(
        (movie) => movie.id + "" === bigMovieMatch.params.movieId
      ) ||
      PopularMovie?.results.find(
        (movie) => movie.id + "" === bigMovieMatch.params.movieId
      ) ||
      Upcoming?.results.find(
        (movie) => movie.id + "" === bigMovieMatch.params.movieId
      ));

  useEffect(() => {
    const fetchVideo = async () => {
      if (bigMovieMatch && bigMovieMatch.params.movieId) {
        try {
          const youtubeData = await getYoutubeList(
            "movie",
            bigMovieMatch.params.movieId
          );
          setSelectedVideo(youtubeData.results[0]); // Use the first video only
        } catch (error) {
          // Error handling without console.log
        }
      } else {
        setSelectedVideo(null);
      }
    };

    fetchVideo();
  }, [bigMovieMatch]);

  // 로튼 토마토 데이터 가져오기
  useEffect(() => {
    const fetchTomatoData = async () => {
      if (data?.results[0]) {
        try {
          const tomatoResult = await getRottenTomatoFromTMDB(
            data.results[0].original_title,
            data.results[0].release_date?.toString()
          );
          setTomatoData(tomatoResult);
        } catch (error) {
          // Error handling without console.log
        }
      }
    };

    fetchTomatoData();
  }, [data]);

  // 상세 페이지 로튼 토마토 데이터 가져오기
  useEffect(() => {
    const fetchDetailTomatoData = async () => {
      if (clickedMovie) {
        try {
          const tomatoResult = await getRottenTomatoFromTMDB(
            clickedMovie.original_title,
            clickedMovie.release_date?.toString()
          );
          setDetailTomatoData(tomatoResult);
        } catch (error) {
          // Error handling without console.log
        }
      } else {
        setDetailTomatoData(null);
      }
    };

    fetchDetailTomatoData();
  }, [clickedMovie]);

  const filterDuplicates = (moviesToFilter: any[], excludedMovies: any[]) => {
    return moviesToFilter.filter(
      (movie) =>
        !excludedMovies.some((excludedMovie) => excludedMovie.id === movie.id)
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
                <o.Title>{data?.results[0].title}</o.Title>
                <o.LilTitle>{data?.results[0].original_title}</o.LilTitle>
                <o.Date>개봉일 : {data?.results[0].release_date}</o.Date>
                <div style={{ marginTop: "10px", marginBottom: "10px" }}>
                  {tomatoData
                    ? renderRealTomatoScore(tomatoData)
                    : renderTomatoScore(data?.results[0].vote_average || 0)}
                </div>
                <o.OverView>{data?.results[0].overview}</o.OverView>
              </t.LilBox>
            </t.Box>
          </t.Banner>

          <MovieSlider
            title="현재 상영중"
            movies={data?.results.slice(1) || []}
          />
          <MovieSlider
            title="죽기전에 봐야 할 영화"
            movies={RatedMovie?.results || []}
          />
          <MovieSlider
            title="인기 상영작"
            movies={filterDuplicates(
              PopularMovie?.results || [],
              data?.results || []
            )}
          />
          <MovieSlider
            title="예정작"
            movies={filterDuplicates(
              Upcoming?.results || [],
              data?.results || []
            )}
          />

          <AnimatePresence>
            {bigMovieMatch ? (
              <>
                <S.OverLay
                  onClick={onOverLayClicked}
                  animate={{ opacity: 2 }}
                />
                <S.BigType
                  style={{ position: "fixed" }}
                  layoutId={bigMovieMatch.params.original_title}
                >
                  {clickedMovie && (
                    <>
                      <S.BigMain>
                        <S.BigCover
                          style={{
                            backgroundImage: `linear-gradient(to top, black,transparent),
                            url( ${makeImagePath(clickedMovie.backdrop_path)})`,
                          }}
                        />
                        <S.BigSearch>
                          <S.Bigposter
                            style={{
                              backgroundImage: `url(${makeImagePath(
                                clickedMovie.poster_path
                              )})`,
                            }}
                          />
                          <S.BigTitle>{clickedMovie.title}</S.BigTitle>
                          <S.LlilTitle>
                            {clickedMovie.original_title}
                          </S.LlilTitle>
                          <S.Bigrelease_date>
                            {" "}
                            개봉일 : {clickedMovie.release_date}
                          </S.Bigrelease_date>
                          <S.Bigpopularity>
                            평점 :{" "}
                            {clickedMovie
                              ? renderStars(clickedMovie.vote_average)
                              : null}{" "}
                            / {clickedMovie.vote_average.toFixed(1)}
                            <div style={{ padding: "10px" }}>
                              {detailTomatoData
                                ? renderRealTomatoScore(detailTomatoData)
                                : renderTomatoScore(clickedMovie.vote_average)}
                            </div>
                          </S.Bigpopularity>
                          <S.BigOverview>{clickedMovie.overview}</S.BigOverview>
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

export default Home;
