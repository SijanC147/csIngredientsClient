import { BaseModel } from '../../../_metronic/shared/crud-table';

export interface Ingredient extends BaseModel {
  id: number;
  title: string;
  image: string;
  calories: number;
  fat: number;
  carbohydrates: number;
  keto: number; // no = 0 | yes = 1
  // userName: string;
  // gender: string;
  // status: number; // Active = 1 | Suspended = 2 | Pending = 3
  // dateOfBbirth: string;
  // dob: Date;
  // ipAddress: string;
  // type: number; // 1 = Business | 2 = Individual
}
