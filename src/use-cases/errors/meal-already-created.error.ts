export class MealAlreadyCreatedError extends Error {
  constructor() {
    super('Meal already created.');
  }
}
