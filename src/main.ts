/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { RouterModule } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent,  {
  providers: [

    importProvidersFrom(RouterModule.forRoot(routes)),
    importProvidersFrom(BrowserAnimationsModule)
  ]
})
  .catch((err) => console.error(err));
