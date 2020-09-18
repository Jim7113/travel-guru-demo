import React, { useContext } from "react";
import { Button, Form, FormControl, Nav, Navbar } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../App";
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../Login/firebase.config";

const Header = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const linkStyle = {
    color: "white",
    fontSize: 23,
    marginRight: 35,
  };

  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }

  let history = useHistory();
  const onHomeBtnClick = () => {
    history.push("/home");
  };

  const handleSignIn = () => {
    history.push("/login");
  };

  const handleSignOut = () => {
    setLoggedInUser({});
    firebase
      .auth()
      .signOut()
      .then((res) => {
        const signedOutUser = {
          name: "",
          email: "",
        };
        setLoggedInUser(signedOutUser);
      })
      .catch((err) => {
        console.log("Logout unsuccessful");
      });
  };

  return (
    <div style={{ margin: "0px 55px 35px" }}>
      <Navbar>
        <Navbar.Brand onClick={onHomeBtnClick}>
          <img
            src="https://i.ibb.co/b3yf84q/Logo.png"
            alt="Logo"
            style={{ width: 150, filter: "invert(100%)" }}
          />
        </Navbar.Brand>
        <Form inline>
          <FormControl
            type="text"
            placeholder="Search your destination"
            className="mr-sm-2"
            style={{ width: 300, backgroundColor: "lightgray" }}
          />
        </Form>
        <Nav className="ml-auto">
          <Nav.Link href="" style={linkStyle}>
            News
          </Nav.Link>
          <Nav.Link href="" style={linkStyle}>
            Destination
          </Nav.Link>
          <Nav.Link href="" style={linkStyle}>
            Blog
          </Nav.Link>
          {loggedInUser.email ? (
            <Nav.Link
              href=""
              style={{ color: "goldenrod", fontSize: 23, marginRight: 35 }}
            >
              {loggedInUser.name}
            </Nav.Link>
          ) : (
            <Nav.Link href="" style={linkStyle}>
              Profile
            </Nav.Link>
          )}
          {loggedInUser.email ? (
            <Button variant="warning" onClick={handleSignOut}>
              SignOut
            </Button>
          ) : (
            <Button variant="warning" onClick={handleSignIn}>
              SignIn
            </Button>
          )}
        </Nav>
      </Navbar>
    </div>
  );
};

export default Header;
