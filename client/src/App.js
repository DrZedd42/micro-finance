import React, { Component } from "react";
import getWeb3, { getGanacheWeb3, Web3 } from "./utils/getWeb3";
import Header from "./components/Header/index.js";
import Footer from "./components/Footer/index.js";
import Hero from "./components/Hero/index.js";
import Web3Info from "./components/Web3Info/index.js";
import { Loader, Button, Card, Input, Heading, Table, Form, Flex, Box, Image, Textarea, EthAddress } from 'rimble-ui';
import { zeppelinSolidityHotLoaderOptions } from '../config/webpack';
import styles from './App.module.scss';

import axios from 'axios';

//import contract from "@truffle/contract";


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      /////// Default state
      storageValue: 0,
      web3: null,
      provider: null,
      accounts: null,
      route: window.location.pathname.replace("/", ""),

      /////// Form
      validated: false
    };

    this.getTestData = this.getTestData.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleValidation = this.handleValidation.bind(this);
  }

  ///////--------------------- Function of MicroFinance contract ---------------------------  
  handleSubmit(e) {
    e.preventDefault();
    this.setState({ validated: true });
  }

  handleValidation(e) {
    e.target.parentNode.classList.add("was-validated");
  }




  ///////--------------------- Functions of testFunc ---------------------------  
  getTestData = async () => {

    const { accounts, web3, micro_finance, MyContract, LinkToken, my_contract, c_ether, abi, address } = this.state;

    let addr1 = '0x87ae0c1a2cc923c3ae4b15eddda5ba7ca11d68c1'
    let addr2 = '0x9d7c4f540d3adfab72cace58a102f67bbc4552e0'
    let addr3 = '0x0522665fa6c0a9128c9e35ddd8d30b1b5119534b'
    let addr4 = '0x8bb647a1678200fdb8cd695d94b9a5908887f7a4'
    let addr5 = '0x9fe23ff33c8d59abcff3a10c5a35ac385f604776'

    let _groupId = 1
    let _groupMendberAddr = [addr1, addr2, addr3, addr4, addr5]  // Addresses of 5 members
    let _title1 = 'Test Title'
    let _description1 = 'Test description'
    let _desiredBorrowAmount1 = 100
    let _repayAmount = 108
    let _repayDeadline = 1571726304  // UNIX Timestamp
    const response_4 = await micro_finance.methods.groupLending(_groupId,
                                                                _groupMendberAddr,
                                                                _title1,
                                                                _description1,
                                                                _desiredBorrowAmount1,
                                                                _repayAmount,
                                                                _repayDeadline).send({ from: accounts[0] })
    console.log('=== response of groupLending function ===', response_4);


    const response_3 = await micro_finance.methods.getDealsCount().call()
    console.log('=== response of getDealsCount function ===', response_3);


    let _farmerAddr = '0x65c666ff3bd301dfc78d8b25f855e02e4556f17d'
    let _title = 'Test Borrow 1'
    let _description = 'Test borrow of micro finance'
    let _desiredBorrowAmount = 100
    const response_0 = await micro_finance.methods.createDeal(_farmerAddr,
                                                              _title,
                                                              _description,
                                                              _desiredBorrowAmount).send({ from: accounts[0] })
    console.log('=== response of createDeal function ===', response_0);           // Debug：Success


    const response_1 = await my_contract.methods.testFunc().send({ from: accounts[0] })
    console.log('=== response of testFunc function ===', response_1);           // Debug：Success

    // const cToken = c_ether.at("0x42a628e0c5F3767930097B34b08dCF77e78e4F2B");
    // const response_compound = await cToken.methods.mint().send({from: accounts[0], value: 50});
    // console.log('=== response of response_compound function ===', response_2);  // Debug：Success    

    const response_2 = await my_contract.methods.getChainlinkToken().call()
    console.log('=== response of getChainlinkToken function ===', response_2);  // Debug：Success


    // The sample data whch reference from ./scripts/read-contract.js
    const oracleAddress = '0xc99B3D447826532722E41bc36e644ba3479E4365'
    const jobId = '9f0406209cf64acda32636018b33de11'
    const payment = '1000000000000000000'
    const url = 'https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD'
    const path = 'USD'
    const times = '100'

    // const mc = await MyContract.deployed()
    // const tokenAddress = await mc.getChainlinkToken()
    // const token = await LinkToken.at(tokenAddress)
    // console.log(`============ Funding contract: ${mc.address} ============`)

    // const tx = await token.transfer(mc.address, payment)
    // console.log(`============ tx: ${tx} ============`)
    
    //callback(tx.tx)

    const BANCOR_ENDPOINT = 'https://api.bancor.network/0.1/currencies/tokens?limit=1&skip=0&fromCurrencyCode=ETH&includeTotal=false&orderBy=liquidityDepth&sortOrder=desc'

    const KYBER_ENDPOINT = 'https://widget.kyber.network/v0.7.2/?type=pay&mode=popup&lang=en&receiveAddr=0x8Fc9d07b1B9542A71C4ba1702Cd230E160af6EB3&receiveToken=DAI&callback=https%3A%2F%2Fkyberpay-sample.knstats.com%2Fcallback&paramForwarding=true&network=ropsten&theme=theme-emerald'
    const response_5 = await axios.get(BANCOR_ENDPOINT)
    //const response_5 = await axios.get(KYBER_ENDPOINT)
    .then((results) => {
        // 通信に成功してレスポンスが返ってきた時に実行したい処理
        console.log('=== results ===', results);
    })
    .catch((error) => {
        // 通信に失敗してレスポンスが返ってこなかった時に実行したい処理
        console.log('=== error ===', error);
    })
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
 
    let MicroFinance = {};
    let MyContract = {};
    let LinkToken = {};
    let CEther = {};

    try {
      MicroFinance = require('../../build/contracts/MicroFinance.json');
      MyContract = require("../../build/contracts/MyContract.json");  // Load ABI of contract of MyContract
      LinkToken = require("../../build/contracts/LinkToken.json");    // Load ABI of contract of LinkToken
      console.log('============ LinkToken.abi ============', LinkToken.abi)
      CEther = require("../../compound/networks/ropsten/deployedFile/ropsten.json");  // Load ABI of contract of CEther

      this.setState({ 
        MicroFinance: MicroFinance, 
        MyContract: MyContract,
        LinkToken: LinkToken,
        CEther: CEther
      })
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

        let instanceMicroFinance = null;
        let instanceMyContract = null;
        let instanceLinkToken = null;
        let instanceCEther = null;
        
        let deployedLinkTokenAddrRopsten = null;
        let deployedNetwork = null;

        // Create instance of contracts
        if (MicroFinance.networks) {
          deployedNetwork = MicroFinance.networks[networkId.toString()];
          if (deployedNetwork) {
            instanceMicroFinance = new web3.eth.Contract(
              MicroFinance.abi,
              deployedNetwork && deployedNetwork.address,
            );
            console.log('=== instanceMicroFinance ===', instanceMicroFinance);
          }
        }
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
        // if (LinkToken.networks) {
        //   deployedLinkTokenAddrRopsten = "0x20fE562d797A42Dcb3399062AE9546cd06f63280";
        //   deployedNetwork = LinkToken.networks[networkId.toString()];
        //   console.log('============ deployedNetwork ============', deployedNetwork)
        //   if (deployedNetwork) {
        //     instanceLinkToken = new web3.eth.Contract(
        //       LinkToken.abi,
        //       deployedNetwork && deployedNetwork.deployedLinkTokenAddrRopsten,
        //       //deployedNetwork && deployedNetwork.address,
        //     );
        //     console.log('=== instanceLinkToken ===', instanceLinkToken);
        //   }
        // }
        if (CEther.networks) {
          deployedNetwork = CEther.networks[networkId.toString()];
          if (deployedNetwork) {
            instanceMyContract = new web3.eth.Contract(
              CEther.abi,
              deployedNetwork && deployedNetwork.address,
            );
            console.log('=== instanceCEther ===', instanceCEther);
          }
        }

        if (instanceMyContract) {
          // Set web3, accounts, and contract to the state, and then proceed with an
          // example of interacting with the contract's methods.
          this.setState({ web3, ganacheAccounts, accounts, balance, networkId, networkType, hotLoaderDisabled,
            isMetaMask, micro_finance: instanceMicroFinance, my_contract: instanceMyContract, link_token: instanceLinkToken, c_ether: instanceCEther, abi: MyContract.abi, address: deployedNetwork.address }, () => {
              this.refreshValues(instanceMyContract, instanceLinkToken, instanceCEther);
              setInterval(() => {
                this.refreshValues(instanceMicroFinance, instanceMyContract, instanceLinkToken, instanceCEther);
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

  refreshValues = (instanceMicroFinance, instanceMyContract, instanceLinkToken) => {
    if (instanceMicroFinance) {
      console.log('refreshValues of instanceMicroFinance');
    }
    if (instanceMyContract) {
      console.log('refreshValues of instanceMyContract');
    }
    if (instanceLinkToken) {
      console.log('refreshValues of instanceLinkToken');
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

  renderMicroFinance() {
    return (
      <div className={styles.wrapper}>
      {!this.state.web3 && this.renderLoader()}
      {this.state.web3 && !this.state.my_contract && (
        this.renderDeployCheck('my_contract')
      )}
      {this.state.web3 && this.state.my_contract && (
        <div className={styles.contracts}>

          <div className={styles.widgets}>
            <Card style={{ margin:'auto', width:'50%' }} bg="primary">
              <h4>Create your order of individual of MicroFinance</h4>

              <Form onSubmit={this.handleSubmit}>
                <Form.Field label="Title" width={1}>
                  <Form.Input
                    type="text"
                    required
                    width={1}
                    onChange={this.handleValidation}
                  />
                </Form.Field>
                <Form.Field label="Description" width={1}>
                  <Textarea 
                    placeholder="Start typing..."
                    required
                    width={1}
                    rows={4}
                    onChange={this.handleValidation}
                  />
                </Form.Field>
                <Form.Field validated={this.state.validated} label="Desired amount of investment" width={1}>
                  <Form.Input
                    type="text"
                    required
                    width={1}
                    onChange={this.handleValidation}
                  />
                </Form.Field>
                <Form.Field validated={this.state.validated} label="Received Address" width={1}>
                  <Form.Input
                    type="text"
                    required
                    width={1}
                    onChange={this.handleValidation}
                  />
                </Form.Field>
                <Box>
                  <Form.Check
                    label="Agree in terms of rules?"
                    mb={3}
                    onChange={this.handleValidation}
                  />
                </Box>
                <Button type="submit" width={1}>
                  Request investment
                </Button>
              </Form>
            </Card>

            <Card style={{ margin:'auto', width:'50%' }} bg="primary">
              <h4>Create your order of Group Borrowing of MicroFinance</h4>

              <Form onSubmit={this.handleSubmit}>
                <Form.Field label="Title" width={1}>
                  <Form.Input
                    type="text"
                    required
                    width={1}
                    onChange={this.handleValidation}
                  />
                </Form.Field>
                <Form.Field label="Description" width={1}>
                  <Textarea 
                    placeholder="Start typing..."
                    required
                    width={1}
                    rows={4}
                    onChange={this.handleValidation}
                  />
                </Form.Field>
                <Form.Field validated={this.state.validated} label="Desired amount of investment" width={1}>
                  <Form.Input
                    type="text"
                    required
                    width={1}
                    onChange={this.handleValidation}
                  />
                </Form.Field>
                <Form.Field validated={this.state.validated} label="Borrower Group Member Address" width={1}>
                  <Form.Input
                    type="text"
                    required
                    width={1}
                    onChange={this.handleValidation}
                  />
                  <Form.Input
                    type="text"
                    required
                    width={1}
                    onChange={this.handleValidation}
                  />
                  <Form.Input
                    type="text"
                    required
                    width={1}
                    onChange={this.handleValidation}
                  />
                  <Form.Input
                    type="text"
                    required
                    width={1}
                    onChange={this.handleValidation}
                  />
                  <Form.Input
                    type="text"
                    required
                    width={1}
                    onChange={this.handleValidation}
                  />
                </Form.Field>
                <Box>
                  <Form.Check
                    label="Agree in terms of rules?"
                    mb={3}
                    onChange={this.handleValidation}
                  />
                </Box>
                <Button type="submit" width={1}>
                  Request investment
                </Button>
              </Form>
            </Card>
          </div>

          <span style={{ padding: "50px" }}></span>

          <h2>Micro finance for farmers in agriculture industory</h2>

          <div className={styles.widgets}>
            <Card width={'30%'} bg="primary">
              <h4>Investment request #1</h4>

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

              <br />

              <Button size={'small'} onClick={this.getTestData}>
                <a 
                  href='https://widget.kyber.network/v0.7.2/?type=pay&mode=popup&lang=en&receiveAddr=0x8Fc9d07b1B9542A71C4ba1702Cd230E160af6EB3&receiveToken=DAI&callback=https%3A%2F%2Fkyberpay-sample.knstats.com%2Fcallback&paramForwarding=true&network=ropsten&theme=theme-emerald' 
                  class='kyber-widget-button theme-emerald theme-supported' 
                  name='KyberWidget - Powered by KyberNetwork' 
                  title='Pay with tokens'
                  target='_blank'
                >
                 Pay with DAI
                </a>
              </Button>
            </Card>
   
            <Card width={'30%'} bg="primary">
              <h4>Investment request #2</h4>

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
              <h4>Investment request #3</h4>

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
              <h4>Investment request #4</h4>

              <Image
                alt="random unsplash image"
                borderRadius={8}
                height="auto"
                maxWidth='100%'
                src="https://source.unsplash.com/random/1280x720"
              />

              <span style={{ padding: "20px" }}></span>

              <br />

              <Button size={'small'}>
                <a 
                  href='https://widget.kyber.network/v0.7.2/?type=pay&mode=popup&lang=en&receiveAddr=0x8Fc9d07b1B9542A71C4ba1702Cd230E160af6EB3&receiveToken=DAI&callback=https%3A%2F%2Fkyberpay-sample.knstats.com%2Fcallback&paramForwarding=true&network=ropsten&theme=theme-emerald' 
                  class='kyber-widget-button theme-emerald theme-supported' 
                  name='KyberWidget - Powered by KyberNetwork' 
                  title='Pay with tokens'
                  target='_blank'
                >
                 Pay with DAI
                </a>
              </Button>
            </Card>
   
            <Card width={'30%'} bg="primary">
              <h4>Investment request #5</h4>

              <Image
                alt="random unsplash image"
                borderRadius={8}
                height="auto"
                maxWidth='100%'
                src="https://source.unsplash.com/random/1280x720"
              />

              <span style={{ padding: "20px" }}></span>

              <br />

              <Button size={'small'}>
                <a 
                  href='https://widget.kyber.network/v0.7.2/?type=pay&mode=popup&lang=en&receiveAddr=0x8Fc9d07b1B9542A71C4ba1702Cd230E160af6EB3&receiveToken=DAI&callback=https%3A%2F%2Fkyberpay-sample.knstats.com%2Fcallback&paramForwarding=true&network=ropsten&theme=theme-emerald' 
                  class='kyber-widget-button theme-emerald theme-supported' 
                  name='KyberWidget - Powered by KyberNetwork' 
                  title='Pay with tokens'
                  target='_blank'
                >
                 Pay with DAI
                </a>
              </Button>
            </Card>

            <Card width={'30%'} bg="primary">
              <h4>Investment request #6</h4>

              <Image
                alt="random unsplash image"
                borderRadius={8}
                height="auto"
                maxWidth='100%'
                src="https://source.unsplash.com/random/1280x720"
              />

              <span style={{ padding: "20px" }}></span>

              <br />

              <Button size={'small'}>
                <a 
                  href='https://widget.kyber.network/v0.7.2/?type=pay&mode=popup&lang=en&receiveAddr=0x8Fc9d07b1B9542A71C4ba1702Cd230E160af6EB3&receiveToken=DAI&callback=https%3A%2F%2Fkyberpay-sample.knstats.com%2Fcallback&paramForwarding=true&network=ropsten&theme=theme-emerald' 
                  class='kyber-widget-button theme-emerald theme-supported' 
                  name='KyberWidget - Powered by KyberNetwork' 
                  title='Pay with tokens'
                  target='_blank'
                >
                 Pay with DAI
                </a>
              </Button>
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
          {this.state.route === 'micro_finance' && this.renderMicroFinance()}
        <Footer />
      </div>
    );
  }
}

export default App;
