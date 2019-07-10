// import { BrowserModule } from '@angular/platform-browser';
// import { NgModule } from '@angular/core';

// import { AppRoutingModule } from './app-routing.module';
// import { AppComponent } from './app.component';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { MainNavComponent } from './main-nav/main-nav.component';
// import { FirstComponent } from './first/first.component';
// import { SecondComponent } from './second/second.component';
// import { LayoutModule } from '@angular/cdk/layout';
// import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';

// @NgModule({
//   declarations: [
//     AppComponent,
//     MainNavComponent,
//     FirstComponent,
//     SecondComponent,
//     MainNavComponent
//   ],
//   imports: [
//     BrowserModule,
//     AppRoutingModule,
//     BrowserAnimationsModule,
//     LayoutModule,
//     MatToolbarModule,
//     MatButtonModule,
//     MatSidenavModule,
//     MatIconModule,
//     MatListModule
//   ],
//   providers: [],
//   bootstrap: [AppComponent]
// })
// export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';


//import { BsDropdownModule, TabsModule } from 'ngx-bootstrap';

import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider
} from 'angular-6-social-login';
//import { FormsModule } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { UserModule } from './user/user.module';
//import { LayoutModule } from './layout/layout.module';
import { HttpClientModule } from '@angular/common/http';
//import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthenticationService } from './services/authentication.service';
import { UserComponent } from './Register/user.component';


// Import library module
//import { NgxSpinnerModule } from 'ngx-spinner';
//import { DataTablesModule } from 'angular-datatables';
//import { IssueModule } from './issue/issue.module';


//for rich text editor
//import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

//for file upload
//import { FileUploadModule } from 'ng2-file-upload';
export function getAuthServiceConfigs() {
  const config = new AuthServiceConfig(
    [
      {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider('1091082596943-49t59doqnuiim4fl7nuvt1229md2us09.apps.googleusercontent.com')
      }
    ]
  );
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule, 
    FormsModule,
    AppRoutingModule,
    FormsModule,
    SocialLoginModule,
    ReactiveFormsModule,
   // LayoutModule,
    //UserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    
    //FileUploadModule,
    // BsDropdownModule.forRoot(),
     ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    })
  ],
  providers: [{
    provide: AuthServiceConfig,
    useFactory: getAuthServiceConfigs
  }, AuthenticationService],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }

