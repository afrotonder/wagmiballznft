import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-polygon-mint',
  templateUrl: './polygon-mint.component.html',
  styleUrls: ['./polygon-mint.component.scss'],
})
export class PolygonMintComponent implements OnInit {

  constructor(public modalCtrl: ModalController, ) {  }

  ngOnInit() {}

  dismiss(entry) {

    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      dismissed: true,
      data: entry,
    });
  }
}
