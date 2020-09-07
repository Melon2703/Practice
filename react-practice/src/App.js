import React, {Suspense} from 'react';
import './App.css';
import Sidebar from "./components/Sidebar/Sidebar";
import Dialogs from "./components/Dialogs/Dialogs";
import {BrowserRouter, Route,  Redirect} from "react-router-dom";
import Music from "./components/Music/Music";
import News from "./components/News/News";
import Settings from "./components/Settings/Settings";
import Friends from "./components/Friends/Friends";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import {connect, Provider} from "react-redux";
import {initial} from "./Redux/appReducer";
import Preloader from "./components/Common/Preloader/Proloader";
import store from "./Redux/ReduxStore";

const LoginPage = React.lazy(() => import(`./components/Login/LoginPage`) );

class App extends React.Component {

    componentDidMount() {
        //Происходит инициализация, чтолбы не было скачков при загрузке данных.
        this.props.initial()
    }

    render() {

     if(!this.props.initialized) return <Preloader/>

     return (
                <div className='app_wrapper'>

                    <HeaderContainer />

                    <div className='page_content_wrapper'>

                        <Sidebar friends={this.props.state.friendsPage.prev_Friends}/>

                        <div className='content_wrapper'>
                            <Route  path='/messages' render={() => <div>В РАЗРАБОТКЕ</div>}/>

                            <Route  path='/profile/:userId?' render={()=> <ProfileContainer />}/>

                            <Route  path='/music' render={() => <div>В РАЗРАБОТКЕ</div>} />
                            <Route  path='/news' render={() => <div>В РАЗРАБОТКЕ</div>}/>
                            <Route  path='/settings' render={() => <div>В РАЗРАБОТКЕ</div>}/>
                            <Route  path='/friends' render={()=> <Friends />} />
                            <Route path='/users' render={() => <UsersContainer />}/>
                            <Route path='/login' render={() => <Suspense fallback={<div>...Loading</div>}>
                                    <LoginPage />
                                </Suspense>
                                }/>
                                <Route exact path='/' render={()=> <Redirect to='/profile'/>}/>
                        </div>
                    </div>
                </div>
    );
}
}



let mapStateToProps = (state) => ({
    initialized : state.app.initialized
})
let AppWrappedByConnect =  connect(mapStateToProps, {initial})(App);

const ContainerApp = (props) => {
 return <BrowserRouter>
     <Provider store={store}>
         <AppWrappedByConnect state={store.getState()}/>
     </Provider>
 </BrowserRouter>
}

export default ContainerApp;



