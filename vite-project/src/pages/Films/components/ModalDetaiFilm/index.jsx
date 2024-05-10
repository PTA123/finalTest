import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import { FaPlay } from "react-icons/fa";

const ModalDetailFilm = ({ loading, isModalOpen, handleCancel, film }) => {
  const [filmDetail, setFilmDetail] = useState(null);

  useEffect(() => {
    const fetchFilmDetail = async () => {
      try {
        setFilmDetail(film);
      } catch (error) {
        console.error("Error fetching film detail:", error);
      }
    };

    if (isModalOpen && film) {
      fetchFilmDetail();
    }
  }, [isModalOpen, film]);

  return (
    <Modal
      visible={isModalOpen}
      onCancel={handleCancel}
      okButtonProps={{ style: { display: "none" } }}
      cancelButtonProps={{ style: { display: "none" } }}
      width={750}
    >
      {filmDetail && (
        <div className="flex justify-between">
          <div className="-mt-[4rem] -ml-[5rem]">
            <img
              src={filmDetail.image}
              alt={filmDetail.name}
              width={325}
              className="h-[32rem] rounded-xl"
            />
          </div>
          <div className="w-[27rem]">
            <h1 className="text-gray-700 text-3xl mb-4">{filmDetail.name}</h1>
            <span className="text-gray-500 mr-1">{filmDetail.time} min</span>
            <span className="text-gray-500">{filmDetail.year}</span>
            <p className="text-gray-500 mt-8">{filmDetail.introduce}</p>
            <button
              type="button"
              className="flex items-center justify-center w-[8rem] bg-orange-400 hover:bg-orange-500 transition duration-200 text-white font-bold py-2 rounded-3xl shadow mt-8 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
            >
              <FaPlay className="mr-2" />
              PLAY MOVIE
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default ModalDetailFilm;
