    import { useQuery } from "@tanstack/react-query";
    import { api } from "../../api/api.js";

    const useFetchCourse = (page, limit, search) => {
    return useQuery({
        queryKey: ["courses", page, limit, search],
        queryFn: async () => {
        const res = await  api.get("/my-courses", {
            params: {
            page,
            limit,
            search
            }
        });
        return res.data;
        },
       keepPreviousData: true
    });
    };

    export default useFetchCourse;