import { createContext } from "react";
import { products } from "../assets/frontend_assets/assets";

export const ShopContext = createContext();

const currency = "$";
const deliveryFee = 10;

const ShopContextProvider = (props) => {
  const value = {
    products,
    currency,
    deliveryFee,
  };

  return <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>;
};

export default ShopContextProvider;
