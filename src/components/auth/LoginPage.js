import React, { useRef, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import "../../css/login/login.css";

function LoginPage() {
  //const usernameRef = useRef();
  const loginEmailRef = useRef();
  const signUpEmailRef = useRef();
  const loginPasswordRef = useRef();
  const signUpPasswordRef = useRef();
  const passwordConfirmRef = useRef();
  const { login, signup, loginErrMsg, signUpErrMsg } = useAuth();
  const [loginError, setLoginError] = useState("");
  const [signUpError, setSignUpError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [signUpLoading, setSignUpLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();

    try {
      setLoginError("");
      setLoginLoading(true);
      await login(loginEmailRef.current.value, loginPasswordRef.current.value);
    } catch (error) {
      setLoginError("Failed to sign in");
      const errorMessage = error.message;
      console.log(errorMessage);
    }

    setLoginLoading(false);
  }
 
  async function handleSignUp(e) {
    e.preventDefault();
    console.log(signUpPasswordRef.current.value)
    if (signUpPasswordRef.current.value !== passwordConfirmRef.current.value) {
      return setSignUpError("Passwords do not match");
    }

    try {
      setSignUpError("");
      setSignUpLoading(true);
      await signup(signUpEmailRef.current.value, signUpPasswordRef.current.value);
    } catch {
      //console.log("dsvdsav")
      setSignUpError("Failed to create an account");
    }

    setSignUpLoading(false);
  }

  return (
    <div className="globalDiv">
      <div className="main">
        <input className="formInput" type="checkbox" id="chk" aria-hidden="true" />

        <div className="signup">
          <form onSubmit={handleSignUp}>
            <label htmlFor="chk" aria-hidden="true">
              Sign up
            </label>   
            {loginErrMsg}         
            <input 
              className="formInput" 
              ref={signUpEmailRef}
              type="email" 
              name="email" 
              placeholder="Email" 
              required 
            />
            <input
              className="formInput"
              type="password"
              name="pswd"
              placeholder="Password"
              required
              minLength="6"
              maxLength="20"
              ref={signUpPasswordRef}
            />
            <input
              className="formInput"
              type="password"
              name="pswd"
              placeholder="Repeat Password"
              required
              ref={passwordConfirmRef}
              minLength="6"
              maxLength="20"
              
            />
            <button disabled={signUpLoading} type="submit" className="formBtn">Sign up</button>
          </form>
        </div>

        <div className="login">
          <form onSubmit={handleLogin}>
            <label htmlFor="chk" aria-hidden="true">
              Login
            </label>
            {signUpErrMsg}
            <input 
              className="formInput" 
              type="email" 
              name="email" 
              placeholder="Email" 
              required 
              ref={loginEmailRef}
            />
            <input
              className="formInput"
              type="password"
              name="pswd"
              placeholder="Password"
              ref={loginPasswordRef}
              minLength="6"
              maxLength="20"
              required
            />
            <button disabled={loginLoading} type="submit" className="formBtn">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
