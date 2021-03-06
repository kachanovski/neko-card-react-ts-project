import React from 'react';
import './App.css';
import {HashRouter, Route, Switch} from 'react-router-dom';
import Login from './main/authGroup/LoginPage/Login';
import Restore from "./main/authGroup/RestorePage/Restore";
import Profile from "./main/ProfilePage/Profile";
import NotFound from './main/NotFound/NotFound';
import RestoreChangePassword from "./main/authGroup/RestorePage/RestoreChangePassword";
import {useSelector} from "react-redux";
import {StateType} from "./store/redux-store";
import Preloader from "./Components/Preloader/Preloader";
import Register from './main/authGroup/RegisterPage/Register';
import Cards from "./main/ProfilePage/Packs/Cards/Cards";
import TutorialPage from "./main/ProfilePage/TutorialPage/TutorialPage";


const App = () => {

    const isFetching = useSelector<StateType, boolean>(state => state.isFetching.isFetching)


    return (
        <HashRouter>
            <div className="App">
                {isFetching && <Preloader/>}
                <Switch>
                    <Route path='/restore' render={() => (<Restore isFetching={isFetching}/>)}/>
                    <Route exact path='/register' render={() => (<Register isFetching={isFetching}/>)}/>
                    <Route exact path={['/login', '/']} render={() => (<Login isFetching={isFetching}/>)}/>
                    <Route exact path='/profile' render={() => (<Profile isFetching={isFetching}/>)}/>
                    <Route path='/changePassword' render={() => (<RestoreChangePassword isFetching={isFetching}/>)}/>
                    <Route path='/cards/:packId' render={() => (<Cards/>)}/>
                    <Route path='/learn/:packId' render={() => (<TutorialPage/>)}/>
                    <Route render={() => (<NotFound/>)}/>
                </Switch>
            </div>
        </HashRouter>

    );
}

export default App;
