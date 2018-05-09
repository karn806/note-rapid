import React, { Component } from 'react';
import firebase from 'firebase';
import { auth } from '../firebase';
import { Route, withRouter } from 'react-router-dom';

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
  backButton: {
    textAlign: 'left',
    floating: 'right'
  },
  boxleft: {
    textAlign: 'left'
  },

  boxright: {
    textAlign: 'center'
  }
});

class EditProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email : "",
            password : "",
            curPassword : "",
            name : ""
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillMount() {
          this.setState({ email: this.state.email, name: this.state.name });
      }

    onSubmit(event) {
        event.preventDefault();
        const { name } = this.state;

        const user = auth.currentUser;
        user.updateProfile({
          displayName: name
        }).then(() => {
          // Update successful.
          console.log(user.displayName);
          this.setState({ name: name });
          alert("Profile updated!");
          // this.props.history.push('/userprofile');
        }).catch(function(error) {
          alert("error");
        });
    }

    reauthenticate = (currentPassword) => {
      var user = auth.currentUser;
      var cred = firebase.auth.EmailAuthProvider.credential(
          user.email, currentPassword);
      return user.reauthenticateWithCredential(cred);
    }

    changePassword(currentPassword, newPassword){
      this.reauthenticate(currentPassword).then(() => {
        var user = auth.currentUser;
        user.updatePassword(newPassword).then(() => {
          alert("Password updated!");
        }).catch((error) => { console.log(error); });
      }).catch((error) => { console.log(error); });
    }

    changeEmail(currentPassword, newEmail) {
      this.reauthenticate(currentPassword).then(() => {
        var user = auth.currentUser;
        user.updateEmail(newEmail).then(() => {
          alert("Email updated!");
        }).catch((error) => { console.log(error); });
      }).catch((error) => { console.log(error); });
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    render() {
        const { email, password, name, curPassword } = this.state;
        const classes = this.props.classes;
        return (
            <div>
                <Grid container>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                        <div className={classes.boxleft}>
                          <Button className="backButton"
                                  variant="raised"
                                  color="secondary"
                                  type="button"
                                  onClick={() => this.props.history.push('/userprofile')}>back to profile</Button>
                        </div>
                        <div className={classes.boxright}>
                        <form onSubmit={this.onSubmit} autoComplete="off">
                          <h4>Change username</h4>
                            <TextField
                              id="name"
                              label="Name:"
                              className={classes.textField}
                              value={name}
                              onChange={this.handleChange('name')}
                              margin="normal"
                              type="text"
                            />
                            <br />
                            <Button variant="raised" color="primary" type="submit">update profile</Button>
                            <br /><br />
                          </form>
                          <form>
                            <h4>Change Email</h4>
                            <TextField
                              id="curPassword1"
                              label="Current Password:"
                              className={classes.textField}
                              value={curPassword}
                              onChange={this.handleChange('curPassword')}
                              margin="normal"
                              type="password"
                            />
                            <br />
                            <TextField
                              id="email"
                              label="Email:"
                              className={classes.textField}
                              value={email}
                              onChange={this.handleChange('email')}
                              margin="normal"
                              type="email"
                            />
                            <br />
                            <Button variant="raised" color="primary" type="button" onChange={() => this.changeEmail(curPassword, email)}>
                              update email
                            </Button>
                            <br /><br />
                          </form>
                          <form>
                            <h4>Change password</h4>
                            <TextField
                              id="curPassword"
                              label="Current Password:"
                              className={classes.textField}
                              value={curPassword}
                              onChange={this.handleChange('curPassword')}
                              margin="normal"
                              type="password"
                            />
                            <br />
                            <TextField
                              id="password"
                              label="Password:"
                              className={classes.textField}
                              value={password}
                              onChange={this.handleChange('password')}
                              margin="normal"
                              type="password"
                            />
                            <br />
                            <Button variant="raised" color="primary" type="button" onClick={() => this.changePassword(curPassword, password)}>
                              update password
                            </Button>
                          </form>
                        </div>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(EditProfile);
