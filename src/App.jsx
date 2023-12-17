import { useEffect } from "react";
// import "./App.css";
import { fetchDataFromApi } from "./utils/api";
import { useDispatch, useSelector } from "react-redux";
import { getApiConfiguration } from "./features/homeSlice";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Details from "./pages/details/Details";
import SearchResult from "./pages/searchResult/SearchResult";
import Explore from "./pages/explore/Explore";
import ErrorPage from "./pages/404/ErrorPage";

function App() {
  const dispatch = useDispatch();
  const { url } = useSelector((state) => state.home);

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
  console.log(url);

  useEffect(() => {
    // fetchDataFn();
    fetchDataWithKey("/configuration");
  }, []);

  return (
    <>
      <BrowserRouter>
        {/* <Header /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:mediaType/:id" element={<Details />} />
          <Route path="/search/:query" element={<SearchResult />} />
          <Route path="/explore/:mediaType" element={<Explore />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        {/* <Footer /> */}
      </BrowserRouter>
    </>
  );
}

export default App;
