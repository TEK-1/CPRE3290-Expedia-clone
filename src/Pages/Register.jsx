import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { useDispatch, useSelector } from "react-redux";
import { fetch_users, userRigister } from "../Redux/Authantication/auth.action";

const LOCAL_OTP = "123456";
const state = {
  number: "",
  otp: "",
  user_name: "",
  password: "",
  verify: false,
  otpVerify: false,
};

export const Register = () => {
  const [check, setCheck] = useState(state);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let exist = false;
  const { number, otp, verify, otpVerify, user_name, password } = check;

  // store value and getting user to check if the number is exist or not
  const { user, isLoading } = useSelector((store) => {
    return {
      user: store.LoginReducer.user,
      isLoading: store.LoginReducer.isLoading,
    };
  });

  //  check if the user is exist of not
  for (let i = 0; i <= user.length - 1; i++) {
    if (user[i].number === number) {
      exist = true;
      break;
    }
  }

  //  capture
  const handleRegisterUser = async () => {
    let newObj = {
      number,
      user_name,
      password,
      email: "",
      dob: "",
      gender: "",
      marital_status: null,
    };
    try {
      await dispatch(userRigister(newObj));
      setCheck(state);
      navigate("/login", { replace: true });
    } catch (error) {
      document.querySelector("#loginMesageSuccess").innerHTML = "";
      document.querySelector("#loginMesageError").innerHTML =
        "Could not create your account. Make sure the local API is running and try again.";
    }
  };

  //   Verify button
  function handleVerifyNumber() {
    if (number.length === 10) {
      if (exist) {
        document.querySelector("#loginMesageError").innerHTML =
          "User Alredy exist";
        document.querySelector("#loginMesageSuccess").innerHTML = ``;
      } else {
        setCheck({ ...check, verify: true });
        document.querySelector("#loginMesageSuccess").innerHTML = "";
        document.querySelector("#loginMesageError").innerHTML = "";
      }
      //
    } else {
      document.querySelector("#loginMesageSuccess").innerHTML = ``;
      document.querySelector("#loginMesageError").innerHTML =
        "Mobile Number is Invalid !";
    }
  }

  // if the code is verifyed
  function verifyCode() {
    if (otp === LOCAL_OTP) {
      setCheck({ ...check, otpVerify: true });
      document.querySelector("#loginMesageSuccess").innerHTML =
        "Verified successfully";
      document.querySelector("#loginMesageError").innerHTML = "";
      document.querySelector("#loginNumber").style.display = "none";
      document.querySelector("#loginOtp").style.display = "none";
    } else {
      document.querySelector("#loginMesageSuccess").innerHTML = "";
      document.querySelector("#loginMesageError").innerHTML = "Invalid OTP";
    }
  }

  // setting the typed value to the input state
  const handleChangeMobile = (e) => {
    let val = e.target.value;
    setCheck({ ...check, [e.target.name]: val });
  };

  useEffect(() => {
    dispatch(fetch_users);
  }, [dispatch]);

  return (
    <>
      <div className="mainLogin">
        <div className="loginBx">
        <div className="logoImgdivReg"><img className="imglogoReg" src="https://i.postimg.cc/QxksRNkQ/expedio-Logo.jpg':'https://i.postimg.cc/fRx4D7QH/logo3.png" alt="" /></div>

          <div className="loginHead">
          <hr /><hr /><hr />

            <h1>Register</h1>
          </div>
          
          <div className="loginInputB" id="loginNumber">
            <label htmlFor="">Enter Your Number</label>
            <span>
              <input
                type="number"
                readOnly={verify}
                name="number"
                value={number}
                onChange={(e) => handleChangeMobile(e)}
                placeholder="Number"
              />
              <button
                disabled={verify || isLoading}
                onClick={handleVerifyNumber}
                id="nextButton"
              >
                {isLoading ? "Loading..." : "Next"}
              </button>
            </span>
          </div>
          {verify ? (
            <div className="loginInputB" id="loginOtp">
              <label htmlFor="">Enter OTP</label>
              <span>
                <input
                  type="number"
                  name="otp"
                  value={otp}
                  onChange={(e) => handleChangeMobile(e)}
                />
                <button onClick={verifyCode}>Next</button>
              </span>
            </div>
          ) : (
            ""
          )}

          {otpVerify ? (
            <>
              <div className="loginInputB">
                <label htmlFor="">Enter Your Full name</label>
                <span>
                  <input
                    type="text"
                    name="user_name"
                    value={user_name}
                    onChange={(e) => handleChangeMobile(e)}
                  />
                </span>
              </div>
              <div className="loginInputB">
                <label htmlFor="">Your Password</label>
                <span>
                  <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => handleChangeMobile(e)}
                  />
                </span>
              </div>
              <div className="loginInputB">
                <button onClick={handleRegisterUser}>Continue</button>
              </div>
            </>
          ) : (
            ""
          )}

          {isLoading ? <h1>Please wait...</h1> : ""}

          <div className="loginTerms">
          <div className="inpChecbx"><input className="inp" type="checkbox" /> <h2>Keep me signed in</h2></div>
            <p>Selecting this checkbox will keep you signed into your account on this device until you sign out. Do not select this on shared devices.</p>
            <h6>By signing in, I agree to the Expedia <span> Terms and Conditions</span>, <span>Privacy Statement</span> and <span>Expedia Rewards Terms and Conditions</span>.</h6>
          </div>
          <br />
          <p id="loginMesageError" role="alert"></p>
          <p id="loginMesageSuccess" aria-live="polite"></p>
        </div>
      </div>
    </>
  );
};
