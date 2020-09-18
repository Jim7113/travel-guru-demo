import React, { useContext, useState } from "react";
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router-dom";

const Login = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }

  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password1: "",
    password2: "",
  });
  const [error, setError] = useState({});

  const handleGoogleSignIn = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        const { displayName, email } = result.user;
        const signedInUser = { name: displayName, email };
        setLoggedInUser(signedInUser);
        history.replace(from);
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError({ google: errorMessage });
        console.log(errorMessage);
      });
  };

  const handleFbSignIn = () => {
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    firebase
      .auth()
      .signInWithPopup(fbProvider)
      .then((result) => {
        const { displayName, email } = result.user;
        const signedInUser = { name: displayName, email };
        setLoggedInUser(signedInUser);
        history.replace(from);
      })
      .catch((error) => {
        let errorMessage = error.message;
        setError({ facebook: errorMessage });
      });
  };

  const handleBlur = (e) => {
    let isFieldValid = true;
    if (e.target.name === "name") {
      isFieldValid = /^([a-zA-Z ]){2,30}$/.test(e.target.value);
      if (!isFieldValid) {
        setError({ name: "Invalid Name" });
      }
    }
    if (e.target.name === "email") {
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
      if (!isFieldValid) {
        setError({ email: "Invalid Email" });
      }
    }
    if (e.target.name === "password1") {
      const isPasswordValid = e.target.value.length > 7;
      const passwordHasNumber = /\d{1}/.test(e.target.value);
      isFieldValid = isPasswordValid && passwordHasNumber;
      if (!isFieldValid) {
        setError({ passwordOne: "Invalid Password" });
      }
    }

    if (e.target.name === "password2") {
      isFieldValid = user.password1 === e.target.value && e.target.value !== "";
      if (!isFieldValid) {
        setError({ passwordTwo: "Passwords don't match" });
      }
    }
    if (isFieldValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
      setError({});
    }
  };
  const handleSubmit = (e) => {
    if (newUser && user.email && user.password1 && user.password2) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password1)
        .then((res) => {
          console.log(res);
          const newUserInfo = { ...user };
          newUserInfo.error = "";
          newUserInfo.success = true;
          setUser(newUserInfo);
          updateUserName(user.name);
          setLoggedInUser({ name: user.name, email: user.email });
          history.replace(from);
        })
        .catch((error) => {
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
        });
    }

    if (!newUser && user.email && user.password1) {
      firebase
        .auth()
        .signInWithEmailAndPassword(user.email, user.password1)
        .then((res) => {
          const newUserInfo = { ...user };
          newUserInfo.error = "";
          newUserInfo.success = true;
          setUser(newUserInfo);
          setLoggedInUser({
            name: res.user.displayName,
            email: res.user.email,
          });
          history.replace(from);
        })
        .catch(function (error) {
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
        });
    }
    e.preventDefault();
  };

  const updateUserName = (name) => {
    const user = firebase.auth().currentUser;

    user
      .updateProfile({
        displayName: name,
      })
      .then(() => {
        console.log("user name added successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="d-flex flex-column align-items-center mh-50">
        <div className="col-md-4 m-auto bg-light border rounded text-muted">
          {user.success && (
            <p className="text-info mt-2">
              {newUser ? "Account created" : "UserLogged In"} successfully
            </p>
          )}
          {user.error && <p className="text-danger mt-2">{user.error}</p>}
          <form
            style={{
              color: "gray",
              textAlign: "left",
              marginTop: 15,
            }}
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            {newUser && (
              <div className="form-group mx-2 mt-2">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Username"
                  onBlur={handleBlur}
                  required
                ></input>
                <p className="text-danger">{error.name}</p>
              </div>
            )}
            <div className="form-group mx-2 mt-2">
              <label htmlFor="Email">Email</label>
              <input
                type="text"
                name="email"
                className="form-control"
                placeholder="Email"
                onBlur={handleBlur}
                required
              ></input>
              <p className="text-danger">{error.email}</p>
            </div>
            <div className="form-group mx-2">
              <label htmlFor="password1">Password</label>
              <input
                type="password"
                name="password1"
                className="form-control"
                placeholder="password"
                onBlur={handleBlur}
                required
              ></input>
              <p className="text-danger">{error.passwordOne}</p>
            </div>
            {newUser && (
              <div className="form-group mx-2">
                <label htmlFor="password2">Confirm Password</label>
                <input
                  type="password"
                  name="password2"
                  className="form-control"
                  placeholder="confirm password"
                  onBlur={handleBlur}
                  required
                ></input>
                <p className="text-danger">{error.passwordTwo}</p>
              </div>
            )}
            <button type="submit" className="btn btn-block btn-warning mb-3">
              {newUser ? "SignUp" : "SignIn"}
            </button>
          </form>
          {newUser ? (
            <p style={{ textAlign: "center" }}>
              Already have an account?{" "}
              <span
                style={{ color: "goldenrod", cursor: "pointer" }}
                onClick={() => {
                  setNewUser(!newUser);
                }}
              >
                SignIn here
              </span>
            </p>
          ) : (
            <p style={{ textAlign: "center" }}>
              Don't have an account?{" "}
              <span
                style={{ color: "goldenrod", cursor: "pointer" }}
                onClick={() => {
                  setNewUser(!newUser);
                }}
              >
                Create an account
              </span>
            </p>
          )}
          <h6 style={{ textAlign: "center" }}>or</h6>
          <div
            style={{
              borderRadius: 15,
              border: "1px solid lightgray",
              cursor: "pointer",
            }}
            onClick={handleGoogleSignIn}
          >
            <img
              src="https://i.ibb.co/nfFSB2Z/google.png"
              alt="google-icon"
              style={{ width: 25, cursor: "pointer", margin: "7px 15px" }}
            ></img>
            <span>Continue With Google</span>
          </div>
          <div
            style={{
              borderRadius: 15,
              border: "1px solid lightgray",
              margin: "15px 0px",
              cursor: "pointer",
            }}
            onClick={handleFbSignIn}
          >
            <img
              src="https://i.ibb.co/3ctgGJd/fb.png"
              alt="facebook-icon"
              style={{ width: 25, cursor: "pointer", margin: "7px 15px" }}
            ></img>
            <span>Continue With Facebook</span>
          </div>
          <p className="bg-danger text-light mt-2 border rounded">
            {error.facebook || error.google}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
