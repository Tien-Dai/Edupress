import { useEffect, useState } from "react";
import { api } from "./api";

const useFetchData = (nameResource) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reload, setReload] = useState(0);

  const refetch = () => setReload((prev) => prev + 1);

  useEffect(() => {
    if (!nameResource) return;

    const fetchData = async () => {
      try {
        setLoading(true);

        const res = await api.get(`/${nameResource}`);

        let result = [];

        switch (nameResource) {
          case "categories":
            result = res.data.categories || [];
            break;

          case "courses":
            result = res.data.data || [];
            break;

          default:
            result = res.data.data || [];
        }

        setData(result);
      } catch (err) {
        setError(err);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [nameResource, reload]);

  return {
    data,
    loading,
    error,
    refetch,
  };
};

export default useFetchData;