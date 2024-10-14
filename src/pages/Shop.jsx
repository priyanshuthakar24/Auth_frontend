import React from "react";
import { useAuth } from "../context/Authcontext";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";

const Shop = () => {
  const { isAuthenticated, logout } = useAuth();
  const nav = useNavigate();
  const handlelogout = async () => {
    await logout();
    nav("/auth/login");
  };
  return (
    <div className="mt-16 text-black">
      Shop <br />
      {isAuthenticated && (
        <Button loading={true} color="default"
        variant="solid"
        size="large">
          Logout
        </Button>
      )}
    </div>
  );
};

export default Shop;
