import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewDeltioComponent } from './new-deltio.component';

const routes: Routes = [
    { path: '', component: NewDeltioComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class NewDeltioRoutingModule { }
