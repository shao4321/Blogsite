import { useState, useEffect } from "react";

const useFetch = (url, setData = null) => {
  const [returnData, setReturnData] = useState("");
  const [isPending, setIsPending] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetch(url)
      .then((res) => {
        if (!res.ok)
          throw new Error("Could not fetch the data from the server");
        return res.json();
      })
      .then((data) => {
        if (setData) {
          setData(data);
        }
        setIsPending(false);
        setReturnData(data);
      })
      .catch((err) => {
        setHasError(true);
        setErrorMessage(err.message);
      });
  }, [url, setData]);

  return { returnData, isPending, hasError, errorMessage };
};

export default useFetch;
