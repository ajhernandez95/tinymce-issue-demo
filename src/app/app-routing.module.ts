import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TinymceComponent } from './components/tinymce/tinymce.component';


const routes: Routes = [
  {
    path: '',
    component: TinymceComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
