import { ConfigProvider } from "antd";
import React, { memo, useEffect } from "react";
import { IntlProvider } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import {
  Route,
  Switch,
  useHistory,
  useLocation,
  useRouteMatch,
} from "react-router-dom";

import { setInitUrl } from "../../appRedux/actions";
import AppLocale from "../../lngProvider";
// import SignIn from "../SignIn";
// import SignUp from "../SignUp";
import MainApp from "./MainApp";

import {
  LAYOUT_TYPE_BOXED,
  LAYOUT_TYPE_FRAMED,
  LAYOUT_TYPE_FULL,
  NAV_STYLE_ABOVE_HEADER,
  NAV_STYLE_BELOW_HEADER,
  NAV_STYLE_DARK_HORIZONTAL,
  NAV_STYLE_DEFAULT_HORIZONTAL,
  NAV_STYLE_INSIDE_HEADER_HORIZONTAL,
  THEME_TYPE_DARK,
} from "../../constants/ThemeSetting";

const RestrictedRoute = ({
  component: Component,
  location,
  authUser,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) => (
      // authUser ? (
      //   <Component {...props} />
      // ) : (
      //   <Redirect
      //     to={{
      //       pathname: "/signin",
      //       state: { from: location },
      //     }}
      //   />
      // )
      <Component {...props} />
    )}
  />
);

const setLayoutType = (layoutType) => {
  if (layoutType === LAYOUT_TYPE_FULL) {
    document.body.classList.remove("boxed-layout");
    document.body.classList.remove("framed-layout");
    document.body.classList.add("full-layout");
  } else if (layoutType === LAYOUT_TYPE_BOXED) {
    document.body.classList.remove("full-layout");
    document.body.classList.remove("framed-layout");
    document.body.classList.add("boxed-layout");
  } else if (layoutType === LAYOUT_TYPE_FRAMED) {
    document.body.classList.remove("boxed-layout");
    document.body.classList.remove("full-layout");
    document.body.classList.add("framed-layout");
  }
};

const setNavStyle = (navStyle) => {
  if (
    navStyle === NAV_STYLE_DEFAULT_HORIZONTAL ||
    navStyle === NAV_STYLE_DARK_HORIZONTAL ||
    navStyle === NAV_STYLE_INSIDE_HEADER_HORIZONTAL ||
    navStyle === NAV_STYLE_ABOVE_HEADER ||
    navStyle === NAV_STYLE_BELOW_HEADER
  ) {
    document.body.classList.add("full-scroll");
    document.body.classList.add("horizontal-layout");
  } else {
    document.body.classList.remove("full-scroll");
    document.body.classList.remove("horizontal-layout");
  }
};

const App = () => {
  const locale = useSelector(({ settings }) => settings.locale);
  const navStyle = useSelector(({ settings }) => settings.navStyle);
  const layoutType = useSelector(({ settings }) => settings.layoutType);
  const themeType = useSelector(({ settings }) => settings.themeType);
  const isDirectionRTL = useSelector(({ settings }) => settings.isDirectionRTL);

  const { authUser, initURL } = useSelector(({ auth }) => auth);
  const dispatch = useDispatch();

  const location = useLocation();
  const history = useHistory();
  const match = useRouteMatch();

  useEffect(() => {
    if (isDirectionRTL) {
      document.documentElement.classList.add("rtl");
      document.documentElement.setAttribute("data-direction", "rtl");
    } else {
      document.documentElement.classList.remove("rtl");
      document.documentElement.setAttribute("data-direction", "ltr");
    }
  }, [isDirectionRTL]);

  useEffect(() => {
    if (locale) document.documentElement.lang = locale.locale;
  }, [locale]);

  useEffect(() => {
    if (themeType === THEME_TYPE_DARK) {
      document.body.classList.add("dark-theme");
    } else if (document.body.classList.contains("dark-theme")) {
      document.body.classList.remove("dark-theme");
    }
  }, [themeType]);

  useEffect(() => {
    if (initURL === "") {
      dispatch(setInitUrl(location.pathname));
    }
  });

  useEffect(() => {
    if (location.pathname === "/") {
      // if (authUser === null) {
      //   history.push("/disease-specific");
      // } else if
      if (initURL === "" || initURL === "/" || initURL === "/signin") {
        history.push("/disease-specific");
      } else {
        history.push(initURL);
      }
    }
  }, [authUser, initURL, location, history]);

  useEffect(() => {
    setLayoutType(layoutType);
    setNavStyle(navStyle);
  }, [layoutType, navStyle]);

  const currentAppLocale = AppLocale[locale.locale];

  return (
    <ConfigProvider
      locale={currentAppLocale.antd}
      direction={isDirectionRTL ? "rtl" : "ltr"}
    >
      <IntlProvider
        locale={currentAppLocale.locale}
        messages={currentAppLocale.messages}
      >
        <Switch>
          {/* <Route exact path="/signin" component={SignIn} />
          <Route exact path="/signup" component={SignUp} /> */}
          <RestrictedRoute
            path={`${match.url}`}
            authUser={authUser}
            location={location}
            component={MainApp}
          />
        </Switch>
      </IntlProvider>
    </ConfigProvider>
  );
};

export default memo(App);
