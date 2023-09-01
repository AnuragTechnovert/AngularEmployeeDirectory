import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';
import { LoginComponent } from './authentication/login/login.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: 'employee/:mode', component: EmployeeFormComponent },
  { path: 'employees', component: AppComponent },
  {path: 'login', component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
