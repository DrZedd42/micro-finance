import React, { Component } from "react";
import getWeb3, { getGanacheWeb3, Web3 } from "./utils/getWeb3";
import Header from "./components/Header/index.js";
import Footer from "./components/Footer/index.js";
import Hero from "./components/Hero/index.js";
import Web3Info from "./components/Web3Info/index.js";
import { Loader, Button, Card, Input, Heading, Table, Form, Flex, Box, Image } from 'rimble-ui';
import { zeppelinSolidityHotLoaderOptions } from '../config/webpack';
import styles from './App.module.scss';



class App extends Component {
  constructor(props) {    
    super(props);

    this.state = {
      /////// Default state
      storageValue: 0,
      web3: null,
      accounts: null,
      route: window.location.pathname.replace("/", ""),
    };

    this.getTestData = this.getTestData.bind(this);

  }


  ///////--------------------- Functions of CzExchange ---------------------------



  ///////--------------------- Functions of testFunc ---------------------------  
  getTestData = async () => {

    const { accounts, my_contract, web3 } = this.state;

    const response_1 = await my_contract.methods.testFunc().send({ from: accounts[0] })
    console.log('=== response of testFunc function ===', response_1);           // Debug：Success


    const response_2 = await my_contract.methods.getChainlinkToken().call()
    console.log('=== response of getChainlinkToken function ===', response_2);  // Debug：Success

    const _oracle = '0x67613e33412f07280ff9ef63cbe78b3225a5db6c'
    const _jobId = '0x241ac766eb7cab2f509d4655182a1b1486040db9bb6be3e973f2c4a9e3f08598'
    const _payment = 100
    const _url = 'https://api.kraken.com/0/public/Ticker?pair=ETHUSD'
    const _path = 'https://api.kraken.com/0/public/Ticker?pair=ETHUSD'
    const _times = 11111

    const response_3 = await my_contract.methods.createRequestTo(_oracle,
                                                                  _jobId,
                                                                  _payment,
                                                                  _url,
                                                                  _path,
                                                                  _times).send({ from: accounts[0] })
    console.log('=== response of createRequestTo function ===', response_3);  // Debug：Success
  }




  //////////////////////////////////// 
  ///// Ganache
  ////////////////////////////////////
  getGanacheAddresses = async () => {
    if (!this.ganacheProvider) {
      this.ganacheProvider = getGanacheWeb3();
    }
    if (this.ganacheProvider) {
      return await this.ganacheProvider.eth.getAccounts();
    }
    return [];
  }

