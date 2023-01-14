import { useState } from "react";

import FormInput from "../FormInput/FormInput.component";
import Button from "../button/button.component";

import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase.utils";

const defaultFormFields = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function SignupForm() {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { name, email, password, confirmPassword } = formFields;

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
    // console.log(formFields);
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("the passwords don't match");
      return;
    }
    try {
      //stiamo chiamando il server google e potrebbe fallire
      //per cui mettiamo tutto dentro un try-catch
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      // console.log("user", user);
      await createUserDocumentFromAuth(user, { name });
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("User already authenticated");
      }
      console.log("user creation encountered an error ", error.message);
    }
    resetFormFields();
  };

  return (
    <div>
      <h1>Sign up with your email and password</h1>
      <form onSubmit={onSubmitHandler}>
        <FormInput
          label="Name"
          type="text"
          required
          onChange={onChangeHandler}
          name="name"
          value={name}
        />
        <FormInput
          label="Email"
          type="email"
          required
          onChange={onChangeHandler}
          name="email"
          value={email}
        />
        <FormInput
          label="Password"
          type="password"
          required
          onChange={onChangeHandler}
          name="password"
          value={password}
        />
        <FormInput
          label="Confirm Password"
          type="password"
          required
          onChange={onChangeHandler}
          name="confirmPassword"
          value={confirmPassword}
        />
        <Button type="submit" buttonType="google">
          Sign Up
        </Button>
      </form>
    </div>
  );
}

export default SignupForm;
