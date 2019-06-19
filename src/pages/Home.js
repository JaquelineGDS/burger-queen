import React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Input from '../components/Input';
import RadioButton from '../components/RadioButton';
import Button from '../components/Button';
import withFirebaseAuth from 'react-with-firebase-auth';
import firebase from "../firebaseConfig";
import Grid from '@material-ui/core/Grid';
import "../App.css"

const firebaseAppAuth = firebase.auth();
const database = firebase.firestore();

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

class Home extends React.Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      name: '',
      lastName: '',
      email: '',
      password: '',
      typeUser: '',
      tabSelected: 0
    };
  }

  handleChange = (event, element) => {
    const newState = this.state;
    newState[element] = event.target.value;
    this.setState(newState);
  }

  handleChangeTab = (event, newValue) => {
    this.setState({ ...this.state, tabSelected: newValue });
  }

  radioValue = (e) => {
    this.setState({ ...this.state, typeUser: e.target.value });
  }

  signIn = () => {
    this.props.signInWithEmailAndPassword
      (this.state.email, this.state.password)
      .then((resp) => {
        const id = resp.user.uid;
        database.collection("users").doc(id).get()
          .then(resp => {
            const data = resp.data();
            console.log(data.typeUser)
            console.log('entrou')
            this.props.history.push(`/${data.typeUser}`);
          })
      });
  }

  createUser = (e) => {
    this.props.createUserWithEmailAndPassword
      (this.state.email, this.state.password)
      .then(resp => {
        if (resp) {
          const id = resp.user.uid;
          database.collection('users').doc(id).set({
            name: this.state.name,
            lastName: this.state.lastName,
            email: this.state.email,
            typeUser: this.state.typeUser
          })
            .then(() => {
              this.props.history.push(`/${this.state.typeUser}`);
            })
            .catch(error => alert(error));
        }
      })
      .catch(error => alert(error));
  }

  render() {
    return (
      <React.Fragment>
        <Grid spacing={3}>
          <Grid container direction="column" justify="center" alignItems="center"  item xs={12} sm={12}>
            <section>
              <figure className="logo">
                <img src='/images/logo.png' alt='Burguer Queen' />
              </figure>
              <h1 className="text-logo">Burguer Queen</h1>
            </section>
          </Grid>

          <Grid container direction="column" justify="center" alignItems="center" item xs={12} sm={12}>
            <section className="container">
              <Tabs value={this.state.tabSelected} onChange={this.handleChangeTab} centered>
                <Tab label="LOGIN" />
                <Tab label="CADASTRO" />
              </Tabs>
            </section>
            <section>
              {this.state.tabSelected === 0 &&
                <TabContainer className="contaier">
                  <form className="root">
                    <Input
                      label="Nome"
                      type="text"
                      onChange={(e) => this.handleChange(e, "email")} />
                    <Input
                      label="Senha"
                      type="password"
                      onChange={(e) => this.handleChange(e, "password")} />
                    <Button text="Entrar" onClick={this.signIn} />
                  </form>
                </TabContainer>
              }
              {this.state.tabSelected === 1 &&
                <TabContainer>
                  <form>
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
                </TabContainer>
              }
            </section>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}
export default withFirebaseAuth({ firebaseAppAuth })(Home);