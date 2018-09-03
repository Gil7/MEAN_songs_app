import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home/home.component';
import { ArtistListComponent }  from './components/artist/artist-list/artist-list.component';
import { CreateArtistComponent }  from './components/artist/create-artist/create-artist.component';
import { EditArtistComponent }  from './components/artist/edit-artist/edit-artist.component';
import { DetailArtistComponent }  from './components/artist/detail-artist/detail-artist.component';
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
      path: 'edit-artist/:id',
      component: EditArtistComponent
    },
    {
      path: 'detail-artist/:id',
      component: DetailArtistComponent

    },
    {
      path:'add-artist',
      component: CreateArtistComponent
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
