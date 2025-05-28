import React, { useState } from 'react'
import axios from 'axios';
import { useDispatch } from "react-redux";
import {addUser} from "../utils/userSlice";
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Login = () => {
  const [emailId, setEmailId] = useState("rohit@gmail.com");
  const [password, setPassword] = useState("Rohit@123");
  const [errMsg, setErrMsg] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(BASE_URL+"/login", {
        emailId,password
      }, { withCredentials: true });
      dispatch(addUser(res.data));
      return navigate("/");
    } catch (err) {
      setErrMsg(err.response.data);
      console.log(err.message);
    }
  }

  return (
    <div className="flex justify-center my-8">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">Login</legend>

        <label className="label">Email:</label>
        <input type="email" className="input" value={emailId} onChange={(e)=>setEmailId(e.target.value)} />

        <label className="label">Password</label>
        <input type="text" className="input" value={password} onChange={(e) => setPassword(e.target.value)} />
        
        <p className="text-red-600">{errMsg}</p>

        <button className="btn btn-primary mt-4" onClick={handleLogin}>Login</button>
      </fieldset>
    </div>
  );
}

export default Login;