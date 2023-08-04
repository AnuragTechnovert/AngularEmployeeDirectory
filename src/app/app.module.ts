import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MaincontentComponent } from './maincontent/maincontent.component';
import { SidefiltersComponent } from './maincontent/sidefilters/sidefilters.component';
import { RightmaincontentComponent } from './maincontent/rightmaincontent/rightmaincontent.component';
import { EmployeeformComponent } from './maincontent/rightmaincontent/employeeform/employeeform.component';
import { FormsModule } from '@angular/forms';
import { SharedVaribleService } from './maincontent/rightmaincontent/employeeservices/variblesservice';
import { EmployeecardcomponentComponent } from './maincontent/rightmaincontent/employeecardcomponent/employeecardcomponent.component';
import { EmployeedetailsComponent } from './maincontent/rightmaincontent/employeedetails/employeedetails.component';
import { EmployeeFormService } from './maincontent/rightmaincontent/employeeservices/employeeformservice';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MaincontentComponent,
    SidefiltersComponent,
    RightmaincontentComponent,
    EmployeeformComponent,
    EmployeecardcomponentComponent,
    EmployeedetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [SharedVaribleService,EmployeeFormService],
  bootstrap: [AppComponent]
})
export class AppModule { }
