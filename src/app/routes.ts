import { createBrowserRouter } from 'react-router';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Recipes } from './pages/Recipes';
import { RecipeGenerator } from './pages/RecipeGenerator';
import { GroceryNotes } from './pages/GroceryNotes';
import { PlanMyWeek } from './pages/PlanMyWeek';
import { Achievements } from './pages/Achievements';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true,          Component: Dashboard       },
      { path: 'recipes',      Component: Recipes         },
      { path: 'generator',    Component: RecipeGenerator },
      { path: 'grocery',      Component: GroceryNotes    },
      { path: 'plan',         Component: PlanMyWeek      },
      { path: 'achievements', Component: Achievements    },
    ],
  },
]);
