import React, { Component } from 'react';
import firebase from 'firebase';
import { Link } from 'react-router-dom';
import { auth } from '../firebase';

import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email : "",
            password : ""
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    onSubmit(event) {
        event.preventDefault();
        const { email, password } = this.state;
        auth.signInWithEmailAndPassword(email, password)
        .then(authUser => {
            console.log(authUser);
        })
        .catch(authError => {
            alert(authError);
        });
    }

    fbLogin(event){
      event.preventDefault();
      var provider = new firebase.auth.FacebookAuthProvider();
      auth.signInWithPopup(provider).then(function(result) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
    }

    ggLogin(event){
      event.preventDefault();
      var provider = new firebase.auth.GoogleAuthProvider();
      auth.signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    render() {
        const { email, password } = this.state;
        // classes  -> property injected by withStyles
        const classes = this.props.classes;
        return (
            <Grid container>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <h1>Log in</h1>
                        <form onSubmit={this.onSubmit} autoComplete="off">
                            <TextField
                              id="email"
                              label="Email"
                              className={classes.textField}
                              value={email}
                              onChange={this.handleChange('email')}
                              margin="normal"
                              type="email"
                            />
                            <br />
                            <TextField
                              id="password"
                              label="Password"
                              className={classes.textField}
                              value={password}
                              onChange={this.handleChange('password')}
                              margin="normal"
                              type="password"
                            />
                            <br />
                            <Button variant="raised" color="primary" type="submit">Log in</Button>
                            <p>
                            <Button variant="raised" color="primary" onClick={this.fbLogin}>Log in with FB</Button>
                            <Button variant="raised" color="primary" onClick={this.ggLogin}>Log in with Google</Button>
                            </p>
                        </form>
                        <p>Don't have an account? <Link to="/signup">Sign up here</Link></p>
                    </Paper>
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(Login);
