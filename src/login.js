import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login(){

  const [loginDetails, setLoginDetails] = useState({email:'', password:''});
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(false);

  useEffect(()=>{
    if(loginDetails.email && !loginDetails.email.includes("@gmail.")){
      setErrorMessage(true);
    }else{
      setErrorMessage(false);
    }
  },[loginDetails.email]);

  function handleChange(e){
    const name = e.target.name;
    const value = e.target.value;
    setLoginDetails({...loginDetails, [name]:value});
  }

    function handleSubmit(e) {
      if(loginDetails.email && loginDetails.password){
      e.preventDefault();
        axios({
          method: "post",
          url: "/login",
          data: loginDetails,
        })
          .then((res) => {
            console.log(res.data)
            navigate('/home', {state: {name:'Rehman'}});
          })
          .catch((err) => console.log(err));
        }else{
          alert("Email or Password is empty...");
        }
    }

    return (
        <section>
         <form>
          <div className="h-screen flex items-center justify-center">
          <div
            className="bg-white border shadow rounded w-80 py-6 grid justify-items-stretch"
          >
            <p className="justify-self-start mx-4 text-2xl font-semibold">Login!!!</p>
            <input
              type="email"
              placeholder="email" name="email" value={loginDetails.email} onChange={handleChange} className="justify-self-center mt-3 border border-slate-300 rounded p-1 w-72 placeholder-slate-400 focus:outline-none focus:border-cyan-600 focus:ring-1 focus:ring-cyan-600"
            />
            {errorMessage && <p class="mx-4 text-red-600 text-sm">
                Please enter a valid email address.
            </p>
            }
            <input
              type="password"
              placeholder="password" name="password" value={loginDetails.password} onChange = {handleChange} className="justify-self-center mt-5 border border-slate-300 focus:border-sky-500 rounded p-1 w-72 placeholder-slate-400 focus:outline-none focus:border-cyan-600 focus:ring-1 focus:ring-cyan-600"
            />
            <button
              className="justify-self-center font-medium bg-cyan-600 hover:bg-cyan-700 px-8 py-1 rounded mt-5 text-white"
              onClick={handleSubmit}
            >
              Login
            </button>
            <div className="justify-self-start mx-4 mt-4">
              <span className="font-medium text-neutral-600 text-sm">No Account?</span>
              <Link to="/signup"><span className="text-base font-medium text-cyan-600 hover:text-cyan-700"> Sign Up</span></Link>
            </div>
          </div>
        </div>
        </form>
        </section>
      );
}

export default Login;