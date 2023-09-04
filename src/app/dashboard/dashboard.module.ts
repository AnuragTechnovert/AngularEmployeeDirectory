import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { HeaderComponent } from './components/common/header/header.component';
import { CategoryFiltersComponent } from './components/category-filters/category-filters.component';
import { ContentComponent } from './components/content/content.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';
import { EmployeeCardComponent } from './components/employee-card/employee-card.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { FiltersComponent } from './components/filters/filters.component';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { AuthenticationModule } from '../authentication/authentication.module';
import { DashboardRoutingModule } from './dashboard-routing.module';


@NgModule({
  declarations: [
    DashboardComponent,
    HeaderComponent,
    CategoryFiltersComponent,
    ContactsComponent,
    EmployeeFormComponent,
    EmployeeCardComponent,
    ConfirmDialogComponent,
    FiltersComponent,
    ContentComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,  
    MatSnackBarModule,
    MatDialogModule,
    AuthenticationModule,
  ]
  ,
  exports:[
    DashboardComponent,
    HeaderComponent,
    CategoryFiltersComponent,
    ContactsComponent,
    EmployeeFormComponent,
    EmployeeCardComponent,
    ConfirmDialogComponent,
    FiltersComponent,
    ContentComponent,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
