import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { InlineSVGModule } from 'ng-inline-svg';
import { IngredientsComponent } from './ingredients/ingredients.component';
import { IngrsComponent } from './ingrs.component';
import { IngrsRoutingModule } from './ingrs-routing.module';
import { CRUDTableModule } from '../../_metronic/shared/crud-table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeleteIngredientModalComponent } from './ingredients/components/delete-ingredient-modal/delete-ingredient-modal.component';
import { DeleteIngredientsModalComponent } from './ingredients/components/delete-ingredients-modal/delete-ingredients-modal.component';
import { FetchIngredientsModalComponent } from './ingredients/components/fetch-ingredients-modal/fetch-ingredients-modal.component';
import { UpdateIngredientsStatusModalComponent } from './ingredients/components/update-ingredients-status-modal/update-ingredients-status-modal.component';
import { EditIngredientModalComponent } from './ingredients/components/edit-ingredient-modal/edit-ingredient-modal.component';
import { NgbDatepickerModule, NgbModalModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { CoreModule } from 'src/app/_metronic/core';

@NgModule({
  declarations: [
    IngredientsComponent,
    IngrsComponent,
    DeleteIngredientModalComponent,
    DeleteIngredientsModalComponent,
    FetchIngredientsModalComponent,
    UpdateIngredientsStatusModalComponent,
    EditIngredientModalComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    IngrsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    InlineSVGModule,
    CRUDTableModule,
    NgbModalModule,
    NgbDatepickerModule,
    NgbTypeaheadModule,
    CoreModule
  ],
  entryComponents: [
    DeleteIngredientModalComponent,
    DeleteIngredientsModalComponent,
    UpdateIngredientsStatusModalComponent,
    FetchIngredientsModalComponent,
    EditIngredientModalComponent,
  ]
})
export class IngrsModule { }
