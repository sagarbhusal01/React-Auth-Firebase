import React from "react";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "../../FirebaseConfig";
import LoadingScreen from "../../Components/LoadingScreen";
import { ParseFirebaseError } from "../../Global/ParseFirebaseError";
import VerificationLinkSent from "./VerificationLinkSent";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
// =======================================
// =======================================
// =======================================
// =======================================
export default function RegisterSide() {
  const [Email, setEmail] = React.useState<string>("");
  const [Name, setName] = React.useState<string>("");
  const [Password, setPassword] = React.useState<string>("");
  const [Agree, setAgree] = React.useState<boolean>(false);
  const [ErrorState, setErrorState] = React.useState<string>("");
  const [Loading, setLoading] = React.useState<boolean>(false);
  const [PopupTrigger, setPopupTrigger] = React.useState<boolean>(false);
  const [UserResult, setUserResult] = React.useState<any>();

  //   ==========================================
  //   ==========================================
  //   ==========================================
  const HandleData = () => {
    if (Email === "" || Password === "" || Name === "") {
      setErrorState("Name, Email and Password cannot be empty");
      return;
    }
    if (Agree === false) {
      setErrorState("You must agree to the terms and condition");
      return;
    }
    CreateAcccount();
  };
  //   ==========================================
  //   ==========================================
  //   ==========================================
  const CreateAcccount = () => {
    setLoading(true);
    createUserWithEmailAndPassword(auth, Email, Password)
      .then((result) => {
        SetDisplayNameinFirebase();
        setUserResult(result);
        SendEmailVerificationLink(result);
      })
      .catch((error) => {
        console.log(error.code);
        setErrorState(ParseFirebaseError(error.code));
        setLoading(false);
      });
  };
  //   ==========================================
  //   ==========================================
  //   ==========================================

  const SetDisplayNameinFirebase = async () => {
    if (!auth.currentUser) {
      return;
    }
    updateProfile(auth.currentUser, {
      displayName: `${Name}`,
    }).catch(() => {
      setErrorState("Wasn't able to set Name, Try Again. ");
      setLoading(false);
    });
  };
  //   ==========================================
  //   ==========================================
  //   ==========================================
  const SendEmailVerificationLink = async (result: any) => {
    if (!auth) {
      return;
    }
    setPopupTrigger(true);

    sendEmailVerification(result.user)
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        setErrorState("Couln't send verification mail.");
        setPopupTrigger(true);
        setLoading(false);
      });
  };

  //   ==========================================
  //   ==========================================
  //   ==========================================

  const ResendEmailVerificationLink = () => {
    if (!auth) {
      return;
    }

    sendEmailVerification(auth.currentUser || UserResult)
      .then(() => {
        ShowVerificaionLinkSentToast();
        setUserResult(null);
      })
      .catch((e) => {
        ShowVerificaionLinkSentToastFailed();
        setLoading(false);
      });
  };

  //   ==========================================
  //   ==========================================
  //   ==========================================

  React.useEffect(() => {
    setErrorState("");
  }, [Name, Email, Password, Agree]);
  //   ==========================================
  //   ==========================================
  //   ==========================================
  const ShowVerificaionLinkSentToast = () => {
    toast.success("Email verfication Link Sent Again!", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };
  //   ==========================================
  //   ==========================================
  //   ==========================================
  const ShowVerificaionLinkSentToastFailed = () => {
    toast.warn("Wait 2 minutes before sending another email !", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };
  //   ==========================================
  //   ==========================================
  //   ==========================================
  React.useEffect(() => {
    setName("");
    setEmail("");
    setPassword("");
    setAgree(false);
  }, []);
  //   ==========================================
  //   ==========================================
  //   ==========================================

  return (
    <>
      <div className="RegisterSideContainer">
        <div className="RegisterWrapper">
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
            Create an Account 👋
          </span>
          <span style={{ color: "#696F79", marginTop: "10px" }}>
            Kindly fill in your details to create an account
          </span>
          <span className="grey m-25 ">Your fullName*</span>
          <input
            type="text"
            placeholder="Enter your name"
            className="input"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <span className="grey m-25 ">Email Address*</span>
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

          <div className="CheckboxContainer">
            <input
              type="checkbox"
              id="Checkbox"
              onChange={(e) => {
                setAgree(e.target.checked);
              }}
            />
            <span className="grey">I agree to terms & conditions*</span>
          </div>
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
          <button
            className="RegisterButton"
            style={{
              backgroundColor:
                Name && Email && Password && Agree ? "#1565d8" : "grey",
            }}
            onClick={() => {
              HandleData();
            }}
          >
            {Loading ? (
              <>
                <LoadingScreen />
                <span>Register Account</span>
              </>
            ) : (
              <>
                <span>Register Account</span>
              </>
            )}
          </button>
          <VerificationLinkSent
            Trigger={PopupTrigger}
            ResendEmailVerificationLink={ResendEmailVerificationLink}
          />
            <ToastContainer  />
          <Link
            to={"/Login"}
            style={{ alignSelf: "center", marginTop: 10, color: "#1565D8" }}
          >
            Already have an account?
          </Link>
        </div>
      </div>
    </>
  );
}
