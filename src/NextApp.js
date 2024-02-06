import "assets/vendors/style";
import { ConnectedRouter } from "connected-react-router";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Provider } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "styles/wieldy.less";
import configureStore, { history } from "./appRedux/store";
import queryClientSettings from "./constants/queryClientSettings";
import App from "./containers/App/index";
import "./firebase/firebase";

const store = configureStore();
const queryClient = new QueryClient(queryClientSettings);

const NextApp = () => (
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route path="/" component={App} />
        </Switch>
      </ConnectedRouter>
    </Provider>
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);

export default NextApp;
