import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom';
import store from './store.js';
import { Provider } from 'react-redux';
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import PrivateRoute from "./pages/PrivateRoute.jsx";
import LearnPage from './pages/LearnPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import HelpPage from './pages/HelpPage.jsx';
import Notfound from "./pages/Notfound.jsx";
import './index.css';


const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomePage />}/>
      <Route path='/login' element={<LoginPage />}/>
      <Route path='/register' element={<RegisterPage />}/>
      {/* private routes */}
      <Route path='' element={<PrivateRoute />}>
        <Route path='/learn' element={<LearnPage />}/>
        <Route path='/profile' element={<ProfilePage />}/>
        <Route path='/help' element={<HelpPage />}/> 
        <Route path='/dashboard' element={<DashboardPage />}/> 
      </Route>
      <Route path="*" element={<Notfound />}/>
    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router}/>
    </React.StrictMode>
  </Provider>
);
