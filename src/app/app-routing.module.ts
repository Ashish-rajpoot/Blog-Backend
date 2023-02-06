import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddPostComponent } from './posts/add-post/add-post.component';
import { NewPostComponent } from './posts/new-post/new-post.component';

const routes: Routes = [
  {path: '', component:DashboardComponent},
  {path:'category', component:CategoriesComponent},
  {path:'posts', component:AddPostComponent},
  {path:'post/new', component:NewPostComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
