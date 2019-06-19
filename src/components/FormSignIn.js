import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import withFirebaseAuth from 'react-with-firebase-auth';
import firebase from "../firebaseConfig";
import Input from '../components/Input';
import Button from '../components/Button';
import Home from '../pages/Home';

const firebaseAppAuth = firebase.auth();
const database = firebase.firestore();

class FormSingIn extends React.Component{
  constructor(props){
    super();
    this.state = {
      email: '',
      password: '',
    };
  } 
  
  handleChange = (event, element) => {
    const newState = this.state;
    newState[element] = event.target.value
    this.setState(newState);
  }

  signIn = () => {
    const { history: { push } } = this.props;
    this.props.signInWithEmailAndPassword(this.state.email, this.state.password)
    .then((resp) => {
      const id = resp.user.uid;
      database.collection("users").doc(id).get()
        .then(resp => {
          const data = resp.data();
          console.log('entrou')
          push("Salon");
        })
    });
  }

   render() {
    return (
      <div >
        <form className={"container"}>
          <Input
            label="Nome"
            type="text"
            onChange={(e) => this.handleChange(e, "email")} />
          <Input
            label="Senha"
            type="password"
            onChange={(e) => this.handleChange(e, "password")}  />
          <Button text="Entrar" onClick={this.signIn} />
        </form>
      </div>
    );
  }
}
export default withFirebaseAuth({firebaseAppAuth}) (FormSingIn);



