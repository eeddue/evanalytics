"use client";

import { auth } from "@/lib/firebase";
import { GoogleAuthProvider, User, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";

type ContextProps = {
  user: User | null;
  signInWithGoogle: () => void;
  signOut: () => void;
};

const AppContext = createContext<ContextProps>({ user: null, signInWithGoogle: () => {}, signOut: () => {} });

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => setUser(user));
    return unsub;
  }, []);

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
    } catch (error) {}
  };

  const signOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {}
  };

  return <AppContext.Provider value={{ user, signInWithGoogle, signOut }}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
