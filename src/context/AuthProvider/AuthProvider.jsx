import React, { useEffect, useMemo, useState } from "react";
import { AuthContext } from "../AuthContext/AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../Firebase/firebase.config";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const registerUserWithEmail = async (email, password) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const signInWithEmail = async (email, password) => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const userSignOut = async () => {
    try {
      return await signOut(auth);
    } catch (error) {
      console.log(error);
    }
  };

  const updateUserProfile = async (profile) => {
    try {
      if (!auth.currentUser) return;
      return await updateProfile(auth.currentUser, profile);
    } catch (error) {
      console.log(error);
    }
  };

  const signInWithGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  //   user observer

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const userInfo = useMemo(
    () => ({
      registerUserWithEmail,
      signInWithEmail,
      signInWithGoogle,
      updateUserProfile,
      userSignOut,
      user,
      loading,
    }),
    [user, loading],
  );

  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
