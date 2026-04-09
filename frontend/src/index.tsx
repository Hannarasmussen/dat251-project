import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Login from "./Login";
import Account from "./account";
import RecipePage from "./RecipePage";
import RecipeDetail from "./RecipeDetail";
import reportWebVitals from "./reportWebVitals";
import Register from "./register";
import Recommend from "./RecommendPage";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/account" element={<Account />} />
        <Route path="/recipes" element={<RecipePage />} />
        <Route path="/Recommend" element={<Recommend />} />
        <Route
          path="/recipes-preview"
          element={<RecipePage requireAuth={false} />}
        />
        <Route path="/recipes/:id" element={<RecipeDetail />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);

reportWebVitals();
