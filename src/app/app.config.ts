import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from 'core';
import { MessageService, ConfirmationService } from 'primeng/api';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(CoreModule.forRoot(), BrowserAnimationsModule),
    provideRouter(routes),
    HttpClientModule,
    MessageService,
    ConfirmationService,
  ],
};
