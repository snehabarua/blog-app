"use client";
import React from "react";
import styles from "./login.module.css";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
function Login() {
  const { data, status } = useSession();
  console.log(data, status);
  const router = useRouter();
  if (status === "loading") {
    return <div className={styles.loading}>Loading...</div>;
  }
  if (status === "authenticated") {
    router.push("/");
  }
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.socialButton} onClick={() => signIn("google")}>
          Sign in with Google
        </div>
        <div className={styles.socialButton} onClick={() => signIn("github")}>Sign in with Github</div>
        <div className={styles.socialButton}>Sign in with Facebook</div>
      </div>
    </div>
  );
}

export default Login;
