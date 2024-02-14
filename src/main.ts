import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiPrefixInterceptor } from './app/data/interceptors/api-prefix.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ApiPrefixInterceptor, multi: true},
  ]
}).catch((e) =>
  console.error(e)
);  
