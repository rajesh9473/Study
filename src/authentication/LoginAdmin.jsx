import { Button } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import baseurl from "../Config";
import { toast } from "react-toastify";
import AdminLogin from '../assets/images/AdminLogin.png'

const LoginAdmin = ({ updateAdminAuth, adminAuth, value }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const onLoginPress = (e) => {
    e.preventDefault();
    const data = { email, password };

    fetch(baseurl + "/api/adminlogin", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
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
            "adminAuth",
            JSON.stringify(result.data._id)
          );
          updateAdminAuth();
          toast.success("Successfully LoggedIn");
          navigate("/admin/pending-work");
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

  return (
    <>
      {adminAuth ? (
        navigate("/admin/dashboard")
      ) : (
        <section className="p-1">
          <div className="grid grid-cols-2 gap-4">
            <div className="hidden lg:block xl:block">
              <img src={AdminLogin} alt="Admin" />
            </div>
            <div className=" grid lg:grid-cols-2">
              <div className=" w-96 my-10 rounded-lg border shadow-xl mx-auto">
                <h1 className="px-5 sm:px-10 mt-5 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                  Admin / Back Office Login
                </h1>
                {/* Form */}
                <form className="w-full px-5 sm:px-10 mt-5">
                  <div className="flex flex-wrap -mx-3 mb-6">
                    {/* email */}
                    <div className="w-full px-3 mb-3">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="email"
                      >
                        Registered Email
                      </label>
                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="email"
                        type="email"
                        placeholder="rohan644@gmail.com"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                      />
                    </div>
                    {/* password */}
                    <div className="w-full px-3 mb-3">
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
                      />
                    </div>
                    <div className="pl-3">
                      <Button
                        type="submit"
                        variant="gradient"
                        color="blue"
                        onClick={(e) => onLoginPress(e)}
                      >
                        <span>Login</span>
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
              <div className="mx-8 place-items-center grid xs:grid-cols-1 text-center sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 py-2">
                <a href="login-student">
                  <Button variant="gradient" color="blue" className="my-2">
                    Student Login
                  </Button>
                </a>
                <a href="login-instructor">
                  <Button variant="gradient" color="blue" className="my-2">
                    Instructor Login
                  </Button>
                </a>
                <a href="login-admin">
                  <Button variant="gradient" color="blue" className="my-2">
                    Back Office Login
                  </Button>
                </a>
                <a href="login-admin">
                  <Button variant="gradient" color="blue" className="my-2">
                    Admin Login
                  </Button>
                </a>
                <a href="login-admin">
                  <Button variant="gradient" color="blue" className="my-2">
                    Super Admin Login
                  </Button>
                </a>
              </div>
            </div>
            <div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default LoginAdmin;
