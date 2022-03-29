import "../App.css";
import Navcomp from "../components/Navcomp";
import { useState } from "react";
import Swal from "sweetalert2";
import { useMutation } from "@apollo/client";
import { REGISTER2 } from "../lib/apollo/queries/register";

function Registerpage() {
  const [register] = useMutation(REGISTER2);
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [username, setUsername] = useState("");
  let [address, setAddress] = useState("");

  const chemail = (e) => {
    setEmail(e.target.value);
  };
  const chpass = (e) => {
    setPassword(e.target.value);
  };
  const chUsername = (e) => {
    setUsername(e.target.value);
  };
  const chAddress = (e) => {
    setAddress(e.target.value);
  };

  const registernow = (e) => {
    e.preventDefault();

    Swal.fire({
      title: "Submit your credentials",
      html: `<input type="password" id="password5" class="swal2-input" placeholder="Password">`,
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Submit",
      showLoaderOnConfirm: true,
      preConfirm: () => {
        const password2 = Swal.getPopup().querySelector("#password5").value;
        if (!password2) {
          Swal.close();
        }
        if (password2 === process.env.REACT_APP_CREDENTIAL) {
          register({
            variables: {
              newUser: { email, password, username, address, photoUrl: "-" },
              token: localStorage.access_token,
            },
          }).then((iyey) => {
            if (iyey.data.register) {
              Swal.fire({
                icon: "success",
                title: `Account registered.`,
                showConfirmButton: false,
                timer: 1500,
              });
            } else {
              Swal.fire({
                icon: "error",
                title: `Please fill in the form apropriately!`,
                showConfirmButton: false,
              });
            }
          });
        } else {
          Swal.fire({
            icon: "error",
            title: `Wrong credentials`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });
  };

  return (
    <div className="whole">
      <Navcomp></Navcomp>
      <div
        className="main d-flex justifiy-content-start align-items-center"
        style={{ width: "100%" }}
      >
        <div
          className="card text-white mb-3 w-50"
          style={{ background: "white", color: "black", marginTop: "3rem" }}
        >
          <form
            style={{ margin: "7rem", color: "black" }}
            onSubmit={registernow}
          >
            <div className="form-group mb-3">
              <label>Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter the admin's name"
                onChange={chUsername}
              />
            </div>
            <div className="form-group mb-3">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                aria-describedby="emailHelp"
                placeholder="Their email"
                onChange={chemail}
              />
            </div>
            <div className="form-group mb-3">
              <label>Address</label>
              <textarea
                className="form-control"
                aria-describedby="emailHelp"
                placeholder="Their address"
                onChange={chAddress}
              />
            </div>
            <div className="form-group mb-5">
              <label for="exampleInputPassword1">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Their would be password"
                onChange={chpass}
              />
            </div>
            <button type="submit" className="btn btn-primary w-50">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Registerpage;
