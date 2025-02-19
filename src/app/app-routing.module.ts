import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PasswordListComponent } from './pages/password-list/password-list.component';
import { PasswordAddComponent } from './pages/password-add/password-add.component';

const routes: Routes = [
  { path: '', component: PasswordListComponent },
  { path: 'add', component: PasswordAddComponent },
  { path: 'update/:id', component: PasswordAddComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
