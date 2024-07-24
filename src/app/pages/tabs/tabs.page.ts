import { Component } from '@angular/core';
import { TabsPageConstants } from 'src/app/constants/tabs-page.constants';
import { AppRoutes } from 'src/app/enums/app-routes.enum';
import { TabTypes } from 'src/app/enums/tabs.enum';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  tabTypes = TabTypes;
  appRoutes = AppRoutes;
  tabsPageConstants = TabsPageConstants;
  constructor() {}

}
