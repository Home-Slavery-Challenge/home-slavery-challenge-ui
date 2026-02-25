import {bootstrapApplication} from '@angular/platform-browser';
import {appConfig} from './app/app.config';
import {AppComponent} from './app/app.component';
import '@cds/core/icon/register.js';
import {
  banIcon,
  barsIcon,
  ClarityIcons,
  minusIcon,
  noAccessIcon,
  pencilIcon,
  plusIcon,
  searchIcon,
  timesIcon,
  trashIcon,
  undoIcon
} from '@cds/core/icon';

ClarityIcons.addIcons(barsIcon);
ClarityIcons.addIcons(banIcon);
ClarityIcons.addIcons(searchIcon);
ClarityIcons.addIcons(trashIcon);
ClarityIcons.addIcons(noAccessIcon);
ClarityIcons.addIcons(minusIcon);
ClarityIcons.addIcons(timesIcon);
ClarityIcons.addIcons(plusIcon);
ClarityIcons.addIcons(undoIcon);
ClarityIcons.addIcons(pencilIcon);

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
