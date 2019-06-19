import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  input: {
    margin: theme.spacing(1),
    backgroundColor: '#FCB637',
    color: 'white'
  },
  
}));

function Input(props) {
  const classes = useStyles();

  return (
    <div className={"classes.App-header"}>
      <TextField
      variant="filled"
      label={props.label}
      type={props.type}
      onChange={props.onChange} 
      value={props.value}
      required
      fullWidth
      className={classes.input}
      />
    </div>
    
  );
}

export default Input;