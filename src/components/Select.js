
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function NativeSelects() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    setor: '',
    name: 'cozinha',
  });

  const handleChange = name => event => {
    setState({
      ...state,
      [name]: event.target.value,
    });
    console.log(event.target.value)
  };

  return (
    <div className={classes.root}>
    
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="age-native-helper">Setor</InputLabel>
        <NativeSelect
          value={state.setor}
          onChange={handleChange('setor')}
          input={<Input name="setor" id="setor-native-helper" />}
        >
          <option value=""></option>
          <option value={'cozinha'}>Cozinha</option>
          <option value={'salão'}>Salão</option>
        </NativeSelect>
        </FormControl>
      
    </div>
  );
}