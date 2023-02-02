import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
//import { LoginContext } from "./LoginStatus";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function Login() {
  //navigate to main layout page
  const navigate = useNavigate();
  //email and password field data
  const [loginDetails, setLoginDetails] = useState({ email: "", password: "" });
  //to show error messages for field validations
  const [errorMessage, setErrorMessage] = useState(false);
  // disable button till the response is loaded
  const [btnDisable, setBtnDisable] = useState(false);
  //to show both or either field data is empty
  const [invalidDetails, setInvalidDetails] = useState(false);
  //to show that either email or password entered is wrong
  const [wrongDetails, setWrongDetails] = useState(false);
  //show loading icon till the response is laoded
  const [isLoading, setIsLoading] = useState(false);

  //go to home page if already authenticated
  // useEffect(() => {
  //   if (JSON.parse(localStorage.getItem("Auth"))) {
  //     navigate("/me/home");
  //   }
  // }, [navigate]);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("Auth"))) {
      navigate("/me/home");
    }

    if (loginDetails.email || loginDetails.password) {
      setInvalidDetails(false);
    }

    if (loginDetails.email && !loginDetails.email.includes("@gmail.")) {
      setErrorMessage(true);
    } else {
      setErrorMessage(false);
    }

    setWrongDetails(false);
  }, [loginDetails.email, loginDetails.password, navigate]);

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
      //console.log("not executed...");
      return;
    }
    if (btnDisable) {
      //console.log("disabled....");
      return;
    }
    if (loginDetails.email && loginDetails.password) {
      setBtnDisable(true);
      setIsLoading(true);
      axios({
        method: "post",
        url: "/api/login",
        data: JSON.stringify(loginDetails),
        headers: { "content-type": "application/json" },
      })
        .then((res) => {
          localStorage.setItem(
            "AccessToken",
            JSON.stringify(res.headers.accesstoken)
          );
          localStorage.setItem("IdToken", JSON.stringify(res.headers.idtoken));
          localStorage.setItem("Auth", JSON.stringify(true));
          localStorage.setItem("userEmail", JSON.stringify(loginDetails.email));

          setIsLoading(false);
          setBtnDisable(false);
          navigate("/me/home");
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
                //onClick={(e) => {
                //   localStorage.setItem("Auth", JSON.stringify(true));
                //   localStorage.setItem(
                //     "userEmail",
                //     JSON.stringify("shaik.rehman07@gmail.com")
                //   );
                //   navigate("/me/home");
                // }}
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
