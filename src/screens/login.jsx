import React, { Component } from 'react';
import BaseButton, { ButtonStyle, ButtonType } from '../components/button';
import MonthPicker from '../components/datepicker';
import { Grid } from '../components/grid';
import './custom.css';
import logo from './logo.png';

export class Login extends Component {
  state = { rf: '', cpf: '', dateSelected: '', disabled: true };

  handleSubmit(event) {
    alert('A name was submitted: ' + JSON.stringify(this.state));
    event.preventDefault();
  }

  canSubmit() {
    const disabled = this.state.rf && this.state.cpf && this.state.dateSelected;
    disabled
      ? this.setState({ disabled: false })
      : this.setState({ disabled: true });
  }

  onRfChanged(e) {
    this.setState({ rf: e.target.value });
    this.canSubmit();
  }

  onCPFChanged(e) {
    this.setState({ cpf: e.target.value });
    this.canSubmit();
  }

  onDateSelected(date) {
    this.setState({ dateSelected: date });
    this.canSubmit();
  }

  render() {
    return (
      <div className="align-items-center">
        <Grid cols="4 4 4 4" className="container">
          <div>
            <img src={logo} alt="Logo" />
            <p className="blueFont">SERAp</p>
          </div>
          <div>
            <p className="whiteFont">PORTAL IDEP</p>
          </div>
          <div className="card card-login mx-auto card-width mt-4">
            <div className="card-body">
              <form onSubmit={e => this.handleSubmit(e)}>
                <div className="form-group">
                  <input
                    className="form-control"
                    name="rf"
                    id="rf"
                    onChange={e => this.onRfChanged(e)}
                    placeholder={'RF'}
                  />
                </div>
                <div className="form-group">
                  <input
                    className="form-control"
                    name="cpf"
                    id="cpf"
                    onChange={e => this.onCPFChanged(e)}
                    placeholder={'CPF'}
                  />
                </div>
                <div className="form-group">
                  <MonthPicker
                    className="form-control"
                    name="dn"
                    id="dn"
                    placeholder="Mês/Ano de nascimento"
                    onSelect={date => this.onDateSelected(date)}
                  />
                </div>
                <div className="form-group" />
                <BaseButton
                  type={ButtonType.SUBMIT}
                  style={ButtonStyle.Primary}
                  disabled={this.state.disabled}
                  label="Entrar"
                  className="btn-block"
                />
              </form>
            </div>
          </div>
        </Grid>
      </div>
    );
  }
}

export default Login;
