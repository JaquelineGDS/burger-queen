import React, { useState } from 'react';
import {
  deleteProduct,
  totalPrice,
} from './funções/fuçoes';
import { sendOrder } from '../firebase/firebase';
import '../App.css';


const Pedidos = ({ menu, setMenu }) => {
  const [name, setName] = useState('');
  const totalPrecio = totalPrice(setMenu);


  

  return (
    <form className="relative cafedamanha" onSubmit={(e) => {
      e.preventDefault();
      sendOrder(menu, totalPrecio, name, setMenu, setName);
      }}>
      <h5>Nome do cliente:</h5>
      <input type="text" onChange={e => setName(e.currentTarget.value)} />
      <div className="container">
        <div className="row head">
          <span>PRODUTO</span>
          <span>QUANTIDADE</span>
          <span className="col-2">TOTAL($)</span>
          <span className="col-2">DELETAR</span>
        </div>
        {setMenu.map((p, i) => (
          <div>
            <span>{p.item}</span>
            <span>
              <span>{p.amount}</span>
            </span>
            <span className="col-2">{p.amount * p.price}</span>
            <span className="col-2">
              <button type="button" className="sign i" onClick={() => deleteProduct(i, menu)}><i className="fas fa-times" /></button>
            </span>
          </div>
        ))}
        <div className="col-6 total-price">
          <span>TOTAL  &#36; {totalPrecio}.00
          </span>
        </div>
      </div>
      <button type="button" onClick={() => setMenu([])}>Cancelar pedido</button>
      <button type="submit" >Enviar pedido</button>
    </form>
  );
};

export default Pedidos;
