import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import "./style.scss";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import MovieCard from "../../../components/movieCard/MovieCard";
import Spinner from "../../../components/spinner/Spinner";
import { fetchDataFromApi } from "../../../utils/api";
import { useSelector, useDispatch } from "react-redux";
import { getOptedGenres } from "../../../features/homeSlice";

const currentYear = new Date().getFullYear();

const arrayToString = (arr) => {
  if (arr.length === 1) {
    return arr[0].toString(); // If there's only one number, return it as a string
  } else {
    return arr.join(); // Join the array elements using a comma
  }
};

const MovieDisplay = () => {
  const { optedGenres } = useSelector((state) => state.home);
  const dispatch = useDispatch();
  const [year, setYear] = useState(2012);
  const [loading, setLoading] = useState(false);
  const [finalData, setFinalData] = useState({});

  console.log("finalData_moviedisplay", finalData);
  let finalUrl =
    optedGenres?.length > 0
      ? `/discover/movie?sort_by=popularity.des&vote_count.gte=100&primary_release_year=${year}&with_genres=${arrayToString(
          optedGenres
        )}`
      : `/discover/movie?sort_by=popularity.des&vote_count.gte=100&primary_release_year=${year}`;

  const fetchInitialData = async () => {
    setLoading(true);
    try {
      const res = await fetchDataFromApi(finalUrl);
      let tempData = { ...finalData };
      tempData[year] = res?.data;
      setFinalData(tempData);
      setYear((prev) => prev + 1);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchNextPageData = async () => {
    try {
      const res = await fetchDataFromApi(finalUrl);
      if (res) {
        let tempData = { ...finalData };
        tempData[year] = res?.data;
        setFinalData(tempData);
      }
      setYear((prev) => prev + 1);
    } catch (error) {
      console.error("Error fetching next page data:", error);
    }
  };

  useEffect(() => {
    dispatch(getOptedGenres([]));
  }, []);

  useEffect(() => {
    setYear(2012);
    fetchInitialData();
  }, [optedGenres?.length]);

  return (
    <div className="displayPage">
      {loading && <Spinner initial={true} />}
      {!loading && (
        <ContentWrapper>
          {Object.keys(finalData)?.length > 0 &&
            Object.entries(finalData).map(([k, value]) => {
              return (
                <>
                  <div className="year-text">{k}</div>
                  <InfiniteScroll
                    className="content"
                    dataLength={value?.results?.length || []}
                    next={fetchNextPageData}
                    hasMore={year <= currentYear}
                    loader={<Spinner />}
                  >
                    {value?.results.map((item, index) => {
                      if (item.media_type === "person") return;
                      return <MovieCard key={index} data={item} />;
                    })}
                  </InfiniteScroll>
                </>
              );
            })}
        </ContentWrapper>
      )}
    </div>
  );
};

export default MovieDisplay;
