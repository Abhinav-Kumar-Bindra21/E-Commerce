import { useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { useSearchParams } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";

const Verify = () => {
  const { navigate, token, setCartItems, backendUrl } = useContext(ShopContext);
  const [searchParams, setSearchParams] = useSearchParams();

  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const verifyPayment = async () => {
    try {
      if (!token) {
        return null;
      }

      const res = await axios.post(
        backendUrl + "/api/order/verifyStripe",
        { success, orderId },
        { headers: { token } },
      );

      if (res.data.success) {
        setCartItems({});
        navigate("/orders");
      } else {
        navigate("/cart");
      }
    } catch (error) {
      console.log(error.response);
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Failed to place order");
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  useEffect(() => {
    verifyPayment();
  }, [token]);
  return <div>Verify</div>;
};

export default Verify;
