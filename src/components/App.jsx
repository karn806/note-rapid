import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { auth } from '../firebase';

import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import { CircularProgress } from 'material-ui/Progress';
import Button from 'material-ui/Button';
import { Link } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import Main from './Main';
import Login from './Login';
import Signup from './Signup';
import ForgetPassword from './ForgetPassword';
import UserProfile from './UserProfile';
import EditProfile from './EditProfile';

const theme = createMuiTheme();

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            authenticated: false,
            currentUser: null };
        }

    componentWillMount() { auth.onAuthStateChanged(user => {
        if (user) {
            this.setState({
                authenticated: true,
                currentUser: user,
                loading: false },
                () => { this.props.history.push('/') }
            );
        } else {
            this.setState({
                authenticated: false,
                currentUser: null,
                loading: false
            });
        }
        });
    }

    render () {
        const { authenticated, loading } = this.state;
        const content = loading ? (
            <div align="center">
                <CircularProgress size={80} thickness={5} />
            </div>
        ) : (
            <div>
                <PrivateRoute
                    exact
                    path="/"
                    component={Main}
                    authenticated={authenticated}
                    />
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/forgetpassword" component={ForgetPassword} />
                <PrivateRoute
                    exact
                    path="/userprofile"
                    component={UserProfile}
                    authenticated={authenticated}
                    />
                <PrivateRoute
                    exact
                    path="/editprofile"
                    component={EditProfile}
                    authenticated={authenticated}
                    />
            </div>
        );
        return (
            <MuiThemeProvider theme={theme}>
                <div>
                    <AppBar position="static" color="default">
                        <Toolbar>
                            <Typography variant="title" color="inherit">
                                <p>Simple Note</p>
                            </Typography>
                            <p>
                            { authenticated &&
                                <div>
                                <Button><Link to="/">Home</Link></Button>
                                <Button><Link to="/userprofile">My Profile</Link></Button>
                                <Button variant="raised" color="default" onClick={() => auth.signOut()}>Log out</Button>
                                </div>
                            }
                            </p>
                        </Toolbar>
                    </AppBar>
                    { content }
                </div>
            </MuiThemeProvider>
         );
    }
}

export default withRouter(App);
