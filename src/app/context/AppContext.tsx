import React, { createContext, useContext, useState, useCallback, useMemo, useEffect, useRef } from 'react';
import {
  recipes as RECIPES_DATA,
  todaysPlan as INITIAL_TODAYS_PLAN,
  todaysTotals as INITIAL_TOTALS,
  groceryItems as INITIAL_GROCERY,
  weekPlan as INITIAL_WEEK_PLAN,
  badges as BADGES,
  levels as LEVELS,
  initialUser,
  type Recipe,
  type GroceryItem,
  type WeekSlot,
  type Badge,
} from '../data/mockData';

export type MotivationStyle = 'calm' | 'balanced' | 'motivated';

export interface TodaysPlanEntry {
  meal: string;
  recipeId: number;
  kcal: number;
}

export interface TodaysTotals {
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
  cost: number;
}

interface PersistedData {
  studentName: string;
  studentEmoji: string;
  quietMode: boolean;
  motivationStyle: MotivationStyle;
  weeklyMealGoal: number;
  calorieGoal: number;
  weeklyBudget: number;
  weeklySpent: number;
  weeklyMealsCooked: number;
  streakDays: number;
  level: number;
  xp: number;
  todaysPlan: TodaysPlanEntry[];
  todaysTotals: TodaysTotals;
  favorites: number[];
  groceryItems: GroceryItem[];
  weekPlan: WeekSlot[];
}

