export default function ImageSide() {
  return (
    <div className="ImageSideContainer">
      <img
        src={require("../../assets/Wallpaper.webp")}
        alt="Wallpaper"
        draggable={false}
        style={{ height: "90vh" }}
      />
    </div>
  );
}
