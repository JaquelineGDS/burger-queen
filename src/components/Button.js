import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
    backgroundColor: 'transparent',
    border: '1px solid #FCB637'
  },
}));

export default function Buttons(props) {
  const classes = useStyles();

  return (
    <div>
      <Button 
      variant="contained"  
      fullWidth 
      className={classes.button}
      onClick={props.onClick}>
      {props.text}
     </Button>
    </div>
  )
}