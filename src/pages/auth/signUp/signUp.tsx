import { type FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/input/input";
import { Button } from "@/components/button/button";
import { AppRoutes } from "@/libs/router/appRoutes";

import styles from "@/pages/auth/styles/auth.module.css";

const SignUp: FC = () => {
  const navigate = useNavigate();
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate(AppRoutes.HOME);
  }

  return (
    <main className={styles["sign-up-page"]}>
      <h1 className="visually-hidden">Travel App</h1>
      <form className={styles["sign-up-form"]} autoComplete="off" onSubmit={handleSubmit}>
        <h2 className={styles["sign-up-form__title"]}>Sign Up</h2>
        <Input
          title="Full name"
          isHiddenTitle={false}
          input={{
            "data-test-id":"auth-full-name",
            name: "full-name",
            type: "text",
            required: true
          }}
        />
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
            autoComplete: "new-password",
            name: "password",
            maxLength: 20,
            minLength: 3,
            type: "password",
            required: true
          }}
        />
        <Button data-test-id="auth-submit" type="submit">
          Sign Up
        </Button>
      </form>
      <span>
        Already have an account?&nbsp;
        <Link
          data-test-id="auth-sign-in-link"
          to={AppRoutes.SIGN_IN}
          className={styles["sign-up-form__link"]}
        >
          Sign In
        </Link>
      </span>
    </main>
  )
}

export { SignUp };
