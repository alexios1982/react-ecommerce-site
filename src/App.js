import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import Home from "./routes/home/home.component";
import NavigationBar from "./routes/navigationBar/navigationBar.component";
import SignInPage from "./routes/signInPage/signInPage.component";

const ShopPage = () => {
  return (
    <div>
      <h2>Shop Page</h2>
    </div>
  );
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<NavigationBar />}>
        <Route index={true} element={<Home />} />
        <Route path="shop" element={<ShopPage />} />
        <Route path="sign-in" element={<SignInPage />} />
      </Route>
    </Routes>
  );
};

export default App;
