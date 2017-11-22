import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './core/home/home.component';
import { ArticlesComponent } from './core/home/articles/articles.component';
import { IntroComponent } from './core/home/intro/intro.component';
import { MyArticlesComponent } from './core/home/articles/my-articles/my-articles.component';
import { ArticleEditComponent } from './core/home/articles/article-edit/article-edit.component';
import { ArticleComponent } from './core/home/articles/article/article.component';
import { AuthGuard } from './auth/auth-guard.service';

const appRoutes: Routes = [
  { path: '', component: HomeComponent, data: { depth: 1, title: 'Articles | Home' }, children: [
    { path: '', component: IntroComponent, pathMatch: 'full', data: { depth: 2 } },
    { path: 'articles/new', component: ArticleEditComponent, data: { depth: 6, title: 'Articles | New' }, canActivate: [AuthGuard] },
    { path: 'articles', component: ArticlesComponent, pathMatch: 'full', data: { depth: 3, title: 'Articles | Board' } },
    { path: 'articles/:id', component: ArticleComponent, pathMatch: 'full', data: { depth: 4, title: 'Articles | Home' } },
    { path: 'articles/:id/edit', component: ArticleEditComponent, data: { depth: 5, title: 'Articles | Edit' }, canActivate: [AuthGuard] },
    { path: 'my-articles', component: MyArticlesComponent, pathMatch: 'full', data: { depth: 7, title: 'Articles | My Articles' }, canActivate: [AuthGuard] },
  ]},
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {

}
