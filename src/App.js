import classes from "./App.module.css";
import { Route, Switch} from "react-router-dom";
import Layout from "./components/layout/Layout";

import Login from './components/Login';
import { ConnectButton } from "@rainbow-me/rainbowkit";
import CreateProfile from './pages/CreateProfile';
import CreatePost from './pages/CreatePost';
import DisplayBlogs from './pages/DisplayBlogs'
 import ShowProfiles from './pages/ShowProfiles'
function App() {


  return (
    <div className="App">
      <header className={classes.header}>
        <ConnectButton />

        <Login className={classes.button} />
      </header>
      <Layout>
        <Switch>
          <Route path="/" exact={true}>
            <DisplayBlogs />
          </Route>
          <Route path="/post">
            <CreatePost />
          </Route>
          <Route path="/createProfile">
            <CreateProfile />
          </Route>
          <Route path="/profile/:handle"  ><ShowProfiles />          </Route>

        </Switch>
      </Layout>
    </div>
  );
}

export default App;
