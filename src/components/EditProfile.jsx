import React, { Component } from 'react';
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
});

class EditProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email : "",
            password : "",
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
        const { email, password, name } = this.state;

        var user = auth.currentUser;
        user.updateProfile({
          displayName: name,
          email: email
        }).then(() => {
          // Update successful.
          console.log(user.displayName);
          // alert("successful");
          this.props.history.push('/userprofile');
        }).catch(function(error) {
          alert("error");
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
                          <form onSubmit={this.onSubmit} autoComplete="off">
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
                              <TextField
                                id="password"
                                label="Password:"
                                className={classes.textField}
                                value="******"
                                onChange={this.handleChange('password')}
                                margin="normal"
                                type="password"
                              />
                              <br />
                              <Button color="primary" type="button" onClick={() => this.props.history.push('/userprofile')}>Cancel edit</Button>
                              <Button color="primary" type="submit">Save change</Button>
                            </form>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(EditProfile);
