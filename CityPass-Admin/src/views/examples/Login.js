import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
  NavLink,
} from "reactstrap";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  getAuth,
  // createUserWithEmailAndPassword,
} from "firebase/auth";

import $ from "jquery";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toast";

// import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../../firebase-config";
import React, { useState, useEffect } from "react";

// async function login(e) {
//   e.preventDefault();
//   var email = $("#LoginEmail").val();
//   var password = $("#LoginPassword").val();
//   if (email === "") {
//     document.getElementById("validation").innerHTML =
//       "Please enter user name";
//   } else if (password === "") {
//     document.getElementById("validation").innerHTML =
//       "Please enter user password";
//   } else {
//     try {
//       setLoginError(null);
//       await signInWithEmailAndPassword(auth, loginemail, loginepassword);
//     } catch (e) {
//       setLoginError(e);
//       const errorMessage = e.message;
//       if (errorMessage === "Firebase: Error (auth/user-not-found).") {
//         document.getElementById("validation").innerHTML =
//           "User does not exist";
//       } else {
//         document.getElementById("validation").innerHTML =
//           "Invalid user password";
//       }
//     }
//   }
// }

const Login = () => {
  const [name, setName] = useState();
  const [password, setPassword] = useState();
  const [loginError, setLoginError] = useState("");
  const auth = getAuth();
  useEffect(()=>{
    if(localStorage.getItem("auth") != null){
      window.location = "/admin/index";
    }
    
  },[]);


  


  const signIn = async (e) => {
    e.preventDefault();

    // const q = query(collection(db, "SuperAdmin"));
    // const querySnapshot = await getDocs(q);

    // querySnapshot.forEach((doc) => {
    //   if (name === doc.data().name && password === doc.data().password) {
    //     window.location = "/";
    //   }
    // });

    var email = $("#LoginEmail").val();
    var Password = $("#LoginPassword").val();
    if (email === "") {
      document.getElementById("validation").innerHTML =
        "Please enter user email";
    } else if (Password === "") {
      document.getElementById("validation").innerHTML =
        "Please enter user password";
    } else {
      try {
        setLoginError(null);
        await signInWithEmailAndPassword(auth, name, password);
        localStorage.setItem("auth", auth);
        window.location = "/admin/index";
      } catch (e) {
        setLoginError(e);
        const errorMessage = e.message;
        if (errorMessage === "Firebase: Error (auth/user-not-found).") {
          document.getElementById("validation").innerHTML =
            "User does not exist";
        } else {
          document.getElementById("validation").innerHTML =
            "Invalid user password";
        }
      }
    }
  };

  // const [email, setEmail] = useState('')
  // const auth = getAuth();

  const triggerResetEmail = async (e) => {
    e.preventDefault();
    var email = $("#LoginEmail").val();
    if (email === "") {
      document.getElementById("validation").innerHTML =
        "Please enter user email";
    } else {
      try {
        setLoginError(null);
        await sendPasswordResetEmail(auth, name);
        toast("Password reset Email sent");
        // alert("Password reset Email sent")
        window.location = "/auth/login";
      } catch (e) {
        setLoginError(e);
        const errorMessage = e.message;
        if (errorMessage === "Firebase: Error (auth/user-not-found).") {
          document.getElementById("validation").innerHTML =
            "User does not exist";
        }
      }
    }
    // await sendPasswordResetEmail(auth, name);
    // console.log("Password reset email sent")
  };

  const forgotPassword = (e) => {
    e.preventDefault();
    document.getElementById("validation").innerHTML = "";
    setShow(false);
  };

  const backtologin = () => {
    window.location = "/auth/login";
  };

  const removeValidationMsg = () => {
    document.getElementById("validation").innerHTML = "";
  };

  const [show, setShow] = useState(true);

  return (
    <>
      <Col lg="5" md="7">
        <ToastContainer position="top-center" delay={3000} />
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <p
                id="validation"
                className="textColor"
                style={{ color: "white", backgroundColor: "#ff565f" }}
              ></p>
            </div>
            <Form role="form">
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i
                        style={{ color: "#4f2497" }}
                        className="ni ni-email-83"
                      />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email"
                    type="email"
                    id="LoginEmail"
                    autoComplete="new-email"
                    onClick={removeValidationMsg}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </InputGroup>
              </FormGroup>
              {show ? (
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i
                          style={{ color: "#4f2497" }}
                          className="ni ni-lock-circle-open"
                        />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Password"
                      type="password"
                      id="LoginPassword"
                      autoComplete="new-password"
                      onClick={removeValidationMsg}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                  </InputGroup>
                </FormGroup>
              ) : null}

              <div className="text-center">
                {show ? (
                  <Button
                    className="my-4"
                    type="button"
                    style={{ backgroundColor: "#4f2497" }}
                  >
                    <div
                      onClick={signIn}
                      className="text-secondary"
                      to="/"
                      tag={Link}
                    >
                      <span className="">Sign in</span>
                    </div>
                  </Button>
                ) : null}

                {show ? (
                  <Button className="my-4" type="button">
                    <div onClick={forgotPassword} to="/" tag={Link}>
                      <span style={{ color: "#4f2497" }}>Forgot password?</span>
                    </div>
                  </Button>
                ) : null}
                {show ? null : (
                  <Button
                    style={{ backgroundColor: "#4f2497", color: "white" }}
                    type="button"
                    onClick={backtologin}
                  >
                    Back
                  </Button>
                )}
                {show ? null : (
                  <Button
                    style={{ backgroundColor: "red", color: "white" }}
                    type="button"
                    onClick={triggerResetEmail}
                  >
                    Reset Password
                  </Button>
                )}
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default Login;
