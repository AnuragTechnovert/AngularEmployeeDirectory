import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedService } from './services/shared.service';
import { EmployeeService } from './services/employee.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { FilterService } from './services/filter.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthenticationModule } from './authentication/authentication.module';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { JwtModule } from '@auth0/angular-jwt';
import { DashboardModule } from './dashboard/dashboard.module';
import { MasterDataService } from './services/master-data.service';

export function tokenGetter() {
  return localStorage.getItem("jwt");
}

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        NavbarComponent,
    ],
    providers: [SharedService, EmployeeService, FilterService,MasterDataService],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatSnackBarModule,
        MatDialogModule,
        HttpClientModule,
        AuthenticationModule,
        DashboardModule,
        JwtModule.forRoot({
            config: {
                tokenGetter: tokenGetter,
                allowedDomains: ["localhost:44394"],
                disallowedRoutes: []
            }
        }),
    ]
})
export class AppModule { }
