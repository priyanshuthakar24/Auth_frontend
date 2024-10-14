import React, { useState } from "react";
import { ChevronDown, LayoutDashboard, LogOut, Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { menuItems } from "../../data/dummy";
import { useAuth } from "../../context/Authcontext";
import { Link, useNavigate } from "react-router-dom";
const isAdmin = false;

const MobmMenu = ({ Menus }) => {
  const [isOpen, setIsOpne] = useState(false);
  const [clicked, setClicked] = useState(null);
  const { isAuthenticated, userData, logout } = useAuth();
  const nav = useNavigate();
  const toggleDrawer = () => {
    setIsOpne(!isOpen);
    setClicked(null);
  };
  const handlelogout = async () => {
    await logout();
    nav("/auth/login");
  };
  const subMenuDrawer = {
    enter: {
      height: "auto",
      overflow: "hidden",
    },
    exit: {
      height: 0,
      overflow: "hidden",
    },
  };
  return (
    <div>
      <button className="z-[50000] relative" onClick={toggleDrawer}>
        {isOpen ? <X /> : <Menu />}
      </button>
      <motion.div
        className="fixed left-0 right-0 top-16 overflow-y-auto h-full bg-[#18181A] backdrop-blur text-white p-6"
        initial={{ x: "-100%" }}
        animate={{ x: isOpen ? "0%" : "-100%" }}
      >
        <ul>
          {Menus.map(({ name }, i) => {
            return (
              <li key={name}>
                <Link to={name} onClick={toggleDrawer}>
                  <span className="flex-center-between p-4 hover:bg-white/5 rounded-md cursor-pointer relative">
                    {name}
                  </span>
                </Link>
              </li>
            );
          })}
          {isAuthenticated ? (
            <li>
              <span
                className="flex-center-between p-4 hover:bg-white/5 rounded-md cursor-pointer relative"
                onClick={() => setClicked(!clicked)}
              >
                Profile
                <ChevronDown className={`ml-auto ${clicked && "rotate-180"}`} />
              </span>
              <motion.ul
                className="ml-5"
                initial="exit"
                animate={clicked ? "enter" : "exit"}
                variants={subMenuDrawer}
              >
                {menuItems.map((item, i) => (
                  <Link to={item.name} key={item.name}>
                    <li
                      key={i}
                      className="p-2 flex-center hover:bg-white/5 rounded-md cursor-pointer gap-x-2"
                    >
                      <item.icon size={17} />
                      <span>{item.name}</span>
                    </li>
                  </Link>
                ))}
                {userData.isAdmin ? (
                  <li className="p-2 flex-center hover:bg-white/5 rounded-md cursor-pointer gap-x-2">
                    <LayoutDashboard size={17} />
                    <Link to="/dashbord">Dashboard</Link>
                  </li>
                ) : null}

                <li
                  className="p-2 flex-center hover:bg-white/5 rounded-md cursor-pointer gap-x-2"
                  onClick={handlelogout}
                >
                  <LogOut size={17} />
                  <span>LogOut</span>
                </li>
              </motion.ul>
            </li>
          ) : null}
        </ul>
      </motion.div>
    </div>
  );
};

export default MobmMenu;
