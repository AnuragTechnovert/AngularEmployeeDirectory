import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/common/header/header.component';
import { CategoryFiltersComponent } from './components/category-filters/category-filters.component';
import { ContactsComponent } from './components/contacts/contacts.component'
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';
import { FormsModule } from '@angular/forms';
import { SharedService } from './services/shared.service';
import { EmployeeCardComponent } from './components/employee-card/employee-card.component';
import { EmployeeService } from './services/employee.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { FiltersComponent } from './components/filters/filters.component';
import { FilterService } from './services/filter.service';
import { ContentComponent } from './components/content/content.component';

@NgModule({
  declarations: [
    AppComponent,
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
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatDialogModule
  ],
  providers: [SharedService, EmployeeService, FilterService],
  bootstrap: [AppComponent],
})
export class AppModule { }
