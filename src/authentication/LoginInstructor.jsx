import { Button } from "@material-tailwind/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import baseurl from "../Config";
import { toast } from "react-toastify";
import { useEffect } from "react";
import TeacherImage from "../assets/images/TeacherLogin.jpg";
import { MuiOtpInput } from "mui-one-time-password-input";
import axios from "axios";

const LoginInstructor = ({ updateInstructorAuth, instructorAuth }) => {
  const [email, setEmail] = useState("");
  const [MobileOtp, setMobileOtp] = useState(false);
  const [otp, setOtp] = React.useState("");
  const [otpCredentials, setOtpCredentials] = useState({});

  const handleChange = (newValue) => {
    setOtp(newValue);
  };
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

  const onLoginPress = (e) => {
    e.preventDefault();
    const credentials = {};
    credentials.contact = email;
    credentials.otp = otp;
    credentials.otpid = otpCredentials;

    const urlQuery = new URLSearchParams(credentials).toString();

    fetch(baseurl + "/api/instructorlogin?" + urlQuery, {
      method: "GET",
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json();
        }
      })
      .then((result) => {
        //console.log(result);
        if (result.status === true && result.code === 200) {
          console.log(result.data._id);
          window.localStorage.setItem(
            "instructorAuth",
            JSON.stringify(result.data._id)
          );
          updateInstructorAuth();
          toast.success("Successfully LoggedIn");
          navigate("/instructor/instructor-dashboard");
        } else {
          toast.error(`${result.message}`);
        }
      })
      .catch((err) => {
        console.log(err);
      });
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

  return (
    <>
      {instructorAuth ? (
        navigate("/instructor/instructor-dashboard")
      ) : (
        <section className=" p-1">
          <div className="mx-2 md:mx-5 flex flex-col md:flex-row gap-2 md:gap-5 justify-center md:justify-start py-5">
            <div className="hidden lg:block xl:block w-full">
              <img
                style={{ height: "565px", width: "670px" }}
                src={TeacherImage}
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
                <h1 className="px-5 sm:px-10 mt-5 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                  Instructor Login
                </h1>
                {/* Form */}
                <form className="w-full px-5 sm:px-10 mt-5">
                  <div className="flex flex-wrap -mx-3 mb-6">
                    {MobileOtp ? (
                      <>
                        <div className="w-full px-3 mb-3">
                          <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="password"
                          >
                            Enter Otp&nbsp;&nbsp; {remainingTime}&nbsp;second
                          </label>

                          <MuiOtpInput value={otp} onChange={handleChange} />
                          <div className="pt-5 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-3">
                            <Button
                              type="submit"
                              variant="gradient"
                              color="blue"
                              onClick={(e) => {
                                onLoginPress(e);
                              }}
                            >
                              <span>Login</span>
                            </Button>
                            <Button
                              variant="text"
                              color="blue"
                              disabled={remainingTime > 5}
                            >
                              <span> Resend Otp</span>
                            </Button>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        {/* email */}
                        <div className="w-full px-3 mb-3">
                          <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="email"
                          >
                            Registered Mobile No
                          </label>
                          <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="email"
                            type="text"
                            placeholder="99XXXXXXXX"
                            value={email}
                            onChange={(e) => {
                              setEmail(e.target.value);
                            }}
                          />
                        </div>
                        {/* password */}
                        {/* <div className="w-full px-3 mb-3">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="password"
                      >
                        Password
                      </label>
                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                      // onKeyDown={(e) => onEnterPress(e)}
                      />
                    </div> */}
                        <div className="pl-3">
                          <Button
                            variant="gradient"
                            color="blue"
                            className="px-10"
                            onClick={(e) => sendOtp(email)}
                          >
                            <span>Continue</span>
                          </Button>
                        </div>
                      </>
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

export default LoginInstructor;
