import { type FC } from "react";
import { UserSignUpRequestDto } from "@/@types/api";
import { Link } from "react-router-dom";
import { Input } from "@/components/input/input";
import { Button } from "@/components/button/button";
import { AppRoutes } from "@/libs/router/appRoutes";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { authActions } from "@/libs/redux/slices/auth";
import { DataStatus } from "@/constants/redux";

import styles from "@/pages/auth/styles/auth.module.css";

const SignUp: FC = () => {
  const { dataStatus : authDataStatus } = useAppSelector(({ auth }) => auth);  
  const isLoading = authDataStatus === DataStatus.PENDING;
  const dispatch = useAppDispatch();
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries()) as UserSignUpRequestDto;    

    dispatch(authActions.signUp(payload));
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
            name: "fullName",
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
        <Button
          data-test-id="auth-submit"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Sign Up"}
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
