import { Meal } from './meal';

export interface MealRepository {
  create(payload: Meal): Promise<Meal>;
  findByName(name: string): Promise<Meal | null>;
}
