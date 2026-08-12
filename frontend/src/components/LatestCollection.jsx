import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);

  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1={"LATEST"} text2={"COLLECTION"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minus quaerat corporis itaque voluptate eos
          laboriosam autem, hic exercitationem harum reiciendis eligendi rem odio doloribus, ipsam deleniti iure.
          Dolore, deserunt facilis?
        </p>
      </div>
    </div>
  );
};

export default LatestCollection;
