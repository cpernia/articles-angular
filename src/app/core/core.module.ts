import { NgModule } from '@angular/core';

import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from '../app-routing.module';
import { TopBarComponent } from './top-bar/top-bar.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { ArticlesComponent } from './home/articles/articles.component';
import { IntroComponent } from './home/intro/intro.component';
import { MyArticlesComponent } from './home/articles/my-articles/my-articles.component';
import { ArticleEditComponent } from './home/articles/article-edit/article-edit.component';
import { ArticleComponent } from './home/articles/article/article.component';
import { SideBarService } from './side-bar.service';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GetUserService } from './get-user.service';

@NgModule({
  declarations: [
    HomeComponent,
    TopBarComponent,
    SideBarComponent,
    IntroComponent,
    ArticlesComponent,
    MyArticlesComponent,
    ArticleEditComponent,
    ArticleComponent
  ],
  imports: [
    BrowserAnimationsModule,
    SharedModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  exports: [
    AppRoutingModule
  ],
  providers: [
    SideBarService,
    GetUserService
  ]
})
export class CoreModule { }
