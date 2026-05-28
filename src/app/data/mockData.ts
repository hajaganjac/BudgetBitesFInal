// v2 mock data per Section 6 + 8 of the iteration2 spec.

export type DietTag = 'Vegan' | 'Vegetarian' | 'Halal';
export type Store = 'Aldi' | 'Lidl' | 'Albert Heijn';
export type Category = 'Breakfast' | 'Lunch' | 'Dinner' | 'Soup';

export interface Recipe {
  id: number;
  name: string;
  category: Category;
  store: Store;
  dietary: DietTag[];
  price: number;
  kcal: number;
  timeMin: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  protein: number;
  carbs: number;
  fat: number;
  description: string;
  ingredients: string[];
  steps: string[];
}

export const recipes: Recipe[] = [
  {
    id: 1, name: 'Banana Oat Porridge', category: 'Breakfast', store: 'Aldi',
    dietary: ['Vegan', 'Halal'], price: 0.70, kcal: 350, timeMin: 8, difficulty: 'Easy',
    protein: 10, carbs: 62, fat: 6,
    description: 'Warm, creamy oats topped with banana — the cheapest breakfast in town.',
    ingredients: ['50g rolled oats', '200ml plant milk', '1 banana', '1 tsp cinnamon', '1 tsp honey or maple syrup'],
    steps: ['Bring milk to a gentle simmer.', 'Add oats, stir, cook 4 min.', 'Slice banana on top, sprinkle cinnamon, drizzle syrup.'],
  },
  {
    id: 2, name: 'Egg & Cheese Omelette', category: 'Breakfast', store: 'Lidl',
    dietary: ['Vegetarian', 'Halal'], price: 0.90, kcal: 320, timeMin: 10, difficulty: 'Easy',
    protein: 22, carbs: 4, fat: 20,
    description: 'A fluffy two-egg omelette with melted cheese — protein on a budget.',
    ingredients: ['2 eggs', '30g grated cheese', 'Pinch of salt and pepper', '1 tsp butter or oil'],
    steps: ['Beat eggs with salt and pepper.', 'Melt butter in a pan over medium heat.', 'Pour eggs in, sprinkle cheese on one side.', 'Fold and serve when set.'],
  },
  {
    id: 3, name: 'Hearty Lentil Soup', category: 'Soup', store: 'Aldi',
    dietary: ['Vegan', 'Halal'], price: 1.20, kcal: 380, timeMin: 30, difficulty: 'Easy',
    protein: 22, carbs: 58, fat: 4,
    description: 'A thick, warming bowl of lentils, carrots and onion.',
    ingredients: ['150g red lentils', '1 carrot, diced', '1 onion, chopped', '1 garlic clove', '1 tsp cumin', '750ml vegetable stock', 'Salt, pepper'],
    steps: ['Sauté onion and garlic until soft.', 'Add carrot and cumin, cook 2 min.', 'Add lentils and stock, simmer 25 min.', 'Blend lightly for texture, season to taste.'],
  },
  {
    id: 4, name: 'Avocado Toast', category: 'Breakfast', store: 'Albert Heijn',
    dietary: ['Vegetarian', 'Halal'], price: 1.40, kcal: 310, timeMin: 7, difficulty: 'Easy',
    protein: 8, carbs: 30, fat: 18,
    description: 'Toasted sourdough, smashed avocado, lemon and chilli flakes.',
    ingredients: ['2 slices bread', '1 ripe avocado', '1 tsp lemon juice', 'Chilli flakes', 'Salt'],
    steps: ['Toast bread until golden.', 'Mash avocado with lemon and salt.', 'Spread on toast, top with chilli flakes.'],
  },
  {
    id: 5, name: 'Pasta Aglio e Olio', category: 'Dinner', store: 'Lidl',
    dietary: ['Vegan', 'Halal'], price: 0.80, kcal: 480, timeMin: 12, difficulty: 'Easy',
    protein: 14, carbs: 78, fat: 12,
    description: 'Garlic, olive oil and chilli — the original five-ingredient pasta.',
    ingredients: ['120g spaghetti', '3 garlic cloves, sliced', '3 tbsp olive oil', 'Chilli flakes', 'Parsley', 'Salt'],
    steps: ['Boil pasta in salted water.', 'Gently fry garlic in oil with chilli — do not brown.', 'Toss drained pasta in the oil with a splash of pasta water.', 'Finish with parsley.'],
  },
  {
    id: 6, name: 'Koshari', category: 'Dinner', store: 'Aldi',
    dietary: ['Vegan', 'Halal'], price: 1.10, kcal: 520, timeMin: 25, difficulty: 'Easy',
    protein: 18, carbs: 92, fat: 8,
    description: 'Egyptian comfort food: rice, lentils, pasta and crispy onions.',
    ingredients: ['80g rice', '60g brown lentils', '60g small pasta', '1 onion, sliced', '200ml tomato sauce', 'Cumin, vinegar'],
    steps: ['Boil lentils until tender, drain.', 'Cook rice and pasta separately.', 'Fry onions until crispy.', 'Layer lentils, rice, pasta, top with tomato sauce and onions.'],
  },
  { id: 7, name: 'Mujadara (Lentils & Rice)', category: 'Dinner', store: 'Aldi', dietary: ['Vegan', 'Halal'], price: 0.90, kcal: 460, timeMin: 30, difficulty: 'Easy', protein: 16, carbs: 78, fat: 8, description: 'Levantine rice and lentils with caramelised onions.', ingredients: ['100g lentils', '80g rice', '2 onions', 'Olive oil', 'Cumin'], steps: ['Cook lentils until almost tender.', 'Add rice and cook together.', 'Top with deeply caramelised onions.'] },
  { id: 8, name: 'Chickpea Curry', category: 'Dinner', store: 'Lidl', dietary: ['Vegan', 'Halal'], price: 1.30, kcal: 440, timeMin: 20, difficulty: 'Easy', protein: 18, carbs: 60, fat: 12, description: 'A quick chickpea curry with tomato and coconut.', ingredients: ['1 can chickpeas', '1 can chopped tomatoes', '100ml coconut milk', 'Curry powder', 'Onion, garlic'], steps: ['Sauté onion and garlic.', 'Add curry powder, tomatoes, chickpeas.', 'Simmer 10 min, stir in coconut milk.'] },
  { id: 9, name: 'Egg Fried Rice', category: 'Lunch', store: 'Aldi', dietary: ['Vegetarian', 'Halal'], price: 0.95, kcal: 510, timeMin: 15, difficulty: 'Easy', protein: 18, carbs: 70, fat: 16, description: 'Day-old rice, eggs, soy and spring onion.', ingredients: ['200g cooked rice', '2 eggs', '2 tbsp soy sauce', 'Spring onion', 'Garlic'], steps: ['Scramble eggs in oil, set aside.', 'Fry garlic, add rice and soy.', 'Stir eggs back in, top with spring onion.'] },
  { id: 10, name: 'Jacket Potato + Beans', category: 'Lunch', store: 'Albert Heijn', dietary: ['Vegan', 'Halal'], price: 1.10, kcal: 420, timeMin: 60, difficulty: 'Easy', protein: 14, carbs: 80, fat: 4, description: 'Crispy-skin baked potato, baked beans and a touch of margarine.', ingredients: ['1 large potato', '1 can baked beans', 'Salt'], steps: ['Bake potato at 200°C for 50–60 min.', 'Heat beans, split potato, spoon beans inside.'] },
  { id: 11, name: 'Shakshuka', category: 'Breakfast', store: 'Lidl', dietary: ['Vegetarian', 'Halal'], price: 1.50, kcal: 380, timeMin: 20, difficulty: 'Medium', protein: 18, carbs: 22, fat: 22, description: 'Eggs poached in a spiced tomato and pepper sauce.', ingredients: ['2 eggs', '1 can chopped tomatoes', '1 pepper', 'Paprika, cumin', 'Onion, garlic'], steps: ['Sauté onion, garlic, pepper.', 'Add spices and tomatoes, simmer 8 min.', 'Crack eggs in, cover, cook until whites set.'] },
  { id: 12, name: 'Tomato Soup with Bread', category: 'Soup', store: 'Aldi', dietary: ['Vegan', 'Halal'], price: 0.85, kcal: 290, timeMin: 15, difficulty: 'Easy', protein: 6, carbs: 50, fat: 6, description: 'Classic tomato soup served with crusty bread.', ingredients: ['1 can chopped tomatoes', '1 onion', 'Vegetable stock', 'Bread'], steps: ['Sauté onion, add tomatoes and stock.', 'Simmer 10 min, blend smooth.', 'Serve with bread.'] },
  { id: 13, name: 'Banana Pancakes', category: 'Breakfast', store: 'Lidl', dietary: ['Vegetarian', 'Halal'], price: 0.95, kcal: 360, timeMin: 12, difficulty: 'Easy', protein: 10, carbs: 60, fat: 8, description: 'Three-ingredient pancakes with banana, egg and flour.', ingredients: ['1 banana', '2 eggs', '50g flour'], steps: ['Mash banana, mix with eggs and flour.', 'Cook small pancakes in a non-stick pan.'] },
  { id: 14, name: 'Tuna Pasta Salad', category: 'Lunch', store: 'Albert Heijn', dietary: ['Halal'], price: 1.60, kcal: 470, timeMin: 15, difficulty: 'Easy', protein: 26, carbs: 60, fat: 12, description: 'Pasta tossed with tuna, sweetcorn and a light dressing.', ingredients: ['120g pasta', '1 can tuna', '1 small can sweetcorn', 'Mayonnaise, lemon'], steps: ['Cook pasta, cool.', 'Mix with tuna, corn, mayo and lemon.'] },
  { id: 15, name: 'Halloumi Wrap', category: 'Lunch', store: 'Lidl', dietary: ['Vegetarian', 'Halal'], price: 1.80, kcal: 510, timeMin: 12, difficulty: 'Easy', protein: 22, carbs: 48, fat: 24, description: 'Pan-fried halloumi in a wrap with salad and yoghurt.', ingredients: ['80g halloumi', '1 wrap', 'Lettuce, tomato', 'Yoghurt'], steps: ['Fry halloumi until golden.', 'Fill wrap with salad, halloumi and yoghurt.'] },
  { id: 16, name: 'Red Lentil Dal', category: 'Dinner', store: 'Aldi', dietary: ['Vegan', 'Halal'], price: 1.00, kcal: 410, timeMin: 25, difficulty: 'Easy', protein: 20, carbs: 60, fat: 6, description: 'Soft red lentils simmered with onion, garlic and spices.', ingredients: ['150g red lentils', 'Onion, garlic, ginger', 'Curry powder, turmeric', 'Stock'], steps: ['Sauté onion, garlic, ginger.', 'Add spices and lentils with stock.', 'Simmer 20 min until creamy.'] },
];

export const todaysPlan = [
  { meal: 'Breakfast', recipeId: 1, kcal: 350 },
  { meal: 'Lunch',     recipeId: 3, kcal: 380 },
  { meal: 'Dinner',    recipeId: 2, kcal: 320 },
];

export const todaysTotals = {
  kcal: 1050, protein: 62, carbs: 145, fat: 28, cost: 2.80,
};

export interface GroceryItem {
  id: string;
  name: string;
  store?: Store;
  bought: boolean;
  cheaperAt?: { store: Store; saving: number };
}

export const groceryItems: GroceryItem[] = [
  { id: 'g1', name: 'Red lentils (500g)',    store: 'Aldi',         bought: false, cheaperAt: { store: 'Lidl', saving: 0.40 } },
  { id: 'g2', name: 'Minced beef (300g)',    store: 'Lidl',         bought: false },
  { id: 'g3', name: 'Frozen mixed veg',      store: 'Albert Heijn', bought: false },
  { id: 'g4', name: 'Canned tomatoes (2x)',  store: 'Aldi',         bought: false, cheaperAt: { store: 'Lidl', saving: 0.30 } },
  { id: 'g5', name: 'Avocados (2x)',         store: 'Albert Heijn', bought: false },
  { id: 'g6', name: 'Spaghetti (500g)',      store: 'Lidl',         bought: true  },
  { id: 'g7', name: 'Eggs (12-pack)',        store: undefined,      bought: true  },
  { id: 'g8', name: 'Coconut milk (can)',    store: 'Albert Heijn', bought: true  },
];

