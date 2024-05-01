import { ApplicationConfig } from '@angular/core';
import { PreloadAllModules, provideRouter, withViewTransitions, withPreloading, } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { MessageService } from 'primeng/api';
import { loaderInterceptor } from './Authentication/interceptors/loader.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withPreloading(PreloadAllModules), withViewTransitions()), // preloding the lazy loading components
    provideHttpClient(withFetch()),
    provideAnimations(),
    provideClientHydration(),
    provideAnimationsAsync(),
    MessageService, provideAnimationsAsync(),
  ],
};