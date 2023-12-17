import { useState } from "react";
import "./style.scss";
import { useDispatch } from "react-redux";
import { getOptedGenres } from "../../features/homeSlice";

const SwitchTabs = ({ data }) => {
  const dispatch = useDispatch();
  const [selectedGenre, setSelectedGenre] = useState([]);

  const handleTabClick = (genreId) => {
    let tempGenre = [...selectedGenre, genreId];
    if (!selectedGenre.includes(genreId))
      setSelectedGenre((prev) => [...prev, genreId]);
    else {
      tempGenre = [...selectedGenre].filter((id) => id !== genreId);
      setSelectedGenre(tempGenre);
    }
    dispatch(getOptedGenres(tempGenre));
  };

  return (
    <div className="tabWrapper">
      {data.map((genre) => {
        return (
          <div
            key={genre?.id}
            className={`tab ${
              selectedGenre.includes(genre?.id) ? "active" : ""
            }`}
            onClick={() => handleTabClick(genre?.id)}
          >
            {genre?.name?.split(" ")[0]}
          </div>
        );
      })}
    </div>
  );
};

export default SwitchTabs;
