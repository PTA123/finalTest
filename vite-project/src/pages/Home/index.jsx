import React, { useState } from "react";
import Header from "../Header";
import ListFilm from "../Films";

const Home = () => {
  return (
    <div className="bg-custom-color-orange w-screen h-screen flex justify-center items-center">
      <div className="w-[70rem] h-[39rem] bg-white rounded-2xl shadow-lg">
        <Header />
        <ListFilm/>
      </div>
    </div>
  );
};

export default Home;
