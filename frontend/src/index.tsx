import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./app/App";
import Login from "./pages/LoginPage";
import You from "./pages/YouPage";
import RecipePage from "./pages/RecipePage";
import RecipeDetail from "./pages/RecipeDetailPage";
import reportWebVitals from "./reportWebVitals";
import Register from "./pages/RegisterPage";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/you" element={<You />} />
        <Route path="/recipes" element={<RecipePage />} />
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
