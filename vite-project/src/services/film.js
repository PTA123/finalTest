import { axiosInstance } from "./index";

const getPagingFilm = ({ pageSize, pageIndex }) => {
    return axiosInstance.get(`/film/get-paging-film?pageSize=${pageSize}&pageIndex=${pageIndex}`);
}
const getDetailFilmById = (id) => {
    return axiosInstance.get(`/film/${id}`);
}

export {
    getPagingFilm,
    getDetailFilmById
}