import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditComponent }  from './components/user/edit/edit.component';

const appRoutes: Routes = [
    {
        path: '',
        component: EditComponent
    },
    {
        path:'profile',
        component: EditComponent
    },
    {
        path : '**',
        component: EditComponent
    }
]
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);