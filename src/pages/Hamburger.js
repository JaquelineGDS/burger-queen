import React from 'react';
import '../App.css';
import menu from '../data/menu.json';

class Hamburger extends React.Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      hamburguer: {
        size: "",
        valueSize: 0,
        type: "",
        valueTotal: 0,
        quantity: 0
      }
    };
  }

  IncrementItem = () => {
    this.setState(prevState => {
      if (prevState.quantity < 9) {
        return {
          quantity: prevState.quantity + 1
        }
      } else {
        return null;
      }
    });
  }
  DecreaseItem = () => {
    this.setState(prevState => {
      if (prevState.quantity > 0) {
        return {
          quantity: prevState.quantity - 1
        }
      } else {
        return null;
      }
    });
  }

  ToggleClick = () => {
    this.setState({
      show: !this.state.show
    });
  }

  UpdateValue = (e) => {
    this.setState({ quantity: e.target.value });
  }

  handleChange = (event, element) => {
    const newState = this.state;
    newState[element] = event.target.value;
    this.setState(newState);
  }

  render() {
    return (
      <div>
        <h4 class="border-bottom">Hamburger</h4>
        <p>Tamanho</p>
        {
          menu.allDay.burgerSize.map((item, key) => (
            <div key={key} className="list-item">
              <p>{item.item}</p>
              <span>R$ {item.price}</span>
              <input
                type="radio"
                name="burgerSize"
                value={item.price}
                onChange={(e) => this.handleChange(e, "valueSize")}>
              </input>
            </div>
          ))
        }
        <p>Tipo do Hamburger</p>
        {
          menu.allDay.burgerType.map((item, key) => (
            <div key={key} className="list-item">
              <p>{item}</p>
              <input
                type="radio"
                name="burgerType"
                value={item}
                onChange={(e) => this.handleChange(e, "type")}>
              </input>
            </div>
          ))
        }
        <div>
          <button
            className="btn-icon"
            onClick={this.IncrementItem}>
            +
        </button>
          <input
            className="input"
            value={this.state.quantity}
            onChange={this.UpdateValue} />
          <button
            className="btn-icon"
            onClick={this.DecreaseItem}>
            -
        </button>
        </div>
        <input
          className="input"
          value={this.state.valueTotal}
        />
        <button
          className=""
          onClick={this.clickBuy}>
          Adicionar a lista
      </button>
      </div>
    )
  }
}


export default Hamburger;