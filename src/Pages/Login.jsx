import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import { useDispatch, useSelector } from "react-redux";
import { fetch_users, login_user } from "../Redux/Authantication/auth.action";

const LOCAL_OTP = "123456";
const state = {
  number: "",
  otp: "",
  verify: false,
};

export const Login = () => {
  const [check, setCheck] = useState(state);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuth, user, isLoading } = useSelector((store) => {
    return {
      isAuth: store.LoginReducer.isAuth,
      user: store.LoginReducer.user,
      isLoading: store.LoginReducer.isLoading,
    };
  });

  const { number, otp, verify } = check;

  let exist = false;
  let data = {};

  for (let i = 0; i <= user.length - 1; i++) {
    if (user[i].number === number) {
      exist = true;
      data = user[i];
      break;
    }
  }
  // console.log(user)
  //

  function handleVerifyNumber() {
    if (number.length === 10) {
      if (exist) {
        setCheck({ ...check, verify: true });
        document.querySelector("#loginMesageSuccess").innerHTML = "";
        document.querySelector("#loginMesageError").innerHTML = "";
      } else {
        document.querySelector("#loginMesageSuccess").innerHTML = ``;
        document.querySelector("#loginMesageError").innerHTML =
          "User does not exist. Please create an account.";
      }
      //
    } else {
      document.querySelector("#loginMesageSuccess").innerHTML = ``;
      document.querySelector("#loginMesageError").innerHTML =
        "Mobile Number is Invalid !";
    }
  }

  //
  function verifyCode() {
    if (otp === LOCAL_OTP) {
      document.querySelector("#loginMesageSuccess").innerHTML =
        "Verified successfully";
      document.querySelector("#loginMesageError").innerHTML = "";
      dispatch(login_user(data));
    } else {
      document.querySelector("#loginMesageSuccess").innerHTML = "";
      document.querySelector("#loginMesageError").innerHTML = "Invalid OTP";
    }
  }

  //
  const handleChangeMobile = (e) => {
    let val = e.target.value;
    setCheck({ ...check, [e.target.name]: val });
  };
  // console.log(isAuth)

  useEffect(() => {
    dispatch(fetch_users);
  }, [dispatch]);

  useEffect(() => {
    if (isAuth) {
      navigate("/", { replace: true });
    }
  }, [isAuth, navigate]);

  return (
    <>
      <div className="mainLogin">
        <div className="loginBx">
        <div className="logoImgdiv"><img className="imglogo" src="https://i.postimg.cc/QxksRNkQ/expedio-Logo.jpg':'https://i.postimg.cc/fRx4D7QH/logo3.png" alt="" /></div>
           
          <div className="loginHead">
          <hr /><hr /><hr />
            <h1>SignIn</h1>
          </div>
          <div className="loginInputB">
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
                id="nextText"
              >
                {isLoading ? "Loading..." : "SignIn"}
              </button>
            </span>
          </div>
          {verify ? (
            <div className="loginInputB">
              <label htmlFor="">Enter Your OTP</label>
              <span>
                <input
                  type="number"
                  name="otp"
                  value={otp}
                  onChange={(e) => handleChangeMobile(e)}
                />
                <button onClick={verifyCode}>Continue</button>
              </span>
            </div>
          ) : (
            ""
          )}

          <div className="loginTerms">
            {/* <h2>Or USE ARE BUSSINESS ACCOUNT WITH</h2>
                    <p>By proceeding, you agree to MakeMyTrip'sT&Csand Privacy</p> */}
            <Link to="/register">Don't have an Account</Link>
            <Link to="/admin">Admin Login</Link>
            <div className="inpChecbx"><input className="inp" type="checkbox" /> <h2>Keep me signed in</h2></div>
            <p>Selecting this checkbox will keep you signed into your account on this device until you sign out. Do not select this on shared devices.</p>
            <h6>By signing in, I agree to the Expedia <span> Terms and Conditions</span>, <span>Privacy Statement</span> and <span>Expedia Rewards Terms and Conditions</span>.</h6>
          </div>
          <p id="loginMesageError" role="alert"></p>
          <p id="loginMesageSuccess" aria-live="polite"></p>
        </div>
      </div>
    </>
  );
};
