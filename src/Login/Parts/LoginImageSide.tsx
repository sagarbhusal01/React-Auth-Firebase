import React from "react";

export default function LoginImageSide() {
  return (
    <div className="ImageSideContainer">
      <img
        src={require("../../assets/Wallpaper1.webp")}
        alt="Wallpaper"
        draggable={false}
        style={{ height: "90vh" }}
      />
    </div>
  );
}
