import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import FormSignIn from './FormSignIn';
import FormSignUp from './FormSingUp';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const useStyles = makeStyles(theme => ({
  container: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: "column",
    justifyContent: "center",
    flexWrap: 'wrap',
    alignItems: "center",
    backgroundColor: 'blue',
    position: 'relative'
  },
}));

// const [value, setValue] = React.useState(0);


class FormSingUp extends React.Component {
  constructor(props){
    super();
    this.props = props;
    this.state = {
      tabSelected: 0
    };
  }

  handleChange = (event, newValue) => {
    this.setState({...this.state, tabSelected: newValue });
  }

  render(){
    return (
      <React.Fragment>
          <Tabs value={this.state.tab} onChange={this.handleChange} centered> 
            <Tab label="LOGIN" />
            <Tab label="CADASTRO" />
          </Tabs>  
          {this.state.tabSelected  === 0 &&
            <TabContainer className={"root"}>
              <FormSignIn />
            </TabContainer>
            }
            {this.state.tabSelected  === 1 &&
            <TabContainer className={"root"}>
              <FormSignUp />
            </TabContainer>
            }
        </React.Fragment>
    );
  }
    

}

export default FormSingUp;