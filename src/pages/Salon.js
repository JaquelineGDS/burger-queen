import React from 'react';
import { Link } from 'react-router-dom';
import firebase from "../firebaseConfig";
import Grid from '@material-ui/core/Grid';
import '../App.css';

class Salon extends React.Component {

  render() {
    return (
      <React.Fragment>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <nav class="header-nav">
              <figure class="header-nav-avatar">
              </figure>
              <h5 className="text-logo">Burger Queen</h5>
              <section className='settings'>
                <Link className='link itemLink' to='/newRequest'>Novo Pedido</Link>
              </section>
            </nav>
          </Grid>

          <Grid item xs={12} sm={6}>
           
          </Grid>  
        </Grid>
      </React.Fragment>
    )
  }
}
      
 export default Salon;
      
      
