import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbDateAdapter, NgbDateParserFormatter, NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { of, Subscription, Observable } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, finalize, first, switchMap, tap, map } from 'rxjs/operators';
import { Ingredient } from '../../../_models/ingredient.model';
import { IngredientsService } from '../../../_services';
import { CustomAdapter, CustomDateParserFormatter, getDateFromString } from '../../../../../_metronic/core';

const EMPTY_INGREDIENT: Ingredient = {
  id: undefined,
  title: '',
  image: '',
  calories: null,
  fat: null,
  carbohydrates: null,
  keto: null
};

@Component({
  selector: 'app-edit-ingredient-modal',
  templateUrl: './edit-ingredient-modal.component.html',
  styleUrls: ['./edit-ingredient-modal.component.scss'],
  // NOTE: For this example we are only providing current component, but probably
  // NOTE: you will w  ant to provide your main App Module
  providers: [
    { provide: NgbDateAdapter, useClass: CustomAdapter },
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter },
  ]
})
export class EditIngredientModalComponent implements OnInit, OnDestroy {
  @Input() id: string;
  isLoading$;
  ingredient: Ingredient;
  selectedIngredient: any;
  formGroup: FormGroup;
  searching = false;
  searchFailed = false;
  hideSearchingWhenUnsubscribed = new Observable(() => () => this.searching = false);
  private subscriptions: Subscription[] = [];

  constructor(
    private ingredientsService: IngredientsService,
    private fb: FormBuilder, public modal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    this.isLoading$ = this.ingredientsService.isLoading$;
    this.loadIngredient();
  }

  loadIngredient() {
    if (!this.id) {
      this.ingredient = EMPTY_INGREDIENT;
      this.loadForm();
    } else {
      const sb = this.ingredientsService.getItemById(this.id).pipe(
        first(),
        catchError((errorMessage) => {
          this.modal.dismiss(errorMessage);
          return of(EMPTY_INGREDIENT);
        })
      ).subscribe((ingredient: Ingredient) => {
        this.ingredient = ingredient;
        this.loadForm();
      });
      this.subscriptions.push(sb);
    }
  }

  loadForm() {
    this.formGroup = this.fb.group({
      title: [this.ingredient.title, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(100)])],
    });
  }

  save() {
    this.prepareIngredient();
    if (this.ingredient.id) {
      this.edit();
    } else {
      this.create();
    }
  }

  edit() {
    const sbUpdate = this.ingredientsService.update(this.ingredient).pipe(
      tap(() => {
        this.modal.close();
      }),
      catchError((errorMessage) => {
        this.modal.dismiss(errorMessage);
        return of(this.ingredient);
      }),
    ).subscribe(res => this.ingredient = res);
    this.subscriptions.push(sbUpdate);
  }

  create() {
    const sbCreate = this.ingredientsService.create(this.ingredient).pipe(
      tap(() => {
        this.modal.close();
      }),
      catchError((errorMessage) => {
        this.modal.dismiss(errorMessage);
        return of(this.ingredient);
      }),
    ).subscribe((res: Ingredient) => this.ingredient = res);
    this.subscriptions.push(sbCreate);
  }

  private prepareIngredient() {
    const formData = this.formGroup.value;
    this.ingredient.title = formData.title;
    this.ingredient.image = formData.image;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }

  // helpers for View
  isControlValid(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return control.valid && (control.dirty || control.touched);
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }

  controlHasError(validation, controlName): boolean {
    const control = this.formGroup.controls[controlName];
    return control.hasError(validation) && (control.dirty || control.touched);
  }

  isControlTouched(controlName): boolean {
    const control = this.formGroup.controls[controlName];
    return control.dirty || control.touched;
  }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.searching = true),
      switchMap(term =>
        this.ingredientsService.search(term).pipe(
          tap(() => this.searchFailed = false),
          map((ingredients) => {
            console.log(ingredients)
            return ingredients.map(({ name }) => name)
          }),
          catchError(() => {
            this.searchFailed = true;
            return of([]);
          }))
      ),
      tap(() => this.searching = false)
    );
}
