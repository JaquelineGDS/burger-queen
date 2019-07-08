import React from 'react';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import '../App.css';
import menu from '../data/menu.json';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import {
  deleteProduct,
  totalPrice,
} from './funções/fuçoes';
import { sendOrder } from '../firebase/firebase';
import '../App.css';

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

class Salon extends React.Component {
  constructor(props) {
    super();
    this.state = {
      tabSelected: 0,
      setPedido: [],
      pedido: [],
      clientName: "",
      total: 0
    };
  }

  sendProduct = (item, menu) => {
    const itemIndex = menu.findIndex((dataMenu) => {
      return dataMenu.item === item.item
    })
    if (itemIndex < 0) {
      menu.push({ ...item, amount: 1 });
    } else {
      menu[itemIndex].amount += 1;
    }
    const total = totalPrice(menu)
    
    this.setState({
      setPedido: menu, total
    });
  };

  handleChangeTab = (event, newValue) => {
    this.setState({ ...this.state, tabSelected: newValue });
  }

  handleChange = (event, element) => {
    const newState = this.state;
    newState[element]= event.target.value;
    this.setState(newState);
  }

  delEvent = (index, e) => {
    const menu = this.state.setPedido;
    menu.splice(index, 1);
    const total = totalPrice(menu)
    this.setState({
      setPedido: menu, total
    });
  }

  total = (total) => {
   return totalPrice(total);
  }
  reset = () => {
    this.setState({setPedido: []});
  }
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
            <section className="relative cafedamanha">
              <Tabs value={this.state.tabSelected} onChange={this.handleChangeTab} centered>
                <Tab label="Cafe da manhã" />
                <Tab label="Lanche da tarde" />
              </Tabs>
            </section>
            <section>
              {this.state.tabSelected === 0 &&
                <TabContainer className="container">
                  <section className="relative listCafedamanhã">
                    {
                      menu.breakfast.map((item, key) => (
                        <div>
                          <button key={key} className="list-item" onClick={() => this.sendProduct(item, this.state.setPedido)}>
                            {/* <img src={item.img} alt={item.item} className="imageItem" /> */}
                            <h5>{item.item}</h5>
                            <span>R$ {item.price}</span>
                          </button>
                        </div>
                      ))
                    }
                  </section>
                </TabContainer>
              }
            </section>
            <section>
              {this.state.tabSelected === 1 &&
                <TabContainer className="relative cafedamanha">
                  <section className="relative listCafedamanhã">
                    <div>
                      <h4 class="border-bottom">Hamburgers</h4>
                      {
                        menu.allDay.burgers.map((item, key) => (
                          <div key={key} className="list-item">
                            <p>{item.item}</p>
                            <span>R$ {item.price}</span>
                          </div>
                        ))
                      }
                      <button
                        className=""
                      // onClick={this.order}
                      >
                        Adicionar a lista
                      </button>
                    </div>

                    <h4 class="border-bottom">Adicionais</h4>
                    {
                      menu.allDay.extra.map((item, key) => (
                        <div key={key} className="list-item">
                          <p>{item.item}</p>
                          <span>R${item.price}</span>
                        </div>
                      ))
                    }
                    <h4 class="border-bottom">Acompanhamentos</h4>
                    {
                      menu.allDay.Accompaniments.map((item, key) => (
                        <div key={key} className="list-item">
                          <p>{item.item}</p>
                          <span>R${item.price}</span>
                        </div>
                      ))
                    }
                    <h4 class="border-bottom">Bebidas</h4>
                    {
                      menu.allDay.drinks.map((item, key) => (
                        <div key={key} className="list-item">
                          <p>{item.item}</p>
                          <p>{item.amount}ml</p>
                          <span>R${item.price}</span>
                        </div>
                      ))
                    }
                  </section>
                </TabContainer>
              }
            </section>
          </Grid>
          <Grid item xs={12} sm={6}>
            <section className="restaurant-cart-checkout">
              <form className="relative cafedamanha" onSubmit={(e) => {
                e.preventDefault();
                sendOrder(this.state.setPedido, this.state.clientName, this.state.total);
              }}>
                <h5>Nome do cliente:</h5>
                { <input type="text" onChange={(e) => this.handleChange(e, "clientName")} /> }
                <div className="container">
                  <div className="row head">
                    <span>PRODUTO</span>
                    <span>QUANTIDADE</span>
                    <span className="col-2">TOTAL($)</span>
                    <span className="col-2">DELETAR</span>
                  </div>
                  {this.state.setPedido.map((p, i) => (
                    <div>
                      <span>{p.item}</span>
                      <span>
                        <span>{p.amount}</span>
                      </span>
                      <span className="col-2">{p.amount * p.price}</span>
                      <span className="col-2">
                        <button type="button" className="sign i" onClick={() => this.delEvent(i, menu)}><i className="fas fa-times" /></button>
                      </span>
                    </div>
                  ))}
                  <div className="col-6 total-price">
                    <span>TOTAL{this.state.total}.00
          </span>
                  </div>
                </div>
                <button type="button" onClick={() => this.reset()}>Cancelar pedido</button>
                <button type="submit" >Enviar pedido</button>
              </form>
            </section>
          </Grid>
        </Grid>
      </React.Fragment>
    )
  }
}


export default Salon;


