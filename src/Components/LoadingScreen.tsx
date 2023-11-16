import Lottie from "lottie-react";
import React from "react";
import LoadingAnimation from "../assets/Loading.json";
export default function LoadingScreen() {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "#000000",
        opacity: 0.8,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Lottie
        animationData={LoadingAnimation}
        autoPlay
        style={{ height: "80px" }}
      />
    </div>
  );
}
