import "./Login.Style.css";
import LoginImageSide from "./Parts/LoginImageSide";
import LoginSide from "./Parts/LoginSide";
export default function Login() {
  return (
    <div className="LoginContainer">
      <LoginSide />
      <LoginImageSide />
    </div>
  );
}
