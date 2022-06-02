import { Component } from '@angular/core';
import Web3 from 'web3';
import Moralis from "moralis/dist/moralis.min.js";
import { firebaseConfig } from "../../../environment.prod";
import { ToastController, ModalController } from '@ionic/angular';
// import { ThirdwebSDK } from "@thirdweb-dev/sdk";
// import ethers from 'ethers';
// import { ModalController, ActionSheetController } from '@ionic/angular';

import { Web3Service } from '../web3.service';
import { PolygonMintComponent } from '../components/polygon-mint/polygon-mint.component';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  menuItems: Array<any>;
  year: string;
  showSpinner: Boolean;
  f0: any;
  userTokenMintCount: any;
  limit: string;
  eth: string;
  tokens: Array<any>;
  key: string;
  count: number;
  address: string;
  index: string;
  items: {};
  image: string;
  title: string;
  polyMint: boolean;
  openedModal: boolean;
  ethMint: boolean;
  mintingItems: Array<any>;
  direction: string[] | undefined;
  minting: Boolean;
  connectButtonLabel: string;
  connected: boolean;
  currentSupply: string;
  constructor(private web3: Web3Service,
    private toastCtrl: ToastController,
    public modalCtrl: ModalController,

  ) {

    this.currentSupply = "-"

    this.connected = false;
    this.tokens = []
    this.minting = false
    this.showSpinner = true;
    this.userTokenMintCount = 0
    this.connectButtonLabel = "Connect Wallet"
    this.ethMint = false
    this.polyMint = false
    this.openedModal = false

    this.year = new Date().getFullYear().toString()
    this.menuItems = [
      {
        name: 'Twitter', src: 'https://twitter.com/afrotonder',
        icon: `../../assets/img/twitter-blk.png`,
        alt: `TwitterIcon`,
        title: 'Afrotonder@Twitter',
        class: 'linkIcon'
      },
      //  { name: 'Telegram', src: 'https://twitter.com/cyberjiba' },
      //  { name: 'Rarible', src: 'https://rarible.com/cyberjiba/items' },
      //  { name: 'Discord', src: 'https://discord.gg/' },
      {
        name: 'OpenSea',
        src: 'https://opensea.io/collection/wagmiballz',
        icon: `../../assets/img/opensea.png`,
        alt: `OpenSeaIcon`,
        title: 'Wagmiballz@OpenSea',
        class: 'linkIcon'
      },

      {
        name: 'VerifiedContract',
        src: 'https://etherscan.io/address/0x7b44e6E560d5B329A23700BE21a487249758Bb80',
        icon: `../../assets/contract.png`,
        alt: `ContractIcon`,
        title: 'Contract@Etherscan',
        class: 'linkIcon'
      },
      {
        name: 'Paddlez',
        src: 'https://paddlez-1b260.web.app/',
        icon: `../../assets/paddlez.png`,
        alt: `PaddlezIcon`,
        title: 'PaddlezOfficial',
        class: 'linkIcon'
      },

    ]


  }

  ionViewDidEnter() {

    this.toggleSpinner()


    // this.testMoralis()
  }

  connectWallet() {
    this.runWeb3Stuff()

    // this.activateInjectedProvider('MetaMask')

  }

  doRefresh(event) {

    // this.searchValue = "" ;

    // this.getPunks()
    window.location.reload();



    event.target.complete()

  }

  selectMintNetwork(network) {

    if (network === 'eth') {
      this.ethMint = true
    } else {
      this.polyMint = true
    }
  }

  async testMoralis() {
    const serverUrl = firebaseConfig.svr;

    //  // moralis server appID
    const appId = firebaseConfig.romero;

    //  // start moralis engine
    Moralis.start({ serverUrl, appId });
    const get = await Moralis.Plugins.opensea.getAsset({
      network: 'testnet',
      tokenAddress: '0x7edd30e10bd9fecd05935135efc515924b378ac0',
      tokenId: '1',
    });

  }

  async runWeb3Stuff() {


    try {

      this.connectButtonLabel = "Connecting..."


      // const provider = ethers.Wallet.createRandom();
      // const sdk = new ThirdwebSDK(provider);
      // const contract = sdk.getNFTDrop("0x95fF042dC0875E9b93a2D17B4D8C882eEfb3Da16");


      const F0 = require('f0js')

      let f0 = new F0()
      this.f0 = f0

      const web3 = new Web3(window.ethereum)

      let config = await fetch("../../assets/box.json").then((r) => {
        return r.json()
      })
      const providers = await window.ethereum.send('eth_requestAccounts');

      await f0.init({
        web3: web3,
        contract: config.contract,
        network: config.network
      })
      const name = await f0.name()
      const symbol = await f0.symbol()
      const placeholder = await f0.placeholder()
      const invites = await f0.myInvites()

      // document.querySelector(".box").innerHTML = template({
      this.title = `${name} (${symbol}) Invite List`
      this.image = placeholder.converted.image
      this.items = Object.keys(invites).map((key, index) => {
        return {
          index: index,
          address: config.contract,
          key: key,
          eth: invites[key].condition.converted.eth,
          limit: invites[key].condition.converted.limit
        }
      })

      this.eth = this.items[0].eth
      this.address = this.items[0].address
      this.key = this.items[0].key
      this.limit = this.items[0].limit
      this.connected = true
      this.connectButtonLabel = this.items[0].address.substr(0, 16) + '...'


      // })

    } catch (e) {

      this.connected = false
      this.connectButtonLabel = "Connect Wallet"

      // @ts-ignore
      // document.getElementsByClassName('btn')[0].style.display = 'none'
      console.log('Err: ', e.message);
      if (e.message === "Cannot read properties of undefined (reading 'eth')") {
        this.showToast('Minting not open yet. 👀')
      }
      if (e.message.includes('Provider not set or invalid')) {
        this.showToast('Please log into your wallet. 🦊')
      }
      if (e.message.includes('Please sign into main network')) {
        this.showToast('Please switch to the ETH network. 📡')
      }
      if (e.message.includes('Please sign into')) {
        // this.showToast('Please sign into MetaMask in the Eth network and/or use a browser without Coinbase Wallet Extension installed. ')
        this.activateInjectedProvider('MetaMask')
      }
      // document.querySelector(".box").innerHTML = `<h1>${e.message.toLowerCase()}</h1>`
    }
    // })
  }

  async activateInjectedProvider(providerName: 'MetaMask' | 'CoinBase') {
    const { ethereum } = window;

    if (!ethereum?.providers) {

      return undefined;
    }

    let tempProviders = window.ethereum.providers
    let t = []
    tempProviders.forEach(element => {

      // if (element.isCoinbaseWallet) {
      //   window.ethereum.providers.splice(window.ethereum.providers[window.ethereum.providers.indexOf(element)], 1)
      // }
      // if (element.isBraveWallet) {
      //   window.ethereum.providers.splice(window.ethereum.providers[window.ethereum.providers.indexOf(element)], 1)
      // }
      if (!element.isMetaMask) {
        window.ethereum.providers.splice(window.ethereum.providers[window.ethereum.providers.indexOf(element)], 1)
      } else {
        t.push(element)
      }
    });

    let provider;

    switch (providerName) {
      case 'CoinBase':
        provider = t.find(({ isCoinbaseWallet }) => isCoinbaseWallet);
        break;
      case 'MetaMask':
        provider = t.find(({ isMetaMask }) => isMetaMask);

        this.runWeb3F0(provider)
        break;
    }

    // if (provider) {
    //     ethereum.setSelectedProvider(provider);
    // }
  }

  async runWeb3F0(provider) {

    const F0 = require('f0js')

    let f0 = new F0()
    this.f0 = f0

    const web3 = new Web3(provider)

    let config = await fetch("../../assets/box.json").then((r) => {
      return r.json()
    })
    // const providers = await window.ethereum.send('eth_requestAccounts');

    await f0.init({
      web3: web3,
      contract: config.contract,
      network: config.network
    })
    const name = await f0.name()
    const symbol = await f0.symbol()
    const placeholder = await f0.placeholder()
    const invites = await f0.myInvites()

    // document.querySelector(".box").innerHTML = template({
    this.title = `${name} (${symbol}) Invite List`
    this.image = placeholder.converted.image
    this.items = Object.keys(invites).map((key, index) => {
      return {
        index: index,
        address: config.contract,
        key: key,
        eth: invites[key].condition.converted.eth,
        limit: invites[key].condition.converted.limit
      }
    })

    this.eth = this.items[0].eth
    this.address = this.items[0].address
    this.key = this.items[0].key
    this.limit = this.items[0].limit
    this.connected = true
    this.connectButtonLabel = this.items[0].address.substr(0, 16) + '...'
  }

  async toggleSpinner() {
    const timer = (ms) => new Promise((res) => setTimeout(res, ms));

    await timer(2000);

    this.showSpinner = false
  }

  async switchToMint() {
    this.minting = true


    const timer = (ms) => new Promise((res) => setTimeout(res, ms));

    await timer(500);


    document.getElementById('count').scrollIntoView({ behavior: "smooth" });
    // const { key, address } = f0.parseURL(location.href)
    // const template = Handlebars.compile(document.querySelector("#template").innerHTML);
    // const mintTemplate = Handlebars.compile(document.querySelector("#mint-template").innerHTML);
    // document.addEventListener("DOMContentLoaded", async () => {
    await window.ethereum.send('eth_requestAccounts');
    let c = await fetch("../../assets/box.json").then((r) => {
      return r.json()
    })
    try {
      await this.f0.init({
        web3: new Web3(window.ethereum),
        contract: this.address,
        network: c.network
      })
      let invite = await this.f0.invite(this.key)
      let placeholder = await this.f0.placeholder()
      const name = await this.f0.name()
      const symbol = await this.f0.symbol()
      const nextId = await this.f0.nextId()
      const config = await this.f0.config()


      let mintingItems = []
      for (let i = 1; i <= invite.condition.converted.limit; i++) {
        mintingItems.push(i)
      }

      this.mintingItems = mintingItems

      // document.querySelector(".box").innerHTML = template({
      // image: placeholder.converted.image,
      // title: `${name} (${symbol})`,+
      let items = mintingItems.map((item) => { return { count: item } })

      let max = invite.condition.converted.limit

      let price = `${invite.condition.converted.eth} ETH`

      let current = nextId

      let supply = config.converted.supply

      let account = this.f0.account

      let key = this.key

      this.currentSupply = (current-1).toString() + '/' + supply.toString()

      //
    } catch (e) {
      console.log('ERR, NOT INVITED TO MINT ', e);
      this.showToast('Looks like youre not invited to this mint! 😭')
      // document.querySelector(".box2").innerHTML = `<h1>${e.message.toLowerCase()}</h1>`
    }
  }

  async beginMint() {

    try {

      let count = this.userTokenMintCount // parseInt(document.querySelector("#count")[0].value)

      if (count === 0) {
        alert("Please enter a number greater than 0")
      } else {
        this.showToast('Your transaction is now processing! 🦊 ')

        let tokens = await this.f0.mint(this.key, count)

        let tempTokens = tokens.map((token) => {
          return {
            opensea: token.links.opensea,
            rarible: token.links.rarible,
            tokenId: token.tokenId
          }
        })

        this.tokens = tempTokens

        this.showToast('Your transaction was successful! 🎉')


      }
    } catch (error) {
      console.log(error.message);
      if (error.message.includes('execution reverted: 10')) {

        this.showToast('You have already reached the max mint limit. 🎯')
      }
    }


  }

  async selectSupply() {

    const timer = (ms) => new Promise((res) => setTimeout(res, ms));

    await timer(500);


    document.getElementById('mint').scrollIntoView({ behavior: "smooth" });

    // document.getElementById('footer').scrollIntoView({ behavior: "smooth" });

  }

  async openThirdWebModal() {

    if (!this.openedModal) {

      const modal = await this.modalCtrl.create({
        component: PolygonMintComponent,
        cssClass: 'customModal',
        backdropDismiss: true,
        swipeToClose: true
      });
      this.openedModal = true

      modal.onDidDismiss().then((data) => {
        this.openedModal = false
      });
      await modal.present();
    }






  }

  async showToast(message) {
    const toast = await this.toastCtrl.create({
      message,
      position: 'bottom',
      duration: 9000,

    });
    toast.present();
  }

}
