import { useEffect } from "react";
import "./App.css";
import { fetchDataFromApi } from "./utils/api";

function App() {
  // const [count, setCount] = useState(0)

  //sawan func
  // const fetchDataFn = async () => {
  //   const dataReceived = await fetchMovieData();
  //   console.log("dataReceived", dataReceived.data);
  // };

  const fetchDataWithKey = async (url) => {
    const dataReceived = await fetchDataFromApi(url);
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
      </div>
    </>
  );
}

export default App;
