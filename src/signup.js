import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SignUp(){
  const [signUpDetails, setSignUpDetails] = useState(
    {
      firstName:'', lastName:'',email:'', password:'', confirmPassword:''
  });

  const [errorMessageEmail, setErrorMessageEmail] = useState(false);
  const [errorMessagePassword, setErrorMessagePassword] = useState(false);

  const navigate = useNavigate();

  function handleChange(e){
    const name = e.target.name;
    const value = e.target.value;
    setSignUpDetails({...signUpDetails, [name]:value});
  }

  function handleSubmit(e) {
    e.preventDefault();
    if(signUpDetails.email && signUpDetails.password && signUpDetails.firstName && signUpDetails.lastName){
      axios({
        method: "post",
        url: "/users",
        data: {
          firstName: signUpDetails.firstName, 
          lastName: signUpDetails.lastName,
          email: signUpDetails.email,
          password: signUpDetails.password
        }
      })
        .then((res) => {
          console.log(res.data)
          navigate('/');
        })
        .catch((err) => console.log(err));
      }
  }

  useEffect(()=>{
    if(signUpDetails.email && !signUpDetails.email.includes("@gmail.")){
      setErrorMessageEmail(true);
    }else{
      setErrorMessageEmail(false);
    }

    if(signUpDetails.password && signUpDetails.confirmPassword && signUpDetails.password !== signUpDetails.confirmPassword){
      setErrorMessagePassword(true);
    }else{
      setErrorMessagePassword(false);
    }
  },[signUpDetails.email, signUpDetails.confirmPassword, signUpDetails.password]);

    return (
    <form>
    <div className="h-screen flex items-center justify-center">
      <div
        className="bg-white border shadow rounded w-80 space-y-5 py-6 grid justify-items-stretch"
      >
        <h2 className="justify-self-start mx-4 text-2xl font-semibold">Welcome!!!</h2>
        <input
          type="text" name="firstName" value={signUpDetails.firstName} onChange={handleChange} placeholder="first name"
          className="justify-self-center border border-slate-300 focus:border-sky-500 rounded p-1 w-72 placeholder-slate-400 focus:outline-none focus:border-cyan-600 focus:ring-1 focus:ring-cyan-600"
        />
        <input
          type="text" name="lastName" value={signUpDetails.lastName} onChange={handleChange} placeholder="last name"
          className="justify-self-center border border-slate-300 focus:border-sky-500 rounded p-1 w-72 placeholder-slate-400 focus:outline-none focus:border-cyan-600 focus:ring-1 focus:ring-cyan-600"
        />
        <input
          type="text" name="email" value={signUpDetails.email} onChange={handleChange} placeholder="email"
          className="justify-self-center border border-slate-300 focus:border-sky-500 rounded p-1 w-72 placeholder-slate-400 focus:outline-none focus:border-cyan-600 focus:ring-1 focus:ring-cyan-600"
        />
        {errorMessageEmail && <p class="mx-4 text-red-600 text-sm">
                Please enter a valid email address.
            </p>
        }
        <input
          type="password" name="password" value={signUpDetails.password} onChange={handleChange} placeholder="password"
          className="justify-self-center border border-slate-300 focus:border-sky-500 rounded p-1 w-72 placeholder-slate-400 focus:outline-none focus:border-cyan-600 focus:ring-1 focus:ring-cyan-600"
        />
        {errorMessagePassword && <p class="mx-4 text-red-600 text-sm">
                Passwords do not match.
            </p>
        }
        <input
          type="password" name="confirmPassword" value={signUpDetails.confirmPassword} onChange={handleChange} placeholder="confirm password"
          className="justify-self-center border border-slate-300 focus:border-sky-500 rounded p-1 w-72 placeholder-slate-400 focus:outline-none focus:border-cyan-600 focus:ring-1 focus:ring-cyan-600"
        />
        <button
          className="justify-self-center bg-cyan-600 hover:bg-cyan-700 px-8 py-1 rounded mt-5 text-white font-medium" onClick={handleSubmit}
        >
          Sign Up
        </button>
      </div>
    </div>
    </form>
    );
}

export default SignUp;