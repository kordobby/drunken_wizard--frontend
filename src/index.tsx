import React from "react";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createRoot } from "react-dom/client";

/* Styles settings */
import "./index.css";
import GlobalStyled from "./Components/GlobalStyled/GlobalStyled";

/* Redux-toolkit settings */
import { Provider } from "react-redux";
import { store } from "./redux/configStore";
/* react-query */
import { QueryClient, QueryClientProvider } from "react-query";

/* Router settings */
import { BrowserRouter } from "react-router-dom";

/* Cookies settings */
import { CookiesProvider } from "react-cookie";

const queryClient = new QueryClient();

const rootElement = document.getElementById("root");
const root = createRoot(rootElement as Element);

root.render(
  <CookiesProvider>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <React.StrictMode>
          <GlobalStyled />
          <Provider store={store}>
            <App />
          </Provider>
        </React.StrictMode>
      </BrowserRouter>
    </QueryClientProvider>
  </CookiesProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
