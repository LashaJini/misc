import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./containers/App/App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";

import { Provider } from "react-redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import { rootReducer } from "./store";

let store;
if (process.env.NODE_ENV === "development" && true) {
  const logger = createLogger();

  store = createStore(rootReducer, applyMiddleware(thunkMiddleware, logger));
} else {
  store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
}

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
