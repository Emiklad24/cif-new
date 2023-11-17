import React from "react";
import { Route, Switch } from "react-router-dom";
import asyncComponent from "util/asyncComponent";

const App = ({ match }) => {

  return (
    <div className="gx-main-content-wrapper">
      <Switch>

        <Route
          path={`${match.url}disease-specific`}
          component={asyncComponent(() => import("./DiseaseSpecific"))}
        />

      </Switch>
    </div>
  );
};

export default App;
