import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import SwitchTabs from "../../../components/switchTabs/SwitchTabs";
import { useEffect } from "react";
import { fetchDataFromApi } from "../../../utils/api";
import { useDispatch, useSelector } from "react-redux";
import { getGenres } from "../../../features/homeSlice";

const GenreList = () => {
  const dispatch = useDispatch();
  const { genres } = useSelector((state) => state.home);
  const fetchGenreList = async (url) => {
    const dataReceived = await fetchDataFromApi(url);
    dispatch(getGenres(dataReceived?.data?.genres));
  };

  useEffect(() => {
    fetchGenreList("/genre/movie/list");
  }, []);

  return (
    <div className="carouselSection">
      <ContentWrapper>
        <div
          style={{ width: "100%", display: "flex", flexDirection: "column" }}
        >
          {genres.length > 0 && (
            <SwitchTabs data={genres} />
          )}
        </div>
      </ContentWrapper>
    </div>
  );
};

export default GenreList;
