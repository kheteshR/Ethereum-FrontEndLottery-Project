import React, { Component } from 'react';
import logo from './logo.svg';
import web3 from './web3';
import './App.css';
import lottery from './lottery';
console.log("lottery======>>",lottery.methods.manager().call())
class App extends Component{
  // constructor(props){
  // super(props);
  // this.state={manager:''};
  // }
state={
  manager:'',
  players:[],
  balance:'',
  value:'',
  message:'',
  Winner:''
}
  async componentDidMount(){
    const manager =await lottery.methods.manager().call();
    const players =await lottery.methods.getPlayers().call();
    const balance =await web3.eth.getBalance(lottery.options.address);
    console.log("balance==>>",balance)
    this.setState({ manager,players,balance });
   
  }
  onSubmit=async (event)=>{
    event.preventDefault();
    const accounts= await web3.eth.getAccounts();

    this.setState({message:'Waiting on transaction success.....'});

    await lottery.methods.enter().send({
     from:accounts[0],
     value:web3.utils.toWei(this.state.value,'ether')
    });
    this.setState({message:'You have been entered!.....'});

  };
  Click = async ()=>{
  const accounts= await web3.eth.getAccounts();
  this.setState({message:'waiting on transaction success.......'});
  await lottery.methods.pickWinner().send({
    
    from:accounts[0]

  })
  const Winner =await lottery.methods.lastWinner().call();
  this.setState({ Winner })
  this.setState({message:'A winner has been picked!.....'});

}

  render() {
    
    return (
      <div>
         <header className="App-header">
           <img src={logo} className="App-logo" alt="logo" />
           <h1 className="App-title">Welcome to Ethereum Project</h1>
        </header>
        <h2> Lottery Contract</h2>
        <p>This contract is managed by {this.state.manager} .
        There are currently {this.state.players.length} people entered,
        competing to win {web3.utils.fromWei(this.state.balance, 'ether')} ether!
        </p>
        <hr />
        <form onSubmit={this.onSubmit.bind(this)}>
          <h4>Want to try luck?</h4>
          <div>
          <label>Amount of ether to enter</label>
          <input
          value={this.state.value}
          onChange={event => this.setState({value:event.target.value})}
         />
         </div>
            <button>Enter</button>

          </form>
          <hr />
          <h4> Ready to pick a Winner?</h4>
          <button onClick={this.Click.bind(this)}> Pick Winner!</button>
          <hr />
          <h1>{this.state.Winner}</h1>
          <h1>{this.state.message}</h1>

      </div>
   

      // <div className="App">
      //   <header className="App-header">
      //     <img src={logo} className="App-logo" alt="logo" />
      //     <h1 className="App-title">Welcome to React</h1>
      //   </header>
      //   <p className="App-intro">
      //     To get started, edit  <code>src/App.js</code> and save to reload.
      //   </p>
      // </div>
    );
  }
}

export default App;
