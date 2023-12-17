import "./style.scss";
import HeroBanner from "./heroBanner/HeroBanner";
import GenreList from "./genreList/GenreList";
import MovieDisplay from "./movieDisplay/MovieDisplay";

const Home = () => {
  return (
    <div className="homePage">
      <HeroBanner />
      <GenreList />
      <MovieDisplay />
    </div>
  );
};

export default Home;
