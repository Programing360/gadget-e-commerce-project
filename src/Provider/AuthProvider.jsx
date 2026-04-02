import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "../Authentication/firebase.init";
import { useEffect, useState } from "react";
import { UseContext } from "../Context/AuthContext";
import { useAxiosSecure } from "../Hook/useAxiosSecure";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [allProducts, setAllProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [orderCount, setOrderCount] = useState([]);
  const [products, setProducts] = useState([]);
  const [deliveryArea, setDeliveryArea] = useState("outside");
  const axiosSecure = useAxiosSecure();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [latestOrderId, setLatestOrderId] = useState(null);

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const forgetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  // email verification

  const googleProvider = new GoogleAuthProvider();

  // Google login
  const googleLogin = () => {
    return signInWithPopup(auth, googleProvider);
  };

  // Logout
  const UserLogout = () => {
    localStorage.removeItem("access-token");
    return signOut(auth);
  };

  // User observer
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser?.email) {
        try {
          const res = await axiosSecure.post("/jwt", {
            email: currentUser?.email,
          });
            
          if (res.data?.accessToken) {
            localStorage.setItem("access-token", res.data.accessToken);
          }
        } catch (err) {
          if (err) {
            localStorage.removeItem("access-token");
          }
        }
      } else {
        localStorage.removeItem("access-token");
      }

      setLoading(false);
    });

    return () => unsub();
  }, []); // 🔥 axiosSecure dependency remove

  const userInfo = {
    createUser,
    signInUser,
    forgetPassword,
    googleLogin,
    UserLogout,
    user,
    loading,
    setAllProducts,
    allProducts,
    setOpen,
    open,
    setOrderCount,
    orderCount,
    setProducts,
    products,
    deliveryArea,
    setDeliveryArea,
    setShowSuccessModal,
    showSuccessModal,
    setLatestOrderId,
    latestOrderId,
  };

  return <UseContext value={userInfo}>{children}</UseContext>;
};

export default AuthProvider;
