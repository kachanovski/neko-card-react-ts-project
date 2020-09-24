import React from 'react';
import './App.css';
import {HashRouter, Route, Switch} from 'react-router-dom';
import Login from './main/authGroup/LoginPage/Login';
import Restore from "./main/authGroup/RestorePage/Restore";
import Register from "./main/authGroup/RegisterPage/Register";
import Profile from "./main/ProfilePage/Profile";
import NotFound from './main/NotFound/NotFound';
import Menu from "./main/Menu/Menu";
import RestoreChangePassword from "./main/authGroup/RestorePage/RestoreChangePassword";

function App() {
    return (
        <HashRouter>
            <div className="App">
                <Menu/>

                <Switch>
                    <Route exact path='/restore' render={() => (<Restore/>)}/>
                    <Route exact path='/register' render={() => (<Register/>)}/>
                    <Route exact path={['/login', '/']} render={() => (<Login/>)}/>
                    <Route exact path='/profile' render={() => (<Profile/>)}/>
                    <Route exact path='/restore/changePassword' render={() => (<RestoreChangePassword/>)}/>
                    <Route render={() => (<NotFound/>)}/>
                </Switch>
            </div>
        </HashRouter>
    );
}

export default App;
