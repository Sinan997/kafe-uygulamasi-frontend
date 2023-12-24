import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from 'core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { BLUEPRINTS, NgxValidateCoreModule } from '@ngx-validate/core';
import { CustomErrorComponent } from './customerror.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(
      CoreModule.forRoot(),
      NgxValidateCoreModule.forRoot({
        errorTemplate: CustomErrorComponent,
        blueprints: { ...BLUEPRINTS }
      }),
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
      }),
      BrowserAnimationsModule,
      HttpClientModule
    ),
    provideRouter(routes),
    MessageService,
    ConfirmationService,
  ],
};
