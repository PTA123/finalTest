import React, { useState, useEffect } from "react";
import { getPagingFilm } from "../../services/film";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import ModalDetailFilm from "./components/ModalDetaiFilm";

const ListFilm = () => {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(4);
  const [pageIndex, setPageIndex] = useState(1);
  const [selectedFilm, setSelectedFilm] = useState(null);
  const [hasMoreData, setHasMoreData] = useState(true);

  const getFilms = async () => {
    try {
      setLoading(true);
      const result = await getPagingFilm({ pageSize, pageIndex });
      if (result.data.films.length === 0) {
        setHasMoreData(false);
      } else {
        setFilms(result.data.films);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleNextPage = () => {
    if (hasMoreData) {
      setPageIndex(pageIndex + 1);
    }
  };

  const handlePrevPage = () => {
    setPageIndex(pageIndex - 1);
  };

  useEffect(() => {
    getFilms();
  }, [pageSize, pageIndex]);
  return (
    <div className="p-5">
      {/* Tiêu đề */}
      <h1 className="text-gray-700 text-2xl">Most Popular Movies</h1>
      {/* Danh sách phim */}
      <div className="relative">
        <FaAngleDoubleLeft
          onClick={handlePrevPage}
          className="m-3 text-6xl cursor-pointer absolute top-[12rem] left-0 -mt-4 text-white rounded-full bg-black px-3 bg-opacity-60 hover:bg-gray-500"
        />
        <FaAngleDoubleRight
          onClick={handleNextPage}
          className={
            "m-3 text-6xl cursor-pointer absolute top-[12rem] right-0 -mt-4 text-white rounded-full bg-black px-3 bg-opacity-60 hover:bg-gray-500"
          }
        />
        <div className="grid grid-cols-4 gap-4 mb-5">
          {/* Mỗi mục phim */}
          {films.map((film) => (
            <div
              loading={loading}
              key={film.id}
              onClick={() => setSelectedFilm(film)}
              className="mt-4 cursor-pointer"
            >
              <img
                src={film.image}
                alt={film.name}
                width={255}
                className="h-[23rem]"
              />
              <div className="text-gray-700 text-xl mt-2">{film.name}</div>
              <div className="text-gray-500">{film.year}</div>
            </div>
          ))}
        </div>

        {selectedFilm && (
          <ModalDetailFilm
            loading={loading}
            isModalOpen={true}
            film={selectedFilm}
            handleCancel={() => setSelectedFilm(null)}
          />
        )}
      </div>
    </div>
  );
};

export default ListFilm;
