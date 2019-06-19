import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Input from '../components/Input';
import RadioButton from '../components/RadioButton';
import Button from '../components/Button';
import withFirebaseAuth from 'react-with-firebase-auth';
import firebase from "../firebaseConfig";

const firebaseAppAuth = firebase.auth();
const database = firebase.firestore();


class FormSingUp extends React.Component {
  constructor(props){
    super();
    this.props = props;
    
    this.state = {
      name: '',
      lastName: '',
      email: '',
      password: '',
      typeUser: ''
    };
  }

  handleChange = (event, element) => {
    const newState = this.state;
    console.log('newState singUp', newState)
    newState[element] = event.target.value
    this.setState(newState);
  }

  createUser = (e) => {
    const { history: { push } } = this.props;
    e.preventDefault();
    this.props.createUserWithEmailAndPassword
      (this.state.email, this.state.password)
      .then(resp => {
       if(resp){
        const id = resp.user.uid;
        database.collection('users').doc(id).set({
          name: this.state.name,
          lastName: this.state.lastName,
          email: this.state.email,
          typeUser: this.state.typeUser
        })
        .then(() =>{
          alert("usuário criado")
          push("Salon");
         })
         .catch(error => alert(error));;
       }
     })
      .catch(error => alert(error));
   }  

  radioValue = (e) => {
    this.setState({...this.state, typeUser : e.target.value});
  }

  render() {
    return (
     
        <form className={"container"}>
          <Input
            label="Nome"
            type="text"
            onChange={(e) => this.handleChange(e, "name")} 
            value={this.state.name}
          />
          <Input
            label="Sobrenome"
            type="text"
            onChange={(e) => this.handleChange(e, "lastName")}
            value={this.state.lastName}
           />
          <Input
            label="Email"
            type="text"
            onChange={(e) => this.handleChange(e, "email")}
            value={this.state.email}
          />
          <Input
            label="Senha"
            type="password"
            onChange={(e) => this.handleChange(e, "password")}
            value={this.state.password}
          />
          <RadioButton onClick={this.radioValue} onChange={(e) => this.handleChange(e.target.value, 'typeUser')} />
          <Button text="Cadastrar" onClick={this.createUser} />
        </form>
      
    );
  }
}

export default withFirebaseAuth({firebaseAppAuth})(FormSingUp);
