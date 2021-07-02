import { BaseModel } from '../../../_metronic/shared/crud-table';

export interface Nutrient {
  amount: number;
  unit: string;
}
export interface Ingredient extends BaseModel {
  id: string;
  title: string;
  image: string;
  calories?: Nutrient;
  fat?: Nutrient;
  carbohydrates?: Nutrient;
}

export interface SpoonSearchResult extends BaseModel {
  id: number;
  name: string;
  image: string;
}


