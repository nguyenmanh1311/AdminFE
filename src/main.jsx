import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { UserProvider } from "./context/UserContext";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { DataProvider } from "./context/DataProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <UserProvider>
        <DataProvider>
          <App />
        </DataProvider>
      </UserProvider>
    </Provider>
  </React.StrictMode>
);
