import React from 'react';
import './App.css';
import {NavLink, Route} from 'react-router-dom';
import Login from './main/LoginPage/Login';
import Restore from "./main/RestorePage/Restore";
import Register from "./main/RegisterPage/Register";
import Profile from "./main/ProfilePage/Profile";
import NotFound from './main/NotFound/NotFound';

function App() {
    return (
        <div className="App">
         {/*   <NavLink to='/login'>Register</NavLink>*/}
            <Route exact path='/restore' render={() => (<Restore/>)}/>
            <Route exact path='/register' render={() => (<Register/>)}/>
            <Route exact path={['/login', '/']} render={() => (<Login/>)}/>
            <Route exact path='/profile' render={() => (<Profile/>)}/>
            <Route render={() => (<NotFound/>)}/>
        </div>
    );
}

export default App;
