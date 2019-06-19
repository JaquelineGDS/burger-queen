import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import Home from './pages/Home';
import Kitchen from './pages/Kitchen';
import Salon from './pages/Salon';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#FCB637' }, 
    secondary: { main: '#FCB637' },
  },
  root:{
    color: { main: '#FCB637' },
    display: "flex" 
  }
});
class App extends React.Component {
  render() {
    return (
      <ThemeProvider theme={theme}>  
          <Router>
            <Route path="/" exact component={Home}/>
            <Route path="/Salon"  component={Salon}/>
            <Route path="/Kitchen"  component={Kitchen}/>
          </Router>
    </ThemeProvider>
    );
  }
}

export default App;
