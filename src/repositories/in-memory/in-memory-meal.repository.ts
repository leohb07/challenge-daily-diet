import { randomUUID } from 'crypto';
import { MealRepository } from '../../domain/meal.repository';
import { Meal } from '../../domain/meal';

export class InMemoryMealRepository implements MealRepository {
  private mealCollection: Meal[] = [];

  async create(payload: Meal): Promise<Meal> {
    const user = {
      ...payload,
      _id: randomUUID(),
    };

    this.mealCollection.push(user);

    return user;
  }

  async findByName(name: string): Promise<Meal | null> {
    const meal = this.mealCollection.find((where) => where.name === name);

    if (!meal) {
      return null;
    }

    return meal;
  }
}
