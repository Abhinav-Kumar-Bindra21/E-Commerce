import axios from "axios";
import { useEffect, useState } from "react";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";

interface List {
  _id: string;
  name: string;
  price: number;
  image: string[];
  category: string[];
}

const List = ({ token }: { token: string }) => {
  const [list, setList] = useState<List[]>([]);

  const fetchList = async () => {
    try {
      const res = await axios.get(backendUrl + "/api/product/list");

      if (res.data.success) {
        setList(res.data.product);
      } else {
        toast.error(res.data.message);
      }
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  const removeProduct = async (id: string) => {
    try {
      const res = await axios.delete(backendUrl + "/api/product/remove", { data: { id }, headers: { token } });

      if (res.data.success) {
        toast.success(res.data.message);
        await fetchList();
      } else {
        toast.error(res.data.message);
      }
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  useEffect(() => {
    fetchList();
  }, []);
  return (
    <>
      <p className="mb-2">All Products List</p>
      <div className="flex flex-col gap-2">
        {/* -------------------- list table title ---------------------- */}

        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Action</b>
        </div>

        {/* ----------------- Product List ----------------------------- */}

        {list.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm"
          >
            <img className="w-12" src={item.image[0]} alt="" />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>
              {currency}
              {item.price}
            </p>
            <p onClick={() => removeProduct(item._id)} className="text-right md:text-center cursor-pointer text-lg">
              X
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default List;
