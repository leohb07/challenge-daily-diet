import { Meal } from '../domain/meal';
import { MealRepository } from '../domain/meal.repository';
import { UserRepository } from '../domain/user.repository';
import { MealAlreadyCreatedError } from './errors/meal-already-created.error';
import { UserNotFoundError } from './errors/user-not-found.error';

export type CreateMealUseCaseRequest = {
  userId: string;
  name: string;
  description: string;
  isWithinDiet: boolean;
};

export type CreateMealUseCaseResponse = {
  meal: Meal;
};

export class CreateMealUseCase {
  constructor(
    private mealRepository: MealRepository,
    private userRepository: UserRepository,
  ) {}

  async execute({
    userId,
    name,
    description,
    isWithinDiet = false,
  }: CreateMealUseCaseRequest): Promise<CreateMealUseCaseResponse> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new UserNotFoundError();
    }

    const mealWithSameName = await this.mealRepository.findByName(name);
    if (mealWithSameName) {
      throw new MealAlreadyCreatedError();
    }

    const input: Meal = {
      userId,
      name,
      description,
      createdAt: new Date(),
      isWithinDiet,
    };

    const meal = await this.mealRepository.create(input);

    return {
      meal,
    };
  }
}
