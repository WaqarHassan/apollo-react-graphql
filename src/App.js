import React from "react";
import ApolloClient from "apollo-boost";
import "./App.css";
import { ApolloProvider } from "@apollo/react-hooks";
import Job from "./Components/Job";
import JobDetails from "./Components/JobDetails";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
const client = new ApolloClient({
  uri: "https://api.graphql.jobs/"
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="container">
          <Switch>
            <Route path="/jobs/:job_slug/:company_slug">
              <JobDetails />
            </Route>
            <Route path="/">
              <Job />
            </Route>
          </Switch>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
