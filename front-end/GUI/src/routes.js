import React from "react";
import { Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage"

// import ArticleList from "./containers/ArticleListView";
// import ArticleDetail from "./containers/ArticleDetailView";
// import Login from "./containers/Login";
// import Signup from "./containers/Signup";

const BaseRouter = () => (
  <div>
    <Route exact path="/" component={HomePage} />{" "}
    <Route exact path="/sv-se/signup/" component={SignupPage} />{" "}
  </div>
);

export default BaseRouter;