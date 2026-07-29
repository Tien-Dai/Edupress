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

        // Nếu API trả về trực tiếp là mảng
        if (Array.isArray(res.data)) {
          result = res.data;
        }
        // Nếu API trả về { data: [...] }
        else if (Array.isArray(res.data.data)) {
          result = res.data.data;
        }
        // Nếu API trả về { categories: [...] }
        else if (Array.isArray(res.data.categories)) {
          result = res.data.categories;
        }
        // Nếu API trả về { sections: [...] }
        else if (Array.isArray(res.data.sections)) {
          result = res.data.sections;
        }
        // Nếu API trả về { lectures: [...] }
        else if (Array.isArray(res.data.lectures)) {
          result = res.data.lectures;
        }

        setData(result);
      } catch (err) {
        console.error(err);
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