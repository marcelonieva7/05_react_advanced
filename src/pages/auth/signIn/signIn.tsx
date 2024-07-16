import { type FC } from "react";
import { type UserSignInRequestDto } from "@/@types/api";
import { Link } from "react-router-dom";
import { Input } from "@/components/input/input";
import { Button } from "@/components/button/button";
import { AppRoutes } from "@/libs/router/appRoutes";
import { useAppSelector } from "@/hooks/useAppSelector";
import { DataStatus } from "@/constants/redux";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { authActions } from "@/libs/redux/slices/auth/auth";

import styles from "@/pages/auth/styles/auth.module.css";

const SignIn: FC = () => {
  const { dataStatus : authDataStatus } = useAppSelector(({ auth }) => auth);
  const isLoading = authDataStatus === DataStatus.PENDING;
  const dispatch = useAppDispatch();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries()) as UserSignInRequestDto;

    dispatch(authActions.signIn(payload));
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
        <Button
          data-test-id="auth-submit"
          type="submit"
          disabled={isLoading}
        >
          { isLoading ? "Loading..." : "Sign In" }
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