interface AppContextType {
  recipes: Recipe[];
  studentName: string;
  setStudentName: (n: string) => void;
  studentEmoji: string;
  setStudentEmoji: (e: string) => void;
  quietMode: boolean;
  setQuietMode: (v: boolean) => void;
  motivationStyle: MotivationStyle;
  setMotivationStyle: (s: MotivationStyle) => void;
  weeklyMealGoal: number;
  setWeeklyMealGoal: (n: number) => void;
  calorieGoal: number;
  setCalorieGoal: (g: number) => void;
  weeklyBudget: number;
  setWeeklyBudget: (b: number) => void;
  weeklySpent: number;
  savedThisMonth: number;
  weeklyMealsCooked: number;
  streakDays: number;
  level: number;
  levelName: string;
  xp: number;
  xpForNext: number;
  todaysPlan: TodaysPlanEntry[];
  todaysTotals: TodaysTotals;
  favorites: number[];
  toggleFavorite: (id: number) => void;
  groceryItems: GroceryItem[];
  toggleGrocery: (id: string) => void;
  clearBought: () => void;
  addGrocery: (name: string, store?: GroceryItem['store']) => void;
  weekPlan: WeekSlot[];
  setWeekSlot: (day: WeekSlot['day'], meal: WeekSlot['meal'], recipeId: number | null) => void;
  cookRecipe: (recipe: Recipe) => void;
  toast: { id: number; message: string } | null;
  dismissToast: () => void;
  badges: Badge[];
  levels: typeof LEVELS;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const DATA_KEY_PREFIX = 'budgetbites_data_';

function loadPersisted(userKey: string): Partial<PersistedData> {
  try {
    const raw = localStorage.getItem(DATA_KEY_PREFIX + userKey);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function savePersisted(userKey: string, data: PersistedData) {
  try {
    localStorage.setItem(DATA_KEY_PREFIX + userKey, JSON.stringify(data));
  } catch { /* ignore quota */ }
}

export function AppProvider({
  children,
  userKey = 'guest',
  initialName  = initialUser.name,
  initialEmoji = initialUser.avatar,
}: {
  children: React.ReactNode;
  userKey?: string;
  initialName?: string;
  initialEmoji?: string;
}) {
  const stored = useMemo(() => loadPersisted(userKey), [userKey]);

  const [studentName,   setStudentName]  = useState(stored.studentName ?? initialName);
  const [studentEmoji,  setStudentEmoji] = useState(stored.studentEmoji ?? initialEmoji);

  const [quietMode, setQuietMode] = useState(stored.quietMode ?? initialUser.quietMode);
  const [motivationStyle, setMotivationStyle] = useState<MotivationStyle>(stored.motivationStyle ?? initialUser.motivationStyle);
  const [weeklyMealGoal, setWeeklyMealGoal] = useState(stored.weeklyMealGoal ?? initialUser.weeklyMealGoal);
  const [calorieGoal, setCalorieGoal] = useState(stored.calorieGoal ?? initialUser.calorieGoal);
  const [weeklyBudget, setWeeklyBudget] = useState(stored.weeklyBudget ?? initialUser.weeklyBudget);

  const [weeklySpent, setWeeklySpent] = useState(stored.weeklySpent ?? initialUser.weeklySpent);
  const [savedThisMonth] = useState(initialUser.savedThisMonth);
  const [weeklyMealsCooked, setWeeklyMealsCooked] = useState(stored.weeklyMealsCooked ?? initialUser.weeklyMealsCooked);
  const [streakDays] = useState(stored.streakDays ?? initialUser.streakDays);
  const [level] = useState(stored.level ?? initialUser.level);
  const [xp] = useState(stored.xp ?? initialUser.xp);

  const [todaysPlan, setTodaysPlan] = useState<TodaysPlanEntry[]>(stored.todaysPlan ?? INITIAL_TODAYS_PLAN);
  const [todaysTotals, setTodaysTotals] = useState<TodaysTotals>(stored.todaysTotals ?? INITIAL_TOTALS);

  const [favorites, setFavorites] = useState<number[]>(stored.favorites ?? [3, 6]);

  const [groceryItems, setGroceryItems] = useState<GroceryItem[]>(stored.groceryItems ?? INITIAL_GROCERY);
  const [weekPlan, setWeekPlan] = useState<WeekSlot[]>(stored.weekPlan ?? INITIAL_WEEK_PLAN);

  const [toast, setToast] = useState<{ id: number; message: string } | null>(null);

  // Persist on every meaningful change.
  const firstRun = useRef(true);
  useEffect(() => {
    // Skip writing on mount if we just loaded (avoid round-trip noise).
    if (firstRun.current) { firstRun.current = false; return; }
    savePersisted(userKey, {
      studentName, studentEmoji, quietMode, motivationStyle, weeklyMealGoal,
      calorieGoal, weeklyBudget, weeklySpent, weeklyMealsCooked,
      streakDays, level, xp,
      todaysPlan, todaysTotals, favorites, groceryItems, weekPlan,
    });
  }, [userKey, studentName, studentEmoji, quietMode, motivationStyle, weeklyMealGoal,
      calorieGoal, weeklyBudget, weeklySpent, weeklyMealsCooked, streakDays, level, xp,
      todaysPlan, todaysTotals, favorites, groceryItems, weekPlan]);

  const toggleFavorite = useCallback((id: number) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  }, []);

  const toggleGrocery = useCallback((id: string) => {
    setGroceryItems(prev => prev.map(i => i.id === id ? { ...i, bought: !i.bought } : i));
  }, []);

  const clearBought = useCallback(() => {
    setGroceryItems(prev => prev.filter(i => !i.bought));
  }, []);

  const addGrocery = useCallback((name: string, store?: GroceryItem['store']) => {
    if (!name.trim()) return;
    setGroceryItems(prev => [...prev, { id: `g-${Date.now()}`, name: name.trim(), store, bought: false }]);
  }, []);

  const setWeekSlot = useCallback((day: WeekSlot['day'], meal: WeekSlot['meal'], recipeId: number | null) => {
    setWeekPlan(prev => prev.map(s => s.day === day && s.meal === meal ? { ...s, recipeId } : s));
  }, []);

  const cookRecipe = useCallback((recipe: Recipe) => {
    setWeeklyMealsCooked(n => n + 1);
    setWeeklySpent(s => +(s + recipe.price).toFixed(2));
    setTodaysTotals(t => ({
      kcal: t.kcal + recipe.kcal,
      protein: t.protein + recipe.protein,
      carbs: t.carbs + recipe.carbs,
      fat: t.fat + recipe.fat,
      cost: +(t.cost + recipe.price).toFixed(2),
    }));
    setTodaysPlan(prev => [...prev, { meal: 'Logged', recipeId: recipe.id, kcal: recipe.kcal }]);
    setToast({
      id: Date.now(),
      message: `Logged ${recipe.kcal} kcal · ${recipe.protein}g P / ${recipe.carbs}g C / ${recipe.fat}g F to today`,
    });
  }, []);

  const dismissToast = useCallback(() => setToast(null), []);

  const value: AppContextType = useMemo(() => ({
    recipes: RECIPES_DATA,
    studentName, setStudentName, studentEmoji, setStudentEmoji,
    quietMode, setQuietMode,
    motivationStyle, setMotivationStyle,
    weeklyMealGoal, setWeeklyMealGoal,
    calorieGoal, setCalorieGoal,
    weeklyBudget, setWeeklyBudget,
    weeklySpent, savedThisMonth, weeklyMealsCooked,
    streakDays,
    level, levelName: initialUser.levelName,
    xp, xpForNext: initialUser.xpForNext,
    todaysPlan, todaysTotals,
    favorites, toggleFavorite,
    groceryItems, toggleGrocery, clearBought, addGrocery,
    weekPlan, setWeekSlot,
    cookRecipe,
    toast, dismissToast,
    badges: BADGES, levels: LEVELS,
  }), [studentName, studentEmoji, quietMode, motivationStyle, weeklyMealGoal, calorieGoal, weeklyBudget,
       weeklySpent, savedThisMonth, weeklyMealsCooked, streakDays, level, xp,
       todaysPlan, todaysTotals,
       favorites, toggleFavorite, groceryItems, toggleGrocery, clearBought, addGrocery,
       weekPlan, setWeekSlot, cookRecipe, toast, dismissToast]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
