import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/common/header/header.component';
import { SidefiltersComponent } from './components/sidefilters/sidefilters.component';
import { RightmaincontentComponent } from './components/rightmaincontent/rightmaincontent.component';
import { EmployeeformComponent } from './components/employeeform/employeeform.component';
import { FormsModule } from '@angular/forms';
import { SharedService } from './services/datasharedservice';
import { EmployeecardcomponentComponent } from './components/employeecard/employeecardcomponent.component';
import { EmployeeService } from './services/employee.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmdialogComponent } from './components/confirmdialog/confirmdialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidefiltersComponent,
    RightmaincontentComponent,
    EmployeeformComponent,
    EmployeecardcomponentComponent,
    ConfirmdialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatDialogModule
  ],
  providers: [SharedService,EmployeeService],
  bootstrap: [AppComponent],
})
export class AppModule { }
