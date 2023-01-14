import { getRedirectResult } from "firebase/auth";
import { useEffect } from "react";
import {
  signInWithGooglePopup,
  signInWithGoogleRedirect,
  createUserDocumentFromAuth,
  auth,
} from "../../utils/firebase.utils";

import SignupForm from "../../components/signup-form/signup-form.component";

const SignInPage = () => {
  useEffect(() => {
    const loadRedirectAuth = async () => {
      const response = await getRedirectResult(auth);

      if (response) {
        const userDocReference = await createUserDocumentFromAuth(
          response.user
        );
      }
    };
    loadRedirectAuth();
  }, []);

  //signInWithGooglePopup è una funzione asincrona,
  //se vogliamo usare await, dobbiamo definire la funzione
  //logGoogleUser come async
  const loginGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocReference = await createUserDocumentFromAuth(user);
  };

  return (
    <div className="signIn">
      <h1>Sign In page</h1>
      <button onClick={loginGoogleUser}>Log in with google Popup</button>
      <button onClick={signInWithGoogleRedirect}>
        Log in with google Redirect
      </button>
      <SignupForm />
    </div>
  );
};

export default SignInPage;
