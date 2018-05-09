import React, { Component } from 'react';
import { auth, db } from '../firebase';

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

class Signup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email : "",
            password : ""
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    onSubmit(event) {
        event.preventDefault();
        const { email, password, name } = this.state;
        auth.createUserWithEmailAndPassword(email, password)
        .then(() => {
          const user = auth.currentUser;
          user.updateProfile({
            displayName: name,
          }).catch(function(error) {
            console.error();
          });
          // auth().onAuthStateChanged(function(user) {
          //   if (user) {
          //     // User is signed in.
          //     var displayName = user.displayName;
          //     var email = user.email;
          //     var emailVerified = user.emailVerified;
          //     var photoURL = user.photoURL;
          //     var isAnonymous = user.isAnonymous;
          //     var uid = user.uid;
          //     var providerData = user.providerData;
          //     // ...
          //   } else {
          //     // User is signed out.
          //     // ...
          //   }
          auth.currentUser.sendEmailVerification();
          // auth.signOut();
          alert('Email verification sent. Please check your email address!')
        })
        .catch(error => {
          var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode == 'auth/email-already-in-use') {
            alert('This email is already in use.');
          } else {
            alert(errorMessage);
          }
          console.log(error);
        });

    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    render() {
        const { email, password, name } = this.state;
        const classes = this.props.classes;
        return (
            <div>
                <Grid container>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <h1>Sign up</h1>
                            <form onSubmit={this.onSubmit} autoComplete="off">
                                <TextField
                                  id="name"
                                  label="Username"
                                  className={classes.textField}
                                  value={name}
                                  onChange={this.handleChange('name')}
                                  margin="normal"
                                  type="text"
                                />
                                <br />
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
                                <br />
                                <Button variant="raised" color="primary" type="button" onClick={() => this.props.history.push('/login')}>Log in</Button>
                                <Button variant="raised" color="primary" type="submit">Create account</Button>
                            </form>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(Signup);
