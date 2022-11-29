import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
  const [signUpDetails, setSignUpDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errorMessageEmail, setErrorMessageEmail] = useState(false);
  const [errorMessagePassword, setErrorMessagePassword] = useState(false);
  let button_disable = false;

  const navigate = useNavigate();

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setSignUpDetails({ ...signUpDetails, [name]: value });
  }

  function handleSubmit(e) {
    if (errorMessageEmail || errorMessagePassword) {
      return;
    }
    e.preventDefault();
    if (
      signUpDetails.email &&
      signUpDetails.password &&
      signUpDetails.firstName &&
      signUpDetails.lastName
    ) {
      axios({
        method: "post",
        url: "/users",
        data: {
          firstName: signUpDetails.firstName,
          lastName: signUpDetails.lastName,
          email: signUpDetails.email,
          password: signUpDetails.password,
        },
      })
        .then((res) => {
          console.log(res.data);
          return navigate("/");
        })
        .catch((err) => {
          return {
            body: `Error: ${err}`,
          };
        });
    }
  }

  useEffect(() => {
    if (signUpDetails.email && !signUpDetails.email.includes("@gmail.")) {
      setErrorMessageEmail(true);
    } else {
      setErrorMessageEmail(false);
    }

    if (
      signUpDetails.password &&
      signUpDetails.confirmPassword &&
      signUpDetails.password !== signUpDetails.confirmPassword
    ) {
      setErrorMessagePassword(true);
    } else {
      setErrorMessagePassword(false);
    }
  }, [
    signUpDetails.email,
    signUpDetails.confirmPassword,
    signUpDetails.password,
  ]);

  if (errorMessageEmail || errorMessagePassword) {
    button_disable = true;
  } else {
    button_disable = false;
  }

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
            {errorMessagePassword && (
              <p className="text-red-600 font-medium antialiased text-sm">
                Passwords do not match.
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
          </div>
          <div>
            <button
              className="w-96 bg-cyan-600 hover:bg-cyan-700 py-1 mt-2 rounded text-white tet-lg font-semibold"
              onClick={handleSubmit}
              disabled={button_disable}
            >
              Sign Up
            </button>
          </div>
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
