import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { isSignedId } from "./services/security";

function PrivateRoute({ children, ...rest }) {
    if(isSignedId()) {
      return <Route {...rest}>{children}</Route>;
    } else{
      return <Redirect to="/" />;
    }
}

function Router() {
  return (
    // Aqui estamos fazendo a renderização das rotas
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>

        <Route path="/register">
          <Register />
        </Route>

        <PrivateRoute path="/home">
          <Home />
        </PrivateRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;