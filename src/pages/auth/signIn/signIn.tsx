import { type FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/input/input";
import { Button } from "@/components/button/button";
import { AppRoutes } from "@/libs/router/appRoutes";

import styles from "@/pages/auth/styles/auth.module.css";

const SignIn: FC = () => {
  const navigate = useNavigate();
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate(AppRoutes.HOME);
  }

  return (
    <main className={styles["sign-in-page"]}>
      <h1 className="visually-hidden">Travel App</h1>
      <form className={styles["sign-in-form"]} autoComplete="off" onSubmit={handleSubmit}>
        <h2 className={styles["sign-in-form__title"]}>Sign In</h2>
        <Input
          title="Email"
          isHiddenTitle={false}
          input={{
            "data-test-id":"auth-email",
            name: "email",
            type: "email",
            required: true
          }}
        />
        <Input
          title="Password"
          isHiddenTitle={false}
          input={{
            "data-test-id":"auth-password",
            /* autoComplete: "new-password", */
            name: "password",
            maxLength: 20,
            minLength: 3,
            type: "password",
            required: true
          }}
        />
        <Button data-test-id="auth-submit" type="submit">
          Sign In
        </Button>
      </form>
      <span>
        Don't have an account?&nbsp;
        <Link
          data-test-id="auth-sign-up-link"
          to={AppRoutes.SIGN_UP}
          className={styles["sign-in-form__link"]}
        >
          Sign Up
        </Link>
      </span>
    </main>
  )
}

export { SignIn };
