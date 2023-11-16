import Lottie from "lottie-react";
import React from "react";
import EMAILSENT from "../../assets/EmailSent.json";
import { useNavigate } from "react-router-dom";
export default function VerificationLinkSent(props: any) {
  // ============================================================
  // ============================================================
  // ============================================================
  const Navigate = useNavigate();
  // ============================================================
  // ============================================================
  // ============================================================

  const GoToLogin = () => {
    Navigate("/Login");
  };
  // ============================================================
  // ============================================================
  // ============================================================
  

  return (
    <>
      {props.Trigger ? (
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              minHeight: 30,
              paddingTop: 20,
              paddingBottom: 20,
              paddingLeft: 30,
              paddingRight: 30,
              backgroundColor: "white",
              borderRadius: 8,
              margin: 30,
              display: "flex",
              flexDirection: "column",
              boxShadow: " 0px 10px 15px 50000px rgba(0,0,0,0.85)",
            }}
          >
            <span
              style={{ fontWeight: "800", fontSize: 30, alignSelf: "center" }}
            >
              Please verify your email
            </span>
            <Lottie
              animationData={EMAILSENT}
              autoPlay
              style={{ height: 180, marginTop: 20, marginBottom: 20 }}
            />
            <span style={{ alignSelf: "center" }}>
              We have sent an email with the verification link.
            </span>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                flexDirection: "row",
                marginTop: 15,
              }}
            >
              <button
              onClick={()=>props.ResendEmailVerificationLink()}
                style={{
                  height: 40,
                  width: 150,
                  background: "#DCDCDC",
                  borderRadius: 5,
                  border: "none",
                  color: "#0DAFE2",
                  fontWeight: "600",
                  fontSize: "14px",
                }}
              >
                Resend Link
              </button>
              <button
                style={{
                  height: 40,
                  width: 150,
                  background: "#0DAFE2",
                  borderRadius: 5,
                  border: "none",
                  color: "white",
                  fontWeight: "600",
                  fontSize: "14px",
                }}
                onClick={() => GoToLogin()}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
