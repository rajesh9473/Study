import { Button } from "@material-tailwind/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import baseurl from "../Config";
import { toast } from "react-toastify";
import { useEffect } from "react";
import StudentImage from "../assets/images/StudentLogin.jpg";
import { MuiOtpInput } from "mui-one-time-password-input";
import axios from "axios";

const LoginStudent = ({ updateAuth, auth }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [MobileOtp, setMobileOtp] = useState(false);
  const [otpCredentials, setOtpCredentials] = useState({});
  // console.log("user Logged In", auth);

  const navigate = useNavigate();

  const sendOtp = async (number) => {
    try {
      const response = await axios.get(baseurl + "/api/otp?number=" + number);
      if (response.status === 200) {
        setMobileOtp(true);
        setOtpCredentials(response.data.data);
        toast.success(`sended otp on number ${number}`);
        setRemainingTime(45);
      }
    } catch (error) {
      console.log(error);
      toast.error("otp send failed");
    }
  };

  const onLoginPress = async (e) => {
    e.preventDefault();

    const formdata = {
      contact: email,
      otp: otp,
      otpid: otpCredentials,
    };
    const urlQuery = new URLSearchParams(formdata).toString();

    try {
      const response = await axios.post(
        baseurl + "/api/studentlogin?" + urlQuery,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response, baseurl + "/api/studentlogin?" + urlQuery);
      if (response.status === 200) {
        const result = response.data;
        // window.localStorage.setItem("auth", JSON.stringify(result.data._id));
        sessionStorage.setItem("auth", JSON.stringify(result.data._id));
        updateAuth();
        toast.success("Successfully LoggedIn");
        navigate("/student/dashboard");
      } else if (response.status === 404) {
        toast.error(`User not found`);
        setMobileOtp(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("no user found");
      setMobileOtp(false);
    }
  };

  // const onLoginPress = (e) => {
  //   e.preventDefault();
  //   const data = { email, password };

  //   fetch(baseurl + "/api/studentlogin", {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(data),
  //   })
  //     .then((res) => {
  //       if (res.ok) {
  //         return res.json();
  //       } else {
  //         return res.json();
  //       }
  //     })
  //     .then((result) => {
  //       //console.log(result);
  //       if (result.status === true && result.code === 200) {
  //         // console.log(result.data);
  //         window.localStorage.setItem("auth", JSON.stringify(result.data._id));
  //         // console.log(result.data);
  //         updateAuth();
  //         toast.success("Successfully LoggedIn");
  //         navigate(
  //           "/student/dashboard"
  //           // , {
  //           //   state: {
  //           //     _id: result.data._id,
  //           //     name: result.data.name,
  //           //     email: result.data.email,
  //           //     contact: result.data.contact,
  //           //   },
  //           // }
  //         );
  //       } else {
  //         toast.error(`${result.message}`);
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  const [otp, setOtp] = React.useState("");

  const handleChange = (newValue) => {
    setOtp(newValue);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // timer function
  const otpExpirationTime = 45; // 45 seconds in milliseconds
  const [remainingTime, setRemainingTime] = useState(otpExpirationTime);

  useEffect(() => {
    if (remainingTime > 0) {
      const timer = setTimeout(() => {
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [remainingTime]);

  const seconds = Math.floor(remainingTime / 1000);
  return (
    <>
      {auth ? (
        navigate("/student/dashboard")
      ) : (
        <section className=" p-1">
          <div className="mx-2 md:mx-5 flex flex-col md:flex-row gap-2 md:gap-5 justify-center md:justify-start py-5">
            <div className="hidden lg:block xl:block w-full">
              <img
                style={{ height: "565px", width: "670px" }}
                src={StudentImage}
                alt=""
              />
            </div>
            <div className="grid place-items-center w-full">
              <div className="w-full sm:px-0 lg:px-20">
                <div className="mx-5 grid xs:grid-cols-2 text-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 py-2">
                  <a href="login-student">
                    <Button
                      variant="gradient"
                      color="blue"
                      className="rounded-full my-2"
                    >
                      Student Login
                    </Button>
                  </a>
                  <a href="login-instructor">
                    <Button
                      variant="gradient"
                      color="blue"
                      className="rounded-full my-2"
                    >
                      Instructor Login
                    </Button>
                  </a>
                  <a href="login-admin">
                    <Button
                      variant="gradient"
                      color="blue"
                      className="rounded-full my-2"
                    >
                      Back Office Login
                    </Button>
                  </a>
                </div>
                <h1 className="px-5 sm:px-10 mt-5 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                  Student Login
                </h1>
                {/* Form */}
                <form className="w-full px-5 sm:px-10 mt-5">
                  <div className="flex flex-wrap -mx-3 mb-6">
                    {/* password */}
                    {MobileOtp ? (
                      <>
                        <div className="w-full px-3 mb-3">
                          <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="password"
                          >
                            Enter Otp&nbsp;&nbsp; {remainingTime}&nbsp;seconds
                          </label>
                          {/* <input
                        className="appearance-none block w-full my-5 bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                      /> */}
                          <MuiOtpInput value={otp} onChange={handleChange} />
                          <div className="pt-5 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-3">
                            <Button
                              type="submit"
                              variant="gradient"
                              color="blue"
                              onClick={(e) => onLoginPress(e)}
                              // onClick={onLoginPress}
                            >
                              <span>Login</span>
                            </Button>
                            <Button
                              variant="text"
                              color="blue"
                              onClick={() => {
                                sendOtp(email);
                              }}
                              disabled={remainingTime < 4 ? false : true}
                              // onClick={onLoginPress}
                            >
                              <span> Resend Otp</span>
                            </Button>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="w-full px-3 mb-3">
                        <label
                          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                          htmlFor="email"
                        >
                          Enter Mobile No.
                        </label>
                        <input
                          className="appearance-none block w-full my-5 bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="email"
                          type="text"
                          placeholder="9999999999"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                          }}
                        />
                        <div className="pt-5">
                          <Button
                            variant="gradient"
                            color="blue"
                            onClick={() => sendOtp(email)}
                            // onClick={onLoginPress}
                          >
                            <span>Continue</span>
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default LoginStudent;
