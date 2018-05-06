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

class UserProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email : "",
            password : "",
            name : ""
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    render() {
        const classes = this.props.classes;
        return (
            <div>
                <Grid container>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                        Name: {auth.currentUser.displayName}
                        <br />
                        Email: {auth.currentUser.email}
                        <br />
                        Password: ******
                        <br />
                        <Button color="primary" type="button" onClick={() => this.props.history.push('/editprofile')}>Edit profile</Button>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(UserProfile);
