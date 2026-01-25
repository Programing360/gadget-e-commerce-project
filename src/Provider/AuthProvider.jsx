import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../Authentication/firebase.init';
import { useEffect, useState } from 'react';
import { UseContext } from '../Context/AuthContext';


const AuthProvider = ({children}) => {

    const [user,setUser] = useState([])
    const [loading, setLoading] = useState(true) 
    const [allProducts, setAllProducts] = useState([]);
    const [open, setOpen] = useState(false);
    // console.log(wishlistIcon)
    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signInUser = (email, password) => {
        console.log(email, password)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const googleProvider = new GoogleAuthProvider();

  // Google login
  const googleLogin = () => {
    return signInWithPopup(auth, googleProvider);
  };

  // Logout
  const UserLogout = () => {
    return signOut(auth);
  };

  // User observer
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    //   if (currentUser) {
    //     axiosSecure.post("/jwt", { email: currentUser?.email }).then((res) => {
    //       if (res.data?.token) {
    //         localStorage.setItem("access-token", res.data.token);
    //       } else {
    //         localStorage.removeItem("access-token");
    //       }
    //     });
    //   }
      setLoading(false);
    });
    return () => unsub();
  }, []);



    const userInfo ={
        createUser,
        signInUser,
        googleLogin,
        UserLogout,
        user,
        loading,
        setAllProducts,
        allProducts,
        setOpen,
        open
    }
    
    return<UseContext value={userInfo}>{children}</UseContext>;
};

export default AuthProvider;