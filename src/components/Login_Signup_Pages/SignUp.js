import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function SignUp() {
  //sign up page field details
  const [signUpDetails, setSignUpDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  //email validation error msg
  const [errorMessageEmail, setErrorMessageEmail] = useState(false);
  //password matching with confirm password error msg
  const [errorMessagePassword, setErrorMessagePassword] = useState(false);
  //password requirement matching error msg
  const [errorMessagePasswordValidation, setErrorMessagePasswordValidation] =
    useState(false);
  //show loading till repsonse loaded
  const [isLoading, setIsLoading] = useState(false);
  //disable sign up button till response is loading
  const [btnDisable, setBtnDisable] = useState(false);
  //to navigate to login page after sign up success
  const navigate = useNavigate();

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setSignUpDetails({ ...signUpDetails, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (
      errorMessageEmail ||
      errorMessagePassword ||
      errorMessagePasswordValidation
    ) {
      return;
    }
    if (btnDisable) {
      //console.log("disabled....");
      return;
    }
    if (
      signUpDetails.email &&
      signUpDetails.password &&
      signUpDetails.firstName &&
      signUpDetails.lastName
    ) {
      setIsLoading(true);
      setBtnDisable(true);

      axios({
        method: "post",
        url: "/api/signup",
        data: JSON.stringify({
          firstName:
            signUpDetails.firstName.charAt(0).toUpperCase() +
            signUpDetails.firstName.slice(1).toLowerCase(),
          lastName:
            signUpDetails.lastName.charAt(0).toUpperCase() +
            signUpDetails.lastName.slice(1).toLowerCase(),
          email: signUpDetails.email.toLowerCase(),
          password: signUpDetails.password,
        }),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => {
          //console.log(res.data);
          setIsLoading(false);
          setBtnDisable(false);
          if (res.data.successful === true) {
            return navigate("/");
          }
        })
        .catch((err) => {
          setIsLoading(false);
          setBtnDisable(false);
          return { error: err.message };
        });
    }
  }

  useEffect(() => {
    setErrorMessageEmail(
      signUpDetails.email && !signUpDetails.email.includes("@gmail.")
        ? true
        : false
    );

    //password regex
    var regularExpression =
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;

    setErrorMessagePasswordValidation(
      signUpDetails.password && !regularExpression.test(signUpDetails.password)
        ? true
        : false
    );

    setErrorMessagePassword(
      signUpDetails.password &&
        signUpDetails.confirmPassword &&
        signUpDetails.password !== signUpDetails.confirmPassword
        ? true
        : false
    );
  }, [
    signUpDetails.email,
    signUpDetails.confirmPassword,
    signUpDetails.password,
  ]);

  return (
    <form>
      <div className="h-screen flex items-center justify-center">
        <div className="flex flex-col items-start space-y-5">
          <div className="text-2xl font-semibold">Create Account.</div>
          <div className="flex flex-row space-x-8">
            <div>
              <div className="font-medium antialiased">First Name</div>
              <input
                type="text"
                name="firstName"
                value={signUpDetails.firstName}
                onChange={handleChange}
                className="mt-1 border border-slate-300 focus:border-sky-500 rounded p-1 w-44 placeholder-slate-400 focus:outline-none focus:border-cyan-600 focus:ring-1 focus:ring-cyan-600"
              />
            </div>
            <div>
              <div className="font-medium antialiased">Last Name</div>
              <input
                type="text"
                name="lastName"
                value={signUpDetails.lastName}
                onChange={handleChange}
                className="mt-1 border border-slate-300 focus:border-sky-500 rounded p-1 w-44 placeholder-slate-400 focus:outline-none focus:border-cyan-600 focus:ring-1 focus:ring-cyan-600"
              />
            </div>
          </div>
          <div>
            <div className="font-medium antialiased">Email</div>
            <input
              type="text"
              name="email"
              value={signUpDetails.email}
              onChange={handleChange}
              className="w-96 mt-1 border border-slate-300 focus:border-sky-500 rounded p-1 placeholder-slate-400 focus:outline-none focus:border-cyan-600 focus:ring-1 focus:ring-cyan-600"
            />
            {errorMessageEmail && (
              <p className="text-red-600 font-medium antialiased text-sm">
                Please enter a valid email address.
              </p>
            )}
          </div>
          <div>
            <div className="font-medium antialiased">Password</div>
            <input
              type="password"
              name="password"
              value={signUpDetails.password}
              onChange={handleChange}
              className="mt-1 border border-slate-300 focus:border-sky-500 rounded p-1 w-96 placeholder-slate-400 focus:outline-none focus:border-cyan-600 focus:ring-1 focus:ring-cyan-600"
            />
            {errorMessagePasswordValidation && (
              <p className="text-red-600 font-medium antialiased text-sm w-96">
                contains atleast 1 (cap, small, number, special) and length
                should be minimum 8.
              </p>
            )}
          </div>
          <div>
            <div className="font-medium antialiased">Confirm Password</div>
            <input
              type="password"
              name="confirmPassword"
              value={signUpDetails.confirmPassword}
              onChange={handleChange}
              className="mt-1 border border-slate-300 focus:border-sky-500 rounded p-1 w-96 placeholder-slate-400 focus:outline-none focus:border-cyan-600 focus:ring-1 focus:ring-cyan-600"
            />
            {errorMessagePassword && (
              <p className="text-red-600 font-medium antialiased text-sm">
                Passwords do not match.
              </p>
            )}
          </div>
          <div>
            <button
              className="w-96 bg-cyan-600 hover:bg-cyan-700 py-1 mt-2 rounded text-white text-lg font-semibold"
              onClick={handleSubmit}
              disabled={btnDisable}
            >
              Sign Up
            </button>
          </div>
          {isLoading && (
            <AiOutlineLoading3Quarters
              className="h-4 w-4 animate-spin text-black self-center"
              size="8px"
            />
          )}
          <div>
            <span className="font-medium text-neutral-600 text-sm">
              Already have an account?
            </span>
            <Link to="/">
              <span className="text-base font-semibold text-cyan-600 hover:text-cyan-700">
                {" "}
                Sign in
              </span>
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
}

export default SignUp;
