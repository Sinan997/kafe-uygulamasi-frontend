import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmationService, MessageService } from 'primeng/api';
import { provideRouter } from '@angular/router';
import { CoreModule } from 'core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { routes } from './routes';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(CoreModule.forRoot(), BrowserAnimationsModule),
    provideRouter(routes),
    HttpClientModule,
    MessageService,
    ConfirmationService,
  ],
});
