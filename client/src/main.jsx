import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Layout from "./components/Layout";
import "./index.css";

import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "./redux/store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider {...{ store }}>
    <BrowserRouter>
      <Layout>
        <App />
      </Layout>
    </BrowserRouter>
  </Provider>
);
