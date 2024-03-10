"use client";

import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import React from "react";

function SignInButton() {
  const { signInWithGoogle, signOut, user } = useAppContext();

  if (!user) return <button onClick={signInWithGoogle}>Login</button>;

  if (user.photoURL)
    return (
      <button onClick={signOut} className="w-[40px] h-[40px] rounded-full bg-muted overflow-hidden">
        <Image src={user.photoURL} width={40} height={40} alt="" />
      </button>
    );
}

export default SignInButton;
