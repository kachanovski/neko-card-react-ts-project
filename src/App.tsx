import React from 'react';
import './App.css';
import {HashRouter, Route, Switch} from 'react-router-dom';
import Login from './main/authGroup/LoginPage/Login';
import Restore from "./main/authGroup/RestorePage/Restore";
import Profile from "./main/ProfilePage/Profile";
import NotFound from './main/NotFound/NotFound';
import Menu from "./main/Menu/Menu";
import RestoreChangePassword from "./main/authGroup/RestorePage/RestoreChangePassword";
import {RegisterWithHookForm} from "./main/authGroup/RegisterPage/RegisterWithHookForm";

const App = () => {
    return (
        <HashRouter>
            <div className="App">
                <Menu/>

                <Switch>
                    <Route path='/restore' render={() => (<Restore/>)}/>
                    <Route exact path='/register' render={() => (<RegisterWithHookForm/>)}/>
                    <Route exact path={['/login', '/']} render={() => (<Login/>)}/>
                    <Route exact path='/profile' render={() => (<Profile/>)}/>
                    <Route path='/changePassword' render={() => (<RestoreChangePassword/>)}/>
                    <Route render={() => (<NotFound/>)}/>
                </Switch>
            </div>
        </HashRouter>

    );
}

export default App;
