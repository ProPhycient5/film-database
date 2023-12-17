import dayjs from "dayjs";
import { useSelector } from "react-redux";
import "./style.scss";
import Img from "../lazyLoadImages/Img";
import CircleRating from "../circleRating/CircleRating";
import Genres from "../genres/Genres";
import PosterFallback from "../../assets/no-poster.png";

// eslint-disable-next-line react/prop-types
const MovieCard = ({ data }) => {
  const { url } = useSelector((state) => state.home);
  const posterUrl = data?.poster_path
    ? url.poster + data?.poster_path
    : PosterFallback;
    
  return (
    <div className="movieCard">
      <div className="posterBlock">
        <Img className="posterImg" src={posterUrl} />
        <CircleRating rating={data?.vote_average?.toFixed(1)} />
        <Genres data={data?.genre_ids?.slice(0, 2)} />
      </div>
      <div className="textBlock">
        <span className="title">{data?.title || data?.name}</span>
        <span className="date">
          {dayjs(data?.release_date).format("MMM D, YYYY")}
        </span>
      </div>
    </div>
  );
};

export default MovieCard;
