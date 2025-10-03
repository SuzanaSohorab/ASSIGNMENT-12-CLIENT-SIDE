import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { 
    createUserWithEmailAndPassword, 
    onAuthStateChanged, 
    signInWithEmailAndPassword, 
    signOut as firebaseSignOut,
    GoogleAuthProvider,
    signInWithPopup
} from 'firebase/auth';
import { auth } from '../../Firebase/firebase.init';
import axios from 'axios';


const googleProvider =new GoogleAuthProvider();
const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const signIn = (email, password,currentUser) => {
        setLoading(true);
        
        if (currentUser?.email) {
  const userData = { email: currentUser.email };

  axios.post('https://assignment-12-server-side-gilt.vercel.app/jwt', userData, {
    withCredentials: true
  })
  .then(res => {
    console.log('JWT token set in cookie:', res.data);
  })
  .catch(error => console.error('JWT error', error));
}

        return signInWithEmailAndPassword(auth, email, password);
    };
    const signWithGoogle =(currentUser) =>{
        setLoading(true);
        if (currentUser?.email) {
  const userData = { email: currentUser.email };

  axios.post('https://assignment-12-server-side-gilt.vercel.app/jwt', userData, {
    withCredentials: true
  })
  .then(res => {
    console.log('JWT token set in cookie:', res.data);
  })
  .catch(error => console.error('JWT error', error));
}

        return signInWithPopup(auth,googleProvider)

    }

    const logout = () => {
        return firebaseSignOut(auth);
    };
    
   useEffect(() => {
  const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
    if (currentUser) {
      try {
        // fetch mongo user by email
        const res = await axios.get(
          `https://assignment-12-server-side-gilt.vercel.app/users/${currentUser.email}`
        );
        const mongoUser = res.data; // should include _id, membership, role, etc.

        // merge firebase + mongo
        setUser({
          uid: currentUser.uid,
          email: currentUser.email,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL,
          _id: mongoUser?._id,                    // ✅ now you have _id
          membership: mongoUser?.membership || "Free",
          role: mongoUser?.role || "user",
        });
      } catch (err) {
        console.error("Error fetching Mongo user:", err);

        // fallback → only Firebase data
        setUser({
          uid: currentUser.uid,
          email: currentUser.email,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL,
        });
      }
    } else {
      setUser(null);
    }

    setLoading(false);

    // JWT handling (keep your existing code)
    if (currentUser?.email) {
      const userData = { email: currentUser.email };
      axios
        .post("https://assignment-12-server-side-gilt.vercel.app/jwt", userData, {
          withCredentials: true,
        })
        .then((res) => {
          console.log("token after jwt", res.data);
        })
        .catch((error) => console.log(error));
    }
  });

  return () => {
    unSubscribe();
  };
}, []);



    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        logout,
        signWithGoogle,
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
