import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { ServerComponent } from './servers/server/server.component';
import { ServersComponent } from './servers/servers.component';
import { UserComponent } from './users/user/user.component';
import { UsersComponent } from './users/users.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth-guard.service';
import { CanDeactivateGuard } from './servers/edit-server/can-deactivate-guard.service';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ServerResolver } from './servers/server/server-resolver.service';
import { AuthnComponent } from './authn/authn.component';
import { AuthNGuard } from './authn/AuthGuard';

const appRoutes: Routes = [
  {path:'',redirectTo:'auth',pathMatch:'full'},
  {path:'auth',component:AuthnComponent},
  {path: 'home', component: HomeComponent, canActivate:[AuthNGuard],
    children:[
      {path: 'users', component: UsersComponent, 
        children: [
          { path: ':id/:name', component: UserComponent }
        ] 
      },
      {
        path: 'servers',
        // canActivate: [AuthGuard],
        canActivateChild: [AuthNGuard],
        component: ServersComponent,
        children: [
          { path: ':id', component: ServerComponent,resolve:{server:ServerResolver}},
          { path: ':id/edit', canDeactivate:[AuthGuard], component: EditServerComponent }
        ]  
      }
    ] 
  },
  { path: 'not-found', component: PageNotFoundComponent },
  { path: 'error', component: ErrorPageComponent, data: {message: 'Unauthorized Access..!'} },
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [
    // RouterModule.forRoot(appRoutes, {useHash: true})
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
