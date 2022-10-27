import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PlayerProvider } from "../context/PlayerContext";

export default function Layout({ children }) {
  return (
    <>
      <ToastContainer />
      <div className="bg-gray-500">{children}</div>
    </>
  );
}
