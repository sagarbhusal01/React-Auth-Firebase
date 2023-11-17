import { onAuthStateChanged, signOut } from "firebase/auth";
import { useLayoutEffect } from "react";
import { auth } from "../FirebaseConfig";
import { useNavigate } from "react-router-dom";
import "./Home.Style.css";
export default function Home() {
  // ============================================
  // ============================================
  // ============================================

  const Signout = () => {
    signOut(auth).then(() => {
      navigate("/Login");
    });
  };

  // ============================================
  // ============================================
  // ============================================
  const navigate = useNavigate();
  useLayoutEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/Login");
      }
    });
  });
  // ============================================
  // ============================================
  // ============================================

  return (
    <div className="HomeContainer">
      <span>{auth.currentUser?.displayName}</span>
      <button onClick={() => Signout()}>Signout</button>
    </div>
  );
}
