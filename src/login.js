import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginContext } from "./LoginStatus";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function Login() {
  const [loginDetails, setLoginDetails] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(false);
  //let button_disable = false;
  const [btnDisable, setBtnDisable] = useState(false);
  const [invalidDetails, setInvalidDetails] = useState(false);

  const [wrongDetails, setWrongDetails] = useState(false);

  const { setLoggedIn } = useContext(LoginContext);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (loginDetails.email) {
      setInvalidDetails(false);
    }
    if (loginDetails.password) {
      setInvalidDetails(false);
    }

    if (loginDetails.email && !loginDetails.email.includes("@gmail.")) {
      setErrorMessage(true);
    } else {
      setErrorMessage(false);
    }

    setWrongDetails(false);
  }, [loginDetails.email, loginDetails.password]);

  // if (errorMessage) {
  //   button_disable = true;
  // } else {
  //   button_disable = false;
  // }

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setLoginDetails({ ...loginDetails, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!loginDetails.email || !loginDetails.password) {
      setInvalidDetails(true);
      return;
    }
    if (errorMessage) {
      console.log("not executed...");
      return;
    }
    if (btnDisable) {
      console.log("disabled....");
      return;
    }
    if (loginDetails.email && loginDetails.password) {
      setBtnDisable(true);
      setIsLoading(true);
      axios({
        method: "post",
        url: "/api/login",
        data: JSON.stringify(loginDetails),
      })
        .then((res) => {
          localStorage.setItem(
            "AccessToken",
            JSON.stringify(res.headers.accesstoken)
          );
          localStorage.setItem("IdToken", JSON.stringify(res.headers.idtoken));

          const setHeaders = {
            Authorization: JSON.parse(localStorage.getItem("IdToken")),
            AccessToken: JSON.parse(localStorage.getItem("AccessToken")),
          };
          setLoggedIn(true);
          setIsLoading(false);
          setBtnDisable(false);
          if (res.data.statusCode === "200") {
            axios({
              method: "get",
              url: "/api/me",
              headers: setHeaders,
            })
              .then((res) => {
                console.log(res);

                localStorage.setItem(
                  "name",
                  JSON.stringify(res.data.user.name)
                );
                localStorage.setItem(
                  "email",
                  JSON.stringify(res.data.user.email)
                );

                return navigate("/me");
              })
              .catch((err) => {
                console.log(err);
                return { error: err.message };
              });
          }
        })
        .catch((err) => {
          setBtnDisable(false);
          setIsLoading(false);
          setWrongDetails(true);
          console.log(err.response.data);
          return { error: err.message };
        });
    }
  }

  return (
    <section>
      <form>
        <div className="h-screen flex flex-col items-center justify-center">
          <div className="flex flex-col items-stretch space-y-5">
            <div className="text-2xl font-semibold self-start">
              Sign in to your account.
              {invalidDetails && (
                <p className="mt-2 text-red-600 font-medium antialiased text-sm">
                  Email address or Password is empty....
                </p>
              )}
              {wrongDetails && (
                <p className="mt-2 text-red-600 font-medium antialiased text-sm">
                  Email address or Password is wrong....
                </p>
              )}
            </div>
            <div className="self-start">
              <div className="font-medium antialiased">Email</div>
              <input
                type="email"
                name="email"
                value={loginDetails.email}
                onChange={handleChange}
                className="justify-self-center mt-1 border border-slate-300 rounded p-1 w-80 placeholder-slate-400 focus:outline-none focus:border-cyan-600 focus:ring-1 focus:ring-cyan-600"
              />
              {errorMessage && (
                <p className="text-red-600 font-medium antialiased text-sm">
                  Please enter a valid email address.
                </p>
              )}
            </div>
            <div className="self-start">
              <div className="font-medium antialiased">Password</div>
              <input
                type="password"
                name="password"
                value={loginDetails.password}
                onChange={handleChange}
                className="justify-self-center mt-1 border border-slate-300 focus:border-sky-500 rounded p-1 w-80 placeholder-slate-400 focus:outline-none focus:border-cyan-600 focus:ring-1 focus:ring-cyan-600"
              />
            </div>
            <div>
              <button
                className="bg-cyan-600 hover:bg-cyan-700 py-1 w-80 rounded mt-2 text-white text-lg font-semibold"
                onClick={handleSubmit}
                disabled={btnDisable}
              >
                Login
              </button>
            </div>
            {isLoading && (
              <AiOutlineLoading3Quarters
                className="h-4 w-4 animate-spin text-black self-center"
                size="8px"
              />
            )}
            <div className="self-start">
              <span className="font-medium text-neutral-600 text-sm">
                No Account?
              </span>
              <Link to="/signup">
                <span className="text-base font-semibold text-cyan-600 hover:text-cyan-700">
                  {" "}
                  Sign Up
                </span>
              </Link>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}

export default Login;
