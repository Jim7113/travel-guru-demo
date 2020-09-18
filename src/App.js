import React, { createContext, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header/Header";
import Body from "./components/Body/Body";
import NotFound from "./components/NotFound/NotFound";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import BookingInfo from "./components/BookingInfo/BookingInfo";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Login from "./components/Login/Login";
import Suggestion from "./components/Suggestion/Suggestion";

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <div className="App">
        <Router>
          <Header />
          <Switch>
            <Route path="/home">
              <Body />
            </Route>
            <Route path="/destination/:destination_name">
              <BookingInfo />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <PrivateRoute path="/hotels/:destination_name">
              <Suggestion />
            </PrivateRoute>
            <Route exact path="/">
              <Body />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </Router>
      </div>
    </UserContext.Provider>
  );
}

export default App;
