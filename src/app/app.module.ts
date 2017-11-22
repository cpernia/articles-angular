import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { reducers } from './store/app.reducer';
import { AuthEffects } from './auth/store/auth.effects';
import { ErrorService } from './error.service';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { ArticleEffects } from './core/home/articles/store/article.effects';
import { ErrorModule } from './error/error.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    CoreModule,
    AuthModule,
    ErrorModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([AuthEffects, ArticleEffects]),
    StoreRouterConnectingModule,
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [ErrorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
