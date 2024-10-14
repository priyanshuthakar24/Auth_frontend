import React from "react";
import { BsHandbag } from "react-icons/bs";

const CartCount = (props) => {
  return (
    <div className="flex-center-between mr-6">
      <BsHandbag className="m-2  size-5" />
      <span className="text-xl">{props.count}</span>
    </div>
  );
};

export default CartCount;
