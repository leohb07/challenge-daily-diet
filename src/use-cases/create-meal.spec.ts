import { MealRepository } from '../domain/meal.repository';
import { UserRepository } from '../domain/user.repository';
import { InMemoryMealRepository } from '../repositories/in-memory/in-memory-meal.repository';
import { InMemoryUserRepository } from '../repositories/in-memory/in-memory-user.repository';
import { generatePasswordHash } from '../util/generate-password-hash.util';
import { CreateMealUseCase } from './create-meal';
import { MealAlreadyCreatedError } from './errors/meal-already-created.error';
import { UserNotFoundError } from './errors/user-not-found.error';

let mealRepository: MealRepository;
let userRepository: UserRepository;
let sut: CreateMealUseCase;

describe('Create Meal', () => {
  beforeEach(() => {
    mealRepository = new InMemoryMealRepository();
    userRepository = new InMemoryUserRepository();
    sut = new CreateMealUseCase(mealRepository, userRepository);
  });

  it('should not be able create meal without user id', async () => {
    expect(
      async () =>
        await sut.execute({
          userId: '',
          name: 'Breakfast',
          description: 'Favorite meal',
          isWithinDiet: true,
        }),
    ).rejects.toBeInstanceOf(UserNotFoundError);
  });

  it('should not be able create meal with same name', async () => {
    const user = await userRepository.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: await generatePasswordHash('123456'),
    });

    await sut.execute({
      userId: user._id as string,
      name: 'Breakfast',
      description: 'Favorite meal',
      isWithinDiet: true,
    });

    expect(
      async () =>
        await sut.execute({
          userId: user._id as string,
          name: 'Breakfast',
          description: 'Favorite meal',
          isWithinDiet: true,
        }),
    ).rejects.toBeInstanceOf(MealAlreadyCreatedError);
  });

  it('should be able create meal', async () => {
    const user = await userRepository.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: await generatePasswordHash('123456'),
    });

    const { meal } = await sut.execute({
      userId: user._id as string,
      name: 'Breakfast',
      description: 'Favorite meal',
      isWithinDiet: true,
    });

    expect(meal._id).toEqual(expect.any(String));
    expect(meal).toEqual(
      expect.objectContaining({
        name: 'Breakfast',
      }),
    );
  });
});
