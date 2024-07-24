import { Component, OnInit } from '@angular/core';
import { HomeTabConstants } from 'src/app/constants/home-tab-constants';
@Component({
  selector: 'app-home-tab',
  templateUrl: './home-tab.page.html',
  styleUrls: ['./home-tab.page.scss'],
})
export class HomeTabPage implements OnInit {
  homeTabConstants = HomeTabConstants;
  constructor() { }

  ngOnInit() {
  }

}
