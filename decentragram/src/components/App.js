import React, { Component } from 'react';
import Web3 from 'web3';
import Identicon from 'identicon.js';
import './App.css';
import Decentragram from '../abis/Decentragram.json'
import Navbar from './Navbar'
import Main from './Main'


class App extends Component {

  async componentDidMount() {
     await this.loadWeb3();
     await this.loadBlockChainData();
  }


  async loadWeb3()
  {
      if(window.etherium) {
        window.web3 = new Web3(window.etherium)
        await window.etherium.enabe()
      } else if(window.web3) {
        window.web3 = new Web3(window.web3.currentProvider)
      } else {
          window.alert('Non etherium browser detected. You should consider trying meta mask');
      }
  }
  
async loadBlockChainData() {
  const web3 = window.web3;
  //load account
  const accounts = await web3.eth.getAccounts(); 
  this.setState({account: accounts[0]})
  //Network Id 
  const networkId = await web3.eth.net.getId()
  const networkData = Decentragram.networks[networkId]
  console.log(networkData)
  if(networkData){
    const decentragram = web3.eth.Contract(Decentragram.abi, networkData.address)
  }else{
    window.alert("decentragram contract not deploye to detected network")
  }

}

  constructor(props) {
    super(props)
    this.state = {
      account: '',
    }
  }

  render() {
    return (
      <div>
        <Navbar account={this.state.account} />
        { this.state.loading
          ? <div id="loader" className="text-center mt-5"><p>Loading...</p></div>
          : <Main
            />
          }
        }
      </div>
    );
  }
}

export default App;