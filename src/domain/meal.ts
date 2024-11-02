export type Meal = {
  _id?: string;
  userId: string;
  name: string;
  description: string;
  createdAt: Date;
  isWithinDiet: boolean;
};
