

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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";
//import { UserModule } from './user/user.module';
//import { LayoutModule } from './layout/layout.module';
import { HttpClientModule } from '@angular/common/http';
import { FileUploadModule } from 'ng2-file-upload';
//import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthenticationService } from './services/authentication.service';
import { UserComponent } from './Register/user.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateComponent } from './issue/create/create.component';
import { SearchComponent } from './issue/search/search.component';
import { ViewComponent } from './issue/view/view.component';
import { NavComponent } from './layout/nav/nav.component';
import { IssueListComponent } from './issue/issue-list/issue-list.component';


// Import library module
//import { NgxSpinnerModule } from 'ngx-spinner';
import { DataTablesModule } from 'angular-datatables';
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
    LoginComponent,
    DashboardComponent,
    CreateComponent,
    SearchComponent,
    ViewComponent,
    NavComponent,
    IssueListComponent
  ],
  imports: [
    BrowserModule, 
    FormsModule,
    AppRoutingModule,
    SocialLoginModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    DataTablesModule,
   // LayoutModule,
    //UserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    
    FileUploadModule,
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

