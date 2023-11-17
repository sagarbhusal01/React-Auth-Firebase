import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import React, { useEffect } from "react";
import { auth } from "../../FirebaseConfig";
import { ParseFirebaseError } from "../../Global/ParseFirebaseError";
import { Link, useNavigate } from "react-router-dom";
import LoadingScreen from "../../Components/LoadingScreen";

export default function LoginSide() {
  // ==========================================================
  // ==========================================================
  // ==========================================================
  const [Email, setEmail] = React.useState<string>("");
  const [Password, setPassword] = React.useState<string>("");
  const [ErrorState, setErrorState] = React.useState<string>("");
  const [Loading, setLoading] = React.useState<boolean>(false);
  // ==========================================================
  // ==========================================================
  // ==========================================================

  const LoginIn = () => {
    if (!Email || !Password) {
      return;
    }
    setLoading(true);
    signInWithEmailAndPassword(auth, Email, Password)
      .then((result) => {
        if (result.user.emailVerified) {
          navigate("/Home");
        }
        setLoading(false);
        setErrorState("you must verify your Email first...");
      })
      .catch((e) => {
        setLoading(false);
        setErrorState(ParseFirebaseError(e.code));
      });
  };
  // ==========================================================
  // ==========================================================
  // ==========================================================
  const navigate = useNavigate();

  // ==========================================================
  // ==========================================================
  // ==========================================================
  useEffect(() => {
    setErrorState("");
  }, [Email, Password]);

  useEffect(() => {
    if (auth.currentUser && auth.currentUser.emailVerified) {
      navigate("/Home");
    }
  }, []);

  // ==========================================================
  // ==========================================================
  // ==========================================================

  return (
    <>
      <div className="LoginSideContainer">
        <div className="LoginWrapper">
          <div className="LogoPlacement">
            <img
              src={require("../../assets/favicon.png")}
              id="LOGO"
              alt="LOGO"
            />
            <span style={{ fontWeight: "600", color: "white" }}>LOGO</span>
          </div>
          <span
            style={{
              fontSize: "30px",
              fontWeight: "600",
              color: "white",
              marginTop: "25px",
            }}
          >
            Welcome Back 👋
          </span>
          <span style={{ color: "#696F79", marginTop: "10px", width: 350 }}>
            We are happy to have you back !!
          </span>
          <span className="grey  " style={{ marginTop: 60 }}>
            Email Address*
          </span>
          <input
            type="email"
            placeholder="Enter email address"
            className="input"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <span className="grey m-25 ">Create Password*</span>
          <input
            placeholder="Enter password"
            type="password"
            className="input"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <span
            style={{
              color: "tomato",
              alignSelf: "center",
              fontSize: "12px",
              marginTop: "30px",
            }}
          >
            {ErrorState}
          </span>
          {Loading ? <LoadingScreen /> : null}
          <button
            className="LoginButton"
            style={{
              backgroundColor: Email && Password ? "#1565d8" : "grey",
            }}
            onClick={() => LoginIn()}
          >
            Login
          </button>
          <Link
            to={"/Register"}
            style={{ alignSelf: "center", marginTop: 10, color: "#1565D8" }}
          >
            Don't have an account?
          </Link>
        </div>
      </div>
    </>
  );
}
