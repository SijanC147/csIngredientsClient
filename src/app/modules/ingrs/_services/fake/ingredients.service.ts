import { Injectable, OnDestroy, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { exhaustMap, map } from 'rxjs/operators';
import { TableService, TableResponseModel, ITableState, BaseModel, PaginatorState, SortState, GroupingState } from '../../../../_metronic/shared/crud-table';
import { Ingredient, SpoonSearchResult } from '../../_models/ingredient.model';
import { baseFilter } from '../../../../_fake/fake-helpers/http-extenstions';
import { environment } from '../../../../../environments/environment';
import { Router } from '@angular/router';

const DEFAULT_STATE: ITableState = {
  filter: {},
  paginator: new PaginatorState(),
  sorting: new SortState(),
  searchTerm: '',
  grouping: new GroupingState(),
  entityId: undefined
};

// TODO separate the spoon actions into their own service separate from DynamoDB actions
@Injectable({
  providedIn: 'root'
})
export class IngredientsService extends TableService<Ingredient> implements OnDestroy {
  API_URL = `${environment.apiUrl}/ingredients`;
  constructor(@Inject(HttpClient) http) {
    super(http);
  }

  search(term: string): Observable<SpoonSearchResult[]> {
    const searchApiUrl = `${this.API_URL}/spoon?q=${encodeURI(term)}`
    console.log(term)
    return this.http.get<SpoonSearchResult[]>(searchApiUrl).pipe(
      map((results: SpoonSearchResult[]) => {
        return results
      }))
  }

  getSpoonItem(spoonId: number): Observable<Ingredient> {
    const oneSpoonItemApiUrl = `${this.API_URL}/spoon?id=${spoonId}`
    console.log(spoonId)
    return this.http.get<Ingredient>(oneSpoonItemApiUrl).pipe(
      map((response: Ingredient) => {
        console.log(response)
        return response
      }))
  }

  // READ
  find(tableState: ITableState): Observable<TableResponseModel<Ingredient>> {
    return this.http.get<Ingredient[]>(this.API_URL).pipe(
      map((response: Ingredient[]) => {
        const filteredResult = baseFilter(response, tableState);
        const result: TableResponseModel<Ingredient> = {
          items: filteredResult.items,
          total: filteredResult.total
        };
        return result;
      })
    );
  }

  deleteItems(ids: number[] = []): Observable<any> {
    const tasks$ = [];
    ids.forEach(id => {
      tasks$.push(this.delete(id));
    });
    return forkJoin(tasks$);
  }

  // updateStatusForItems(ids: number[], keto: number): Observable<any> {
  //   return this.http.get<Ingredient[]>(this.API_URL).pipe(
  //     map((Ingredients: Ingredient[]) => {
  //       return Ingredients.filter(c => ids.indexOf(c.id) > -1).map(c => {
  //         c.keto = keto;
  //         return c;
  //       });
  //     }),
  //     exhaustMap((Ingredients: Ingredient[]) => {
  //       const tasks$ = [];
  //       Ingredients.forEach(Ingredient => {
  //         tasks$.push(this.update(Ingredient));
  //       });
  //       return forkJoin(tasks$);
  //     })
  //   );
  // }

  ngOnDestroy() {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }
}
