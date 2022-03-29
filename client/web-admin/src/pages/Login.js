import "../App.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../lib/apollo/queries/login";

function Login() {
  const navigate = useNavigate();
  const [login, { data }] = useMutation(LOGIN);
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

  const chemail = (e) => {
    setEmail(e.target.value);
  };
  const chpass = (e) => {
    setPassword(e.target.value);
  };

  const loginforeal = (e) => {
    e.preventDefault();
    const pload = {
      email,
      password,
    };
    console.log(`masuk login`);
    login({ variables: { email: pload.email, password: pload.password } });
  };

  if (data) {
    if (data.login) {
      Swal.showLoading();
      localStorage.access_token = data.login.access_token;
      navigate("/");
    } else {
      Swal.fire({
        icon: "error",
        title: `Invalid email or password!`,
        showConfirmButton: true,
      });
    }
  }

  return (
    <div className="screensize d-flex" style={{ background: "white" }}>
      <div
        className="d-flex flex-column align-items-center justify-content-center w-50 h-100"
        style={{ background: "white" }}
      >
        <img
          src="./image.png"
          alt=""
          style={{ height: "12rem" }}
          className="mb-0 pb-0"
        />
        <h1
          className="mt-0 pt-0 mb-0 pb-0 display-3"
          style={{ color: "black" }}
        >
          Barter-In
        </h1>
        <h5 className="mb-5" style={{ color: "black" }}>
          Admin web
        </h5>
        <p className="mb-0">
          To continue, please Sign In to your admin account.
        </p>
        <div className="mt-0">
          <form id="formlogin" className="mt-0 w-100" onSubmit={loginforeal}>
            <div className="incent2">
              <input
                className="form-control w-100"
                type="text"
                placeholder="email"
                name="email"
                onChange={chemail}
              />
            </div>
            <div className="incent2">
              <input
                type="password"
                placeholder="password"
                name="password"
                onChange={chpass}
                className="form-control w-100"
              />
            </div>
            <div className="incent2">
              <button className="btn btn-dark mb-1" type="submit">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          width: "75%",
          background: "#457B9D",
          borderTopLeftRadius: 10,
          borderBottomLeftRadius: 10,
        }}
      >
        <img src="./Landing_Paage.png" alt=" " style={{ width: "60%" }} />
      </div>
    </div>
  );
}

export default Login;
