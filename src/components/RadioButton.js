import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';

export default function RadioButtonsGroup(props) {
  
  const [value, setValue] = React.useState('kitchen');

  function handleChange(event) {
    setValue(event.target.value);
  }

  return (
    <div className={""}>
        <FormLabel component="legend">Setor</FormLabel>
        <RadioGroup
          aria-label="Setor"
          name="Setor"
          value={value}
          onChange={handleChange}
          onClick={props.onClick}
          row
        >
          <FormControlLabel value="Kitchen" control={<Radio />} label="Cozinha" />
          <FormControlLabel value="Salon" control={<Radio />} label="Salão" />
        </RadioGroup>
    </div>
  );
}