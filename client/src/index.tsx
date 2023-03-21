import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import { routes } from "./Common/routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Auth0Provider
    domain={process.env.REACT_APP_AUTH_0_DOMAIN || ""}
    clientId={process.env.REACT_APP_AUTH_0_CLIENT_ID || ""}
    authorizationParams={{
      redirect_uri: `${window.location.origin}${routes.requestInfo}`,
    }}
    useRefreshTokens
    cacheLocation="localstorage"
  >
    <BrowserRouter>
      <App />
      <ToastContainer />
    </BrowserRouter>
  </Auth0Provider>
);
