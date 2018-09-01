import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home/home.component';
import { ArtistListComponent }  from './components/artist/artist-list/artist-list.component';
import { EditComponent }  from './components/user/edit/edit.component';
const appRoutes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
      path: 'artists/:page',
      component: ArtistListComponent

    },
    {
        path:'profile',
        component: EditComponent
    },
    {
        path : '**',
        component: HomeComponent
    }
]
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
