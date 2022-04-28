import { Component } from '@angular/core';
import Web3 from 'web3';
import Moralis from "moralis/dist/moralis.min.js";
import { firebaseConfig } from "../../../environment.prod";
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
  constructor() {

    this.showSpinner = true ;

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

    ]


  }

  ionViewDidEnter() {
    this.toggleSpinner()

  }

  async toggleSpinner() {
    const timer = (ms) => new Promise((res) => setTimeout(res, ms));

    await timer(2000);

    this.showSpinner = false
  }

}
