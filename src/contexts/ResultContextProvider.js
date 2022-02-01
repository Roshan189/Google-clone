import React, { createContext, useContext, useState } from "react";

const ResultContext = createContext();
const baseUrl = "https://google-search3.p.rapidapi.com/api/v1";

const ResultContextProvider = ({ children }) => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // /videos, /images, /search
  const getResults = async (type) => {
    setIsLoading(true);

    const response = await fetch(`${baseUrl}${type})`, {
      method: "GET",
      headers: {
        "x-user-agent": "desktop",
        "x-proxy-location": "US",
        "x-rapidapi-host": "google-search3.p.rapidapi.com",
        "x-rapidapi-key": "5bdc0acd30mshaab199e8104237cp1e7592jsn1e5084db6d0b",
      },
    });

    const data = await response.json();

    // console.log({ type, data });
    if (type.includes("/news")) {
      setResults(data.entries);
    } else if (type.includes("/images")) {
      setResults(data.image_results);
    } else {
      setResults(data.results);
    }
    //
    // console.log(data);
    // setResults(data);
    setIsLoading(false);
  };

  return (
    <ResultContext.Provider
      value={{ getResults, results, searchTerm, setSearchTerm, isLoading }}
    >
      {children}
    </ResultContext.Provider>
  );
};

const useResultContext = () => useContext(ResultContext);

export { useResultContext, ResultContextProvider };
