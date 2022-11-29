import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [loginDetails, setLoginDetails] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(false);
  let button_disable = false;

  useEffect(() => {
    if (loginDetails.email && !loginDetails.email.includes("@gmail.")) {
      setErrorMessage(true);
    } else {
      setErrorMessage(false);
    }
  }, [loginDetails.email]);

  if (errorMessage) {
    button_disable = true;
  } else {
    button_disable = false;
  }

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setLoginDetails({ ...loginDetails, [name]: value });
  }

  async function handleSubmit(e) {
    if (errorMessage) {
      console.log("not executed...");
      return;
    }

    if (loginDetails.email && loginDetails.password) {
      e.preventDefault();
      const result = await axios({
        method: "post",
        url: "/login",
        data: JSON.stringify(loginDetails),
      })
        .then((res) => {
          console.log(res.data);

          return JSON.stringify(res.data);
        })
        .catch((err) => {
          return JSON.stringify({ error: err.message });
        });

      console.log(result);

      const resultObject = JSON.parse(result);
      return navigate("/home", {
        state: {
          name: resultObject.name,
          email: resultObject.email,
        },
      });
    } else {
      alert("Email or Password is empty...");
    }
  }

  return (
    <section>
      <form>
        <div className="h-screen flex flex-col items-center justify-center">
          <div className="flex flex-col items-start space-y-5">
            <div className="text-2xl font-semibold ">
              Sign in to your account.
            </div>
            <div>
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
            <div>
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
                disabled={button_disable}
              >
                Login
              </button>
            </div>
            <div>
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