// Sun → Sat
export const weeklySpending = [
  { day: 'Sun', value: 1.90 },
  { day: 'Mon', value: 2.30 },
  { day: 'Tue', value: 0.80 },
  { day: 'Wed', value: 0.95 },
  { day: 'Thu', value: 2.60 },
  { day: 'Fri', value: 3.80 },
  { day: 'Sat', value: 0 },
];

export interface Badge {
  id: string;
  name: string;
  description: string;
  iconName: string;
  xp: number;
  unlocked: boolean;
  progress: number;   // 0..1
  progressLabel: string;
}

export const badges: Badge[] = [
  { id: 'first_bite',     name: 'First Bite',     description: 'Cook your very first meal',           iconName: 'Egg',         xp: 50,  unlocked: true,  progress: 1,    progressLabel: '1/1' },
  { id: 'on_fire',        name: 'On Fire',        description: 'Cook 3 days in a row',                iconName: 'Flame',       xp: 75,  unlocked: true,  progress: 1,    progressLabel: '3/3' },
  { id: 'week_warrior',   name: 'Week Warrior',   description: 'Cook every day for 7 days',           iconName: 'CalendarDays',xp: 150, unlocked: true,  progress: 1,    progressLabel: '7/7' },
  { id: 'going_green',    name: 'Going Green',    description: 'Cook 5 vegan or vegetarian meals',    iconName: 'Sprout',      xp: 100, unlocked: true,  progress: 1,    progressLabel: '5/5' },
  { id: 'speed_demon',    name: 'Speed Demon',    description: 'Cook 3 meals in under 10 minutes',    iconName: 'Zap',         xp: 75,  unlocked: true,  progress: 1,    progressLabel: '3/3' },
  { id: 'money_saver',    name: 'Money Saver',    description: 'Save €50 vs eating out',              iconName: 'PiggyBank',   xp: 125, unlocked: true,  progress: 1,    progressLabel: '€50/€50' },
  { id: 'picky_eater',    name: 'Picky Eater',    description: 'Save 5 recipes to favourites',        iconName: 'Heart',       xp: 50,  unlocked: false, progress: 0.4,  progressLabel: '2/5' },
  { id: 'iron_chef',      name: 'Iron Chef',      description: 'Cook 20 meals total',                 iconName: 'ChefHat',     xp: 200, unlocked: false, progress: 0.45, progressLabel: '9/20' },
  { id: 'kitchen_legend', name: 'Kitchen Legend', description: 'Cook 50 meals total',                 iconName: 'Crown',       xp: 500, unlocked: false, progress: 0.18, progressLabel: '9/50' },
  { id: 'sunday_planner', name: 'Sunday Planner', description: 'Plan 4 weeks in a row',               iconName: 'CalendarCheck', xp: 200, unlocked: false, progress: 0, progressLabel: '0/4' },
  { id: 'smart_shopper',  name: 'Smart Shopper',  description: 'Buy from the cheapest store 5 times', iconName: 'ShoppingBag', xp: 100, unlocked: false, progress: 0, progressLabel: '0/5' },
];

