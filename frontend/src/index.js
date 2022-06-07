import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

// redux
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers/index";
import thunk from "redux-thunk";

// สร้าง store ที่เก็บ reducer และ state ข้อมูลต่างๆ
const store = createStore(
  rootReducer,
  composeWithDevTools()
  // compose(applyMiddleware(thunk))
);

ReactDOM.render(
  <Provider store={store}>
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  </Provider>,
  document.getElementById("root")
);
