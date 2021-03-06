import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IngrsComponent } from './ingrs.component';
import { IngredientsComponent } from './ingredients/ingredients.component';

const routes: Routes = [
  {
    path: '',
    component: IngrsComponent,
    children: [
      {
        path: 'ingredients',
        component: IngredientsComponent,
      },
      { path: '', redirectTo: 'ingredients', pathMatch: 'full' },
      { path: '**', redirectTo: 'ingredients', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IngrsRoutingModule { }
