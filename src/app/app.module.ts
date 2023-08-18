import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/common/header/header.component';
import { SidefiltersComponent } from './components/leftfilters/leftfilters.component';
import { ContactsComponent } from './components/contacts/contacts.component'
import { EmployeeformComponent } from './components/employeeform/employeeform.component';
import { FormsModule } from '@angular/forms';
import { SharedService } from './services/shared.service';
import { EmployeecardcomponentComponent } from './components/employeecard/employeecardcomponent.component';
import { EmployeeService } from './services/employee.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmdialogComponent } from './components/confirmdialog/confirmdialog.component';
import { TopfiltersComponent } from './components/topfilters/topfilters.component';
import { FilterService } from './services/filter.service';
import { RightcontentComponent } from './components/rightcontent/rightcontent.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidefiltersComponent,
    ContactsComponent,
    EmployeeformComponent,
    EmployeecardcomponentComponent,
    ConfirmdialogComponent,
    TopfiltersComponent,
    RightcontentComponent,
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
