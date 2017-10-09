import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientsComponent } from './clients.component';
import { ClientsDetailComponent } from './clients-detail.component/clients-detail.component';

const routes: Routes = [
    { path: '', component: ClientsComponent },
    {
        path: ':id',
        component: ClientsDetailComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ClientsRoutingModule { }