  componentDidMount = async () => {
    const hotLoaderDisabled = zeppelinSolidityHotLoaderOptions.disabled;
 
    let MyContract = {};

    try {
      MyContract = require("../../build/contracts/MyContract.json");  // Load ABI of contract of MyContract
    } catch (e) {
      console.log(e);
    }

    try {
      const isProd = process.env.NODE_ENV === 'production';
      if (!isProd) {
        // Get network provider and web3 instance.
        const web3 = await getWeb3();
        let ganacheAccounts = [];

        try {
          ganacheAccounts = await this.getGanacheAddresses();
        } catch (e) {
          console.log('Ganache is not running');
        }

        // Use web3 to get the user's accounts.
        const accounts = await web3.eth.getAccounts();
        // Get the contract instance.
        const networkId = await web3.eth.net.getId();
        const networkType = await web3.eth.net.getNetworkType();
        const isMetaMask = web3.currentProvider.isMetaMask;
        let balance = accounts.length > 0 ? await web3.eth.getBalance(accounts[0]): web3.utils.toWei('0');
        balance = web3.utils.fromWei(balance, 'ether');

        let instanceCzExchange = null;
        let instanceMyContract = null;
        let deployedNetwork = null;

        // Create instance of contracts
        if (MyContract.networks) {
          deployedNetwork = MyContract.networks[networkId.toString()];
          if (deployedNetwork) {
            instanceMyContract = new web3.eth.Contract(
              MyContract.abi,
              deployedNetwork && deployedNetwork.address,
            );
            console.log('=== instanceMyContract ===', instanceMyContract);
          }
        }

        if (instanceMyContract) {
          // Set web3, accounts, and contract to the state, and then proceed with an
          // example of interacting with the contract's methods.
          this.setState({ web3, ganacheAccounts, accounts, balance, networkId, networkType, hotLoaderDisabled,
            isMetaMask, my_contract: instanceMyContract }, () => {
              this.refreshValues(instanceCzExchange, instanceMyContract);
              setInterval(() => {
                this.refreshValues(instanceCzExchange, instanceMyContract);
              }, 5000);
            });
        }
        else {
          this.setState({ web3, ganacheAccounts, accounts, balance, networkId, networkType, hotLoaderDisabled, isMetaMask });
        }
      }
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  refreshValues = (instanceMyContract) => {
    if (instanceMyContract) {
      console.log('refreshValues of instanceMyContract');
    }
  }

  renderLoader() {
    return (
      <div className={styles.loader}>
        <Loader size="80px" color="red" />
        <h3> Loading Web3, accounts, and contract...</h3>
        <p> Unlock your metamask </p>
      </div>
    );
  }

  renderDeployCheck(instructionsKey) {
    return (
      <div className={styles.setup}>
        <div className={styles.notice}>
          Your <b> contracts are not deployed</b> in this network. Two potential reasons: <br />
          <p>
            Maybe you are in the wrong network? Point Metamask to localhost.<br />
            You contract is not deployed. Follow the instructions below.
          </p>
        </div>
      </div>
    );
  }

  renderInstructions() {
    return (
      <div className={styles.wrapper}>
        <Hero />
      </div>
    );
  }

  renderCzExchange() {
    return (
      <div className={styles.wrapper}>
      {!this.state.web3 && this.renderLoader()}
      {this.state.web3 && !this.state.my_contract && (
        this.renderDeployCheck('my_contract')
      )}
      {this.state.web3 && this.state.my_contract && (
        <div className={styles.contracts}>

          <h2>#Defi donation automatically by using compound and chainlink</h2>

          <div className={styles.widgets}>
            <Card width={'30%'} bg="primary">
              <h4>Goods #1</h4>

              <Image
                alt="random unsplash image"
                borderRadius={8}
                height="auto"
                maxWidth='100%'
                src="https://source.unsplash.com/random/1280x720"
              />

              <span style={{ padding: "20px" }}></span>

              <br />

              <Button size={'small'} onClick={this.getTestData}>Buy</Button>
            </Card>
   
            <Card width={'30%'} bg="primary">
              <h4>Goods #2</h4>

              <Image
                alt="random unsplash image"
                borderRadius={8}
                height="auto"
                maxWidth='100%'
                src="https://source.unsplash.com/random/1280x720"
              />

              <span style={{ padding: "20px" }}></span>

              <br />

              <Button size={'small'} onClick={this.getTestData}>Buy</Button>
            </Card>

            <Card width={'30%'} bg="primary">
              <h4>Goods #3</h4>

              <Image
                alt="random unsplash image"
                borderRadius={8}
                height="auto"
                maxWidth='100%'
                src="https://source.unsplash.com/random/1280x720"
              />

              <span style={{ padding: "20px" }}></span>

              <br />

              <Button size={'small'} onClick={this.getTestData}>Buy</Button>
            </Card>
          </div>


          <div className={styles.widgets}>
            <Card width={'30%'} bg="primary">
              <h4>Goods #4</h4>

              <Image
                alt="random unsplash image"
                borderRadius={8}
                height="auto"
                maxWidth='100%'
                src="https://source.unsplash.com/random/1280x720"
              />

              <span style={{ padding: "20px" }}></span>

              <br />

              <Button size={'small'} onClick={this.getTestData}>Buy</Button>
            </Card>
   
            <Card width={'30%'} bg="primary">
              <h4>Goods #5</h4>

              <Image
                alt="random unsplash image"
                borderRadius={8}
                height="auto"
                maxWidth='100%'
                src="https://source.unsplash.com/random/1280x720"
              />

              <span style={{ padding: "20px" }}></span>

              <br />

              <Button size={'small'} onClick={this.getTestData}>Buy</Button>
            </Card>

            <Card width={'30%'} bg="primary">
              <h4>Goods #6</h4>

              <Image
                alt="random unsplash image"
                borderRadius={8}
                height="auto"
                maxWidth='100%'
                src="https://source.unsplash.com/random/1280x720"
              />

              <span style={{ padding: "20px" }}></span>

              <br />

              <Button size={'small'} onClick={this.getTestData}>Buy</Button>
            </Card>
          </div>


        </div>
      )}
      </div>
    );
  }

  render() {
    return (
      <div className={styles.App}>
        <Header />
          {this.state.route === '' && this.renderInstructions()}
          {this.state.route === 'cz_exchange' && this.renderCzExchange()}
        <Footer />
      </div>
    );
  }
}

export default App;
