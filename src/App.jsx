import { useEffect } from "react";
import "./App.css";
import { fetchDataFromApi } from "./utils/api";
import { useDispatch, useSelector } from "react-redux";
import { getApiConfiguration } from "./features/homeSlice";

function App() {
  const dispatch = useDispatch();
  const {url} = useSelector((state) => state.home)

  const fetchDataWithKey = async (url) => {
    const dataReceived = await fetchDataFromApi(url);
    dispatch(getApiConfiguration(dataReceived.data));
    console.log("fetchDataWithKey", dataReceived.data);
  };

  useEffect(() => {
    // fetchDataFn();
    fetchDataWithKey("/discover/movie");
  }, []);

  return (
    <>
      <div>
        <h1>Movieflix</h1>
        <h2>{url?.total_results}</h2>
      </div>
    </>
  );
}

export default App;