export const levels = [
  { level: 1, name: 'Hungry Student',  iconName: 'Cookie' },
  { level: 2, name: 'Kitchen Rookie',  iconName: 'UtensilsCrossed' },
  { level: 3, name: 'Budget Chef',     iconName: 'ChefHat' },
  { level: 4, name: 'Flavor Hunter',   iconName: 'Flame' },
  { level: 5, name: 'Iron Chef',       iconName: 'Trophy' },
  { level: 6, name: 'Kitchen Legend',  iconName: 'Crown' },
];

export type WeekDay = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';
export const weekDays: WeekDay[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
export type Meal = 'Breakfast' | 'Lunch' | 'Dinner';
export const mealSlots: Meal[] = ['Breakfast', 'Lunch', 'Dinner'];

export interface WeekSlot {
  day: WeekDay;
  meal: Meal;
  recipeId: number | null;
}

export const weekPlan: WeekSlot[] = [
  // Mon — fully filled
  { day: 'Mon', meal: 'Breakfast', recipeId: 1 },
  { day: 'Mon', meal: 'Lunch',     recipeId: 9 },
  { day: 'Mon', meal: 'Dinner',    recipeId: 5 },
  // Tue — fully filled
  { day: 'Tue', meal: 'Breakfast', recipeId: 4 },
  { day: 'Tue', meal: 'Lunch',     recipeId: 3 },
  { day: 'Tue', meal: 'Dinner',    recipeId: 16 },
  // Wed–Sun empty
  ...(['Wed','Thu','Fri','Sat','Sun'] as WeekDay[]).flatMap(d => mealSlots.map(m => ({ day: d, meal: m, recipeId: null as number | null }))),
];

export const initialUser = {
  name: 'Harun',
  avatar: '👨‍🎓',
  level: 2,
  levelName: 'Kitchen Rookie',
  xp: 225,
  xpForNext: 250,
  streakDays: 7,
  weeklyMealGoal: 4,
  weeklyMealsCooked: 5,
  calorieGoal: 2000,
  weeklyBudget: 35,
  weeklySpent: 13.60,
  savedThisMonth: 76,
  motivationStyle: 'balanced' as 'calm' | 'balanced' | 'motivated',
  quietMode: false,
};
