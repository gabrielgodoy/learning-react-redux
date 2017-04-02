import React from 'react';
import {
  BrowserRouter,
  Route,
} from 'react-router-dom';
import CSSModules from 'react-css-modules';
import styles from './App.scss';

import MainHeader from './components/MainHeader/MainHeader';
import MainNavigation from './components/MainNavigation/MainNavigation';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Courses from './pages/Courses/Courses';
import Topics from './pages/Topics/Topics';

const AppContainer = () => (
  <BrowserRouter>
    <div>
      <MainHeader title="This is the header" />
      <div styleName="container">
        <MainNavigation />
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/courses" component={Courses} />
        <Route path="/topics" component={Topics} />
      </div>
    </div>
  </BrowserRouter>
);

export default CSSModules(AppContainer, styles);
