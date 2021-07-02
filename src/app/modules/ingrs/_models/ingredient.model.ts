import { BaseModel } from '../../../_metronic/shared/crud-table';

export interface Nutritient {
  amount: number;
  unit: string;
}
export interface Ingredient extends BaseModel {
  id: string;
  title: string;
  image: string;
  calories: Nutritient;
  fat: Nutritient;
  carbohydrates: Nutritient;
  keto?: number;
}

export interface SpoonSearchResult extends BaseModel {
  id: number;
  name: string;
  image: string;
}


