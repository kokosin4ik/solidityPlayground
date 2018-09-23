import React, { Component } from "react";
import "./App.css";
import web3 from "./web3";
import lottery from "./lottery";

class App extends Component {
  state = {
    manager: "",
    players: [],
    balance: "",
    value: "",
    message: ""
  };

  async componentDidMount() {
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);
    this.setState({ manager, players, balance });
  }

  onSubmit = async event => {
    event.preventDefault();

    const accounts = await web3.eth.getAccounts();

    this.setState({
      message: "Waiting on transuction success..."
    });

    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.value, "ether")
    });

    this.setState({
      message: "You have been entered."
    });
  };

  onClick = async () => {
    const accounts = await web3.eth.getAccounts();

    this.setState({
      message: "Waiting on transuction success..."
    });

    await lottery.methods.pickWinner().send({
      from: accounts[0]
    });

    this.setState({
      message: "The winner has been picked."
    });
  };

  render() {
    const { players, manager, balance, value } = this.state;
    return (
      <div>
        <h2> Lottery contract </h2>
        <p>
          This contract is managed by {manager}. There are currently{" "}
          {players.length} people entered, competing to win
          {web3.utils.fromWei(balance, "ether")} ether.
        </p>

        <hr />

        <form onSubmit={this.onSubmit}>
          <h4>Want you try your luck?</h4>
          <div>
            <label>Amount of ether to enter</label>
            <input
              value={value}
              onChange={event => this.setState({ value: event.target.value })}
            />
          </div>
          <button>Enter</button>
        </form>

        <hr />

        <h4>Ready to pick a winner</h4>
        <button onClick={this.onClick}>Pick a winner</button>

        <hr />
        <h1>{this.state.message}</h1>
        <hr />
      </div>
    );
  }
}

export default App;
