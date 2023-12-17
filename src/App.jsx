import { useEffect } from "react";
import { fetchDataFromApi } from "./utils/api";
import { useDispatch } from "react-redux";
import { getApiConfiguration } from "./features/homeSlice";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Details from "./pages/details/Details";
import SearchResult from "./pages/searchResult/SearchResult";
import ErrorPage from "./pages/404/ErrorPage";

function App() {
  const dispatch = useDispatch();
  const fetchDataWithKey = async (url) => {
    const dataReceived = await fetchDataFromApi(url);
    console.log("dataReceived_image", dataReceived);
    const urlObj = {
      backdrop: dataReceived?.data?.images?.secure_base_url + "original",
      poster: dataReceived?.data?.images?.secure_base_url + "original",
      profile: dataReceived?.data?.images?.secure_base_url + "original",
    };
    dispatch(getApiConfiguration(urlObj));
    console.log("fetchDataWithKey", dataReceived.data);
  };

  useEffect(() => {
    fetchDataWithKey("/configuration");
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:mediaType/:id" element={<Details />} />
          <Route path="/search/:query" element={<SearchResult />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
