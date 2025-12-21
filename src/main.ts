import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import '@cds/core/icon/register.js';
import {ClarityIcons, barsIcon} from '@cds/core/icon';
ClarityIcons.addIcons(barsIcon);

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
