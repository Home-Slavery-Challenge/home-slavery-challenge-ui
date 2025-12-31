import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import '@cds/core/icon/register.js';
import {ClarityIcons, barsIcon, banIcon, searchIcon, trashIcon, noAccessIcon, minusIcon} from '@cds/core/icon';
ClarityIcons.addIcons(barsIcon);
ClarityIcons.addIcons(banIcon);
ClarityIcons.addIcons(searchIcon);
ClarityIcons.addIcons(trashIcon);
ClarityIcons.addIcons(noAccessIcon);
ClarityIcons.addIcons(minusIcon);

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
