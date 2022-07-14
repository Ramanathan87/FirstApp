import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { ServersComponent } from './servers/servers.component';
import { UserComponent } from './users/user/user.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { ServerComponent } from './servers/server/server.component';
import { ServersService } from './servers/servers.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth-guard.service';
import { CanDeactivateGuard } from './servers/edit-server/can-deactivate-guard.service';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ServerResolver } from './servers/server/server-resolver.service';
import { ReactiveFormsComponent } from './reactive-forms/reactive-forms.component';
import { TemplateFormsComponent } from './template-forms/template-forms.component';
import { PipesComponent } from './pipes/pipes.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FilterPipe } from './pipes/filter.pipe';
import { ShortenPipe } from './pipes/shorten.pipe';
import { HttpReqComponent } from './http-req/http-req.component';
import { LoggingInterceptorService } from './http-req/logging-interceptor.service';
import { AuthInterceptorService } from './http-req/auth-interceptor.service';
import { AuthnComponent } from './authn/authn.component';

import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';
import { RxjsComponent } from './rxjs/rxjs.component';
import { AuthNGuard } from './authn/AuthGuard';
import { SpringbootComponent } from './springboot/springboot.component';
// import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
// import { provideAuth,getAuth } from '@angular/fire/auth';
// import { provideDatabase,getDatabase } from '@angular/fire/database';
// import { provideFirestore,getFirestore } from '@angular/fire/firestore';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UsersComponent,
    ServersComponent,
    UserComponent,
    EditServerComponent,
    ServerComponent,
    PageNotFoundComponent,
    ErrorPageComponent,
    ReactiveFormsComponent,
    TemplateFormsComponent,
    PipesComponent,ShortenPipe,
    FilterPipe,
    HttpReqComponent,
    AuthnComponent,
    RxjsComponent,
    SpringbootComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,ReactiveFormsModule,
    AppRoutingModule,HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    // provideFirebaseApp(() => initializeApp(environment.firebase)),
    // provideAuth(() => getAuth()),
    // provideDatabase(() => getDatabase()),
    // provideFirestore(() => getFirestore())
  ],
  providers: [ServersService, AuthService, AuthGuard,AuthNGuard, CanDeactivateGuard, ServerResolver,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoggingInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
