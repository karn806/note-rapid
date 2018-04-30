import React, { Component } from 'react';
import { auth, db } from '../firebase';
import { withStyles } from 'material-ui/styles';

import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import List, {
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
} from 'material-ui/List';


const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'left',
        color: theme.palette.text.secondary,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    list: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        maxWidth: 360,
        maxHeight: 200,
        overflow: 'auto',
    },

});

class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            notes : [],
            current : ""
        };
        this.addNote = this.addNote.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillMount() {
        const uid = auth.currentUser.uid;
        let notesRef = db.ref('notes/' + uid).orderByKey().limitToLast(100);
        // .on is like an observer for the particular ref. It will notify if there's a change
        notesRef.on('child_added', snapshot => { // snapshot -> google call new note as new snapshot
            let note = { text: snapshot.val(), id: snapshot.key };
            // if new note is added, it will get notified and refresh the page
            this.setState({ notes: [note].concat(this.state.notes) });
        })
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };


    addNote(e) {
        e.preventDefault();
        const uid = auth.currentUser.uid;
        db.ref('notes/' + uid).push(this.state.current);
        this.setState({ current : "" });
    }

    deleteNote(key) {
        // key.preventDefault();
        console.log("here");
        const uid = auth.currentUser.uid;
        console.log(uid);
        console.log(key);
        db.ref('notes/' + uid + '/' + key).remove();
        // this.setState({ current : "" });
    }

    render() {
        const classes = this.props.classes;
        return (
            <Grid container className={classes.container}>
                <Grid item xs={6}>
                    <Paper className={classes.paper}>
                        <p>Hello, { auth.currentUser.email }</p>
                            <List className={classes.list}>
                                { /* Render the list of messages */
                                    this.state.notes.map( (note,index) =>
                                        <ListItem key={note.id}>
                                            <ListItemText primary={(index+1) + '. ' + note.text}/>
                                            <ListItemSecondaryAction>
                                              <Button type="submit" onSubmit={this.deleteNote(note.id)}>delete</Button>
                                            </ListItemSecondaryAction>
                                        </ListItem> )
                                }
                            </List>
                            <form onSubmit={this.addNote}>
                                <TextField
                                    id="note"
                                    label="Enter new note"
                                    className={classes.textField}
                                    value={this.state.current}
                                    onChange={this.handleChange('current')}
                                    margin="normal"
                                    />
                                <br />
                                <Button variant="raised" color="primary" type="submit">Add</Button>
                            </form>
                    </Paper>
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(Main);
