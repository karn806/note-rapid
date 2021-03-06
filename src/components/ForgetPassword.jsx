import React, { Component } from 'react';
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

class ForgetPassword extends Component {

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
        auth.sendPasswordResetEmail(email).then(function() {
          // Email sent.
          alert('Please check your email.')
        }).catch(function(error) {
          // An error happened.
          alert(error);
        });
        this.props.history.push('/');
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    render() {
        const { email, password } = this.state;
        const classes = this.props.classes;
        return (
            <div>
                <Grid container>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <h1>Enter your email here:</h1>
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
                                < br/>
                                <p>
                                  <Button variant="raised" type="button" onClick={() => this.props.history.push('/login')}>
                                    Back to Log in
                                  </Button>
                                </p>
                                <p><Button variant="raised" color="primary" type="submit">Submit</Button></p>
                            </form>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(ForgetPassword);
