import './App.css';
import Header from './components/header/Header.js'
import SimpleBottomNevigation from './components/Mainnav.js';
import {BrowserRouter, Route,Switch} from "react-router-dom";
import { Container } from '@material-ui/core';

import Trending from "./Pages/Trending/Trending.js";
import Movies from "./Pages/Movies/Movies.js";
import Series from "./Pages/Series/Series.js";
import Search from "./Pages/Search/Search.js";

function App() {
  return (
    <BrowserRouter>
       <Header/>
    <div className="app">
      <Container>
        <Switch>
          <Route path = '/' component = {Trending} exact/>
          <Route path = '/movies' component = {Movies} exact/>
          <Route path = '/series' component = {Series} exact/>
          <Route path = '/search' component = {Search} exact/>
        </Switch>
      </Container>
       </div>

    <SimpleBottomNevigation/>
    </BrowserRouter>
  );
}

export default App;
