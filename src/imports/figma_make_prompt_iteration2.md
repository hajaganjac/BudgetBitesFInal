# BudgetBites — Iteration 2 Build Specification
*(Prompt for Claude Opus 4.7 in Figma Make)*

## 0. Mission

You are building **iteration 2** of BudgetBites, a student food-planning web app. **Do not invent a new product.** This is a research-driven refinement of an existing v1 prototype. Five user interviews drove every choice in this spec. The product must feel like the same brand, but calmer, more useful, and more trustworthy.

**The single non-negotiable:** the homepage must no longer feel "loud and decorative". It must immediately help a student answer (a) what am I eating today, (b) how much am I saving, (c) what's my next action. If the dashboard feels like v1 (five colored stat cards + trophy banner + quote + gradient buttons everywhere), the build has failed.

---

## 1. Tech stack — exact, no substitutions

- **React 18 + TypeScript**
- **Vite**
- **Tailwind CSS** with a custom theme (Section 4)
- **React Router v6** for navigation
- **lucide-react** for all icons (no emojis in section headers)
- **recharts** for the weekly spending chart
- All data mocked in `src/data/mockData.ts` — no backend
- **No UI libraries** — no shadcn, no MUI, no Chakra. Build everything from Tailwind primitives.

### File structure
```
src/
  components/
    ui/          (Card, Button, Chip, Slider, ProgressRing, StatCard)
    layout/      (Sidebar, AppShell, PageHeader)
    features/    (RecipeCard, GroceryItem, AchievementBadge, GeneratorStep, WeekGrid)
  pages/         (Dashboard, Recipes, RecipeGenerator, GroceryNotes, PlanMyWeek, Achievements)
  data/          (mockData.ts)
  lib/           (utils.ts — currency, kcal formatting, cn helper)
```

Single-page app, sidebar navigation. Default route `/` → Dashboard.

---

## 2. Context — what v1 looked like (you are replacing this)

v1 had a dark sidebar (BudgetBites brand, 5 nav items, "This Week" budget + calorie mini cards, 7d streak badge, Lv.2 225 XP badge, "Kitchen Rookie 83%" progress, user profile, Log Out).

The v1 dashboard contained:
- A motivational quote banner ("Cooking is at once child's play and adult joy…")
- Five small colored stat cards (Weekly Budget, Spent This Week, Remaining, Calories Today, Achievements)
- A loud orange trophy banner ("7 day legend streak — absolutely incredible!")
- A bright green "Saved vs eating out €75.70" card
- A pink budget slider and a separate calorie slider
- A recharts weekly bar chart
- "Today's Cheapest Picks" recipe cards

The v1 Recipe Generator was already a 3-step flow: meal budget slider (€0.50–€5.00), dietary preference (No Restriction / Vegan / Vegetarian / Halal), and "What's in your kitchen?" chip input.

The v1 Recipes page used image-led cards with category tag, store tag, dietary chips, price, kcal, time, difficulty, macros, ingredients accordion, and "Cook It!" button.

The v1 Grocery Notes had an Add Item form, store filter chips (Lidl/Albert Heijn/Aldi), and To Buy / Already Bought lists with store badges.

The v1 Achievements page had a Level Roadmap (Hungry Student → Kitchen Rookie → Budget Chef → Flavor Hunter → Iron Chef → Kitchen Legend) and 9 badges (First Bite, On Fire, Week Warrior, Going Green, Speed Demon, Money Saver, Picky Eater, Iron Chef, Kitchen Legend).

**v2 keeps the same information architecture and most of the same data.** What changes is the visual language, hierarchy, and the introduction of two concepts: **Plan My Week** and **Motivation style (Calm / Balanced / Motivated)**.

---

## 3. Interview-driven changes (mandatory — each anchored to research)

| # | Change | Source (interview) |
|---|---|---|
| 1 | Remove the morning quote completely | Luc, William, Ali, Jorg, Dzeneta all rejected it |
| 2 | Replace quote area with a "Today" hero block (plan + calorie ring) | Dzeneta wanted Today's Plan; Ali wanted savings visible early |
| 3 | Reduce dashboard to ≤5 main blocks above the fold | Luc, William, Dzeneta all said v1 is too dense |
| 4 | Mute stat-card icon colors to neutral grey | William: "icon color is doing decoration, not information" |
| 5 | Restrict the pink→teal gradient to ONE primary action per screen | William: "when everything gets the special treatment, nothing feels special" |
| 6 | Auto-log calories when "Cook It!" is pressed | Dzeneta: "Calories today = 0 breaks trust in the feature" |
| 7 | Move streak/XP/badges to sidebar mini-chips + Achievements page only | Luc, Ali, Dzeneta found gamification dominant/childish |
| 8 | Add "Quiet mode" toggle in sidebar (hides streak/XP visually) | Luc wanted opt-out; Jorg wants to keep it on |
| 9 | Add weekly goal alongside daily streak ("4 meals this week") | Ali: daily streak doesn't fit real student life |
| 10 | Promote Recipe Generator to a dashboard-level CTA | Luc, William, Dzeneta independently praised it |
| 11 | Add store price comparison hints on Grocery Notes | Ali: "tell me 'same item, €1.20 cheaper at Lidl'" |
| 12 | Add a "Plan My Week" page (Sunday-mode) | Ali + Dzeneta both described this as their dream use case |
| 13 | Add "Motivation style" (Calm/Balanced/Motivated) in Profile | Reconciles Jorg vs Luc/Ali/Dzeneta |
| 14 | Replace bright green savings banner with a calm savings stat | Ali liked savings visibility; v1 banner was visually too loud |

Every visual decision in this build must trace to one of these rows.

---

## 4. Design system — exact tokens

### 4.1 Color palette

Configure these in `tailwind.config.ts`.

**Neutrals (foundation — 90% of the UI):**
| Token | Hex |
|---|---|
| `bg-app` | `#FAFAF9` (warm off-white, page background) |
| `bg-surface` | `#FFFFFF` (card surface) |
| `bg-muted` | `#F4F4F2` (muted card / hover) |
| `border-subtle` | `#E7E5E0` |
| `border-strong` | `#D6D3CC` |
| `text-primary` | `#1C1B1A` |
| `text-secondary` | `#57534E` |
| `text-tertiary` | `#8B8680` |

**Sidebar (softer than v1's pure black):**
| Token | Hex |
|---|---|
| `sidebar-bg` | `#1C1B1A` |
| `sidebar-fg` | `#E7E5E0` |
| `sidebar-fg-muted` | `#8B8680` |
| `sidebar-active-bg` | `rgba(255,255,255,0.06)` |
| `sidebar-active-fg` | `#FFFFFF` |

**Accents — used sparingly:**
| Token | Hex |
|---|---|
| `accent-warm` | `#E85A4F` (primary CTAs — ONE per screen) |
| `accent-warm-hover` | `#D04A40` |
| `accent-warm-tint` | `#FCEDEA` (chip backgrounds) |
| `accent-cool` | `#2A9D8F` (progress, success) |
| `accent-cool-hover` | `#228478` |
| `accent-cool-tint` | `#E6F4F2` |

**The hero gradient (used in EXACTLY one place: the "Plan my week" button on the dashboard):**
`linear-gradient(135deg, #FF5C8A 0%, #2A9D8F 100%)`

**Store colors (very subtle, only on store badges):**
| Store | Text | Background tint |
|---|---|---|
| Aldi | `#C24A3F` | `#FDECEC` |
| Lidl | `#0056A0` | `#E6EFF7` |
| Albert Heijn | `#0086B0` | `#E5F6FD` |

**Semantic:**
- `success` = `accent-cool` `#2A9D8F`
- `warning` = `#E8A33D`
- `danger` = `#C24A3F`

### 4.2 Typography

- Font family: **Inter** from Google Fonts. Fallback: `system-ui, -apple-system, sans-serif`.
- Numbers use `tabular-nums`.

| Style | Size / line-height / weight |
|---|---|
| Display (page title) | 28 / 32 / 700 / tracking -0.02em |
| H2 (section) | 18 / 24 / 600 / tracking -0.01em |
| H3 (card title) | 15 / 20 / 600 |
| Body | 14 / 22 / 400 |
| Body small | 13 / 20 / 400 |
| Label / caption | 12 / 16 / 500 / uppercase / tracking 0.04em / `text-tertiary` |
| Number display | 24–32 / 28–36 / 700 / tabular-nums |

### 4.3 Spacing & layout

- Tailwind 4px base spacing scale
- Sidebar width: **248px** fixed
- Main content max-width: **1120px**, centered
- Page padding: 32px top, 40px horizontal (≥1024px); 24px / 20px below
- Card padding: **24px**
- Grid gap: 16px
- Vertical gap between major dashboard blocks: **32px**
- Border radius: `sm 8 / md 12 / lg 16 / full 9999`
- Shadows (subtle, no glow):
  - `shadow-card`: `0 1px 2px rgba(28,27,26,0.04), 0 1px 3px rgba(28,27,26,0.04)`
  - `shadow-elevated`: `0 4px 12px rgba(28,27,26,0.06)`

### 4.4 Iconography

- **lucide-react only**
- 16px in body text, 20px in nav
- Stroke width: 1.75
- Color: inherits from parent text color
- **No emojis in any section header.** Allowed only in: avatar picker, recipe category tag (max 1, very subtle), achievement badge icons.

---

## 5. Sidebar (left, 248px, sticky, full height) — exact structure

**Top:**
- 40×40 rounded gradient logo tile + "BudgetBites" (16px semibold) + "Student Kitchen" (12px text-tertiary)

**Nav** (label "MENU" — 11px tracked uppercase text-tertiary):
1. Dashboard — `LayoutDashboard`
2. Recipes — `BookOpen`
3. Recipe Generator — `Sparkles`
4. Grocery Notes — `ShoppingCart`
5. Plan My Week — `CalendarCheck` *(NEW in v2)*
6. Achievements — `Trophy`

Active nav state: subtle white-tint background (`sidebar-active-bg`), white text, **3px `accent-warm` bar on the left edge** of the active row.

**Middle — "THIS WEEK"** (label tracked uppercase):
- **Budget mini card:** "Budget" left · "€21.40 left" right · thin progress bar (61% accent-cool fill) · "€13.60 spent" / "€35" below
- **Calories mini card:** "Calories" left · "1,050 kcal" right · thin progress bar · "Goal: 2,000 kcal" below

**Bottom — gamification mini-strip (visible only when Quiet mode = OFF):**
- Two small chips side by side:
  - `🔥 7d streak` (warm-tinted, 11px text)
  - `★ Lv.2 · 225 XP` (cool-tinted)
- Single line: "Kitchen Rookie · 83%" with a 4px progress bar below

**Quiet mode row:**
- `Moon` icon + "Quiet mode" + switch on the right
- When ON: hides the streak chip, XP chip, and level progress entirely. Default OFF.

**User row:**
- 32px avatar · "harun" · "Kitchen Rookie" subtitle · `Settings` gear button → opens Profile modal

**Log Out button:** full width, outlined, danger text.

---

## 6. Screen specs

### 6.1 Dashboard (`/`)

**Page header**
- H1: "Good afternoon, Harun" *(no emoji)*
- Subtitle (14px, text-secondary): "Saturday 23 May 2026 · You're on track this week"

**Block 1 — "Today" hero (REPLACES the v1 quote)**
- White card, rounded-lg, shadow-card, padding 28px
- 2 columns on desktop (60/40), stacks on mobile
- **Left column — "Today's Plan":**
  - Label: "TODAY'S PLAN"
  - Three meal rows, each: icon (`Sunrise` / `Sun` / `Moon`) · meal type · recipe name · kcal pill on right
    - Breakfast — Banana Oat Porridge — 350 kcal
    - Lunch — Hearty Lentil Soup — 380 kcal
    - Dinner — Egg & Cheese Omelette — 320 kcal
  - Bottom line: "Total: 1,050 kcal · €2.80" + small text-tertiary link "Edit today's plan →"
- **Right column — Calorie progress ring:**
  - Centered SVG ring, 140px diameter, 12px stroke, `accent-cool`, neutral track
  - Center text: "1,050" large + "/ 2,000 kcal" small below
  - Below ring: 3 inline macro pills with `bg-muted` background — `P 62g` · `C 145g` · `F 28g`

**Block 2 — Three calm stat cards** (3 columns desktop, stacks mobile, gap 16px)
- **Saved this month** — "€76" large · "vs eating out" tertiary · tiny `TrendingUp` icon in `accent-cool`
- **Weekly budget** — "€21.40" large · "left of €35" tertiary · 4px progress bar (61% `accent-cool`)
- **Cooked this week** — "5 meals" large · "Goal: 4 / week ✓" tertiary in `accent-cool`
- All cards: white surface, 1px `border-subtle`, padding 20px. **NO colored icon backgrounds.** Icon (16px lucide) sits inline with the label, color `text-tertiary`.

**Block 3 — "Plan my week" hero CTA**
- Full-width card, padding 24px, rounded-lg, soft warm gradient background `linear-gradient(90deg, #FFF7F1 0%, #FFFFFF 100%)`
- Left: H2 "Plan your week in 5 minutes" + body "Pick a few recipes, we'll generate the shopping list."
- Right: **the only place in the entire app that uses the pink→teal gradient button.** Label: "Plan my week →". Routes to `/plan`.

**Block 4 — Two columns**
- Left (60%) — "Weekly spending" card with recharts bar chart, 7 bars (Sun–Sat), `accent-cool` bars, light gridlines, 200px height
- Right (40%) — "Quick start" card with two stacked clickable rows:
  - "Generate a recipe" → routes to `/generator`
  - "Browse all recipes" → routes to `/recipes`

**Block 5 — "Today's cheapest picks"** — 3 recipe cards in a row, using `<RecipeCard>` (Section 7). Recipes: Banana Oat Porridge €0.70, Egg & Cheese Omelette €0.90, Hearty Lentil Soup €1.20.

**Forbidden on this page:** quote, trophy banner, five-color stat strip, bright green savings card, any gradient outside the Plan-my-week button.

---

### 6.2 Recipes (`/recipes`)

- Page header: H1 "Recipes" + subtitle "16 budget-friendly meals for your €35/week"
- Top right: Favourites count chip (e.g. "♡ 2") + Filters button (outlined, neutral)
- Filter pill row: **All** / **Vegan** / **Vegetarian** / **Halal**
  - Active chip: `accent-warm-tint` background, `accent-warm` text, 1px `accent-warm` border
  - Inactive: white surface, 1px `border-subtle`
- Grid: 2 columns ≥1024px, 1 column below
- Use `<RecipeCard>` for every card

**Recipes to include (use real, believable Dutch-supermarket student data, all under €2):**

1. Banana Oat Porridge — Breakfast — Aldi — Vegan, Halal — €0.70 — 350 kcal — 8 min — Easy — P10/C62/F6
2. Egg & Cheese Omelette — Breakfast — Lidl — Vegetarian, Halal — €0.90 — 320 kcal — 10 min — Easy — P22/C4/F20
3. Hearty Lentil Soup — Soup — Aldi — Vegan, Halal — €1.20 — 380 kcal — 30 min — Easy — *favourited*
4. Avocado Toast — Breakfast — Albert Heijn — Vegetarian, Halal — €1.40 — 310 kcal — 7 min — Easy
5. Pasta Aglio e Olio — Dinner — Lidl — Vegan, Halal — €0.80 — 480 kcal — 12 min — Easy
6. Koshari — Dinner — Aldi — Vegan, Halal — €1.10 — 520 kcal — 25 min — Easy — *favourited*
7. Mujadara (Lentils & Rice) — Dinner — Aldi — Vegan, Halal — €0.90 — 460 kcal — 30 min — Easy
8. Chickpea Curry — Dinner — Lidl — Vegan, Halal — €1.30 — 440 kcal — 20 min — Easy
9. Egg Fried Rice — Lunch — Aldi — Vegetarian, Halal — €0.95 — 510 kcal — 15 min — Easy
10. Jacket Potato + Beans — Lunch — Albert Heijn — Vegan, Halal — €1.10 — 420 kcal — 60 min — Easy
11. Shakshuka — Breakfast — Lidl — Vegetarian, Halal — €1.50 — 380 kcal — 20 min — Medium
12. Tomato Soup with Bread — Soup — Aldi — Vegan, Halal — €0.85 — 290 kcal — 15 min — Easy
13. Banana Pancakes — Breakfast — Lidl — Vegetarian, Halal — €0.95 — 360 kcal — 12 min — Easy
14. Tuna Pasta Salad — Lunch — Albert Heijn — Halal — €1.60 — 470 kcal — 15 min — Easy
15. Halloumi Wrap — Lunch — Lidl — Vegetarian, Halal — €1.80 — 510 kcal — 12 min — Easy
16. Red Lentil Dal — Dinner — Aldi — Vegan, Halal — €1.00 — 410 kcal — 25 min — Easy

**No emojis in the page header. No emojis on filter chips.**

---

### 6.3 Recipe Generator (`/generator`)

- Page header: H1 "Recipe Generator" + subtitle "Tell us your budget, diet, and what's in your kitchen"
- Single white card, max-width **800px**, centered, padding 32px, rounded-lg, `shadow-card`
- Three steps stacked vertically with 32px gap. Each step uses `<GeneratorStep>` (Section 7) — numbered circle 28×28 neutral background with dark digit. **NOT differently colored per step.**

**Step 1 — Set your meal budget**
- Subtitle: "Maximum you want to spend per meal"
- Slider €0.50 → €5.00, default €3.00. Current value in a neutral pill to the right of the slider.
- Below slider, four selectable preset chips: "Super cheap (≤€1)" · "Budget (≤€2)" · "Standard (≤€3)" · "Flexible (≤€5)"
- Active preset: `accent-warm-tint` background, `accent-warm` text

**Step 2 — Dietary preference**
- 2×2 grid of selectable cards on desktop (4 in a row above ≥1280px). Each card: icon + name + 1-line description.
  - **No Restriction** — `UtensilsCrossed` — "Show all recipes"
  - **Vegan** — `Sprout` — "Plant-based only"
  - **Vegetarian** — `Salad` — "No meat or fish"
  - **Halal** — `BadgeCheck` — "Halal certified"
- Selected card: 2px `accent-warm` border, neutral fill
- Default selected: No Restriction

**Step 3 — What's in your kitchen?**
- Input field with placeholder "e.g. eggs, pasta, garlic, rice…" + `accent-cool` solid "Add" button on the right
- Quick-add chip row: `+ rice` `+ lentils` `+ tomatoes` `+ chicken` `+ cheese` `+ bread` `+ oats` `+ milk`
- Below: "Your kitchen (4 items):" — current chips with × button — `eggs ×` · `pasta ×` · `garlic ×` · `onions ×`

**Final CTA:** full-width button at the bottom of the card. Label: "Generate my recipes →" — **this is the screen's single gradient button (pink→teal).**

---

### 6.4 Plan My Week (`/plan`) — NEW SCREEN

- Page header: H1 "Plan My Week" + subtitle "Pick recipes for the week — we'll make the grocery list"
- Top toolbar (white card, padding 20px):
  - Left group: "Weekly budget" label + input field (default €35) + dietary chip row (All / Vegan / Vegetarian / Halal)
  - Right group: "People" counter (default 1)
- **Week grid:** 7 columns (Mon–Sun), each column with 3 stacked meal slots (Breakfast / Lunch / Dinner)
  - Empty slot: dashed `border-strong` border, rounded-md, height 88px, centered "+ pick" label in text-tertiary
  - Filled slot: white card with tiny food thumbnail (40×40 rounded-sm), recipe name (13px), price (12px text-secondary)
- **Pre-fill at least 2 days** to demonstrate the concept (e.g. Mon and Tue fully filled with breakfast/lunch/dinner from the recipe list above).
- **Right rail (or bottom on tablet) — running totals card:**
  - "Estimated cost" — €__ / €35 (with progress bar)
  - "Avg kcal / day" — ~__ kcal
  - "Items needed" — __ ingredients
- **Bottom action row:** two buttons:
  - "Auto-fill week" — outlined, `accent-cool` text & border
  - "Generate grocery list →" — **gradient primary** (this is this screen's single gradient button)

---

### 6.5 Grocery Notes (`/grocery`)

- Page header: H1 "Grocery Notes" + subtitle "Plan your shopping list and stay on budget"
- Top right: pill chips "5 to buy" (neutral) and "3 bought" (`accent-cool-tint`)
- Progress bar full-width: "Shopping progress 3/8 items" with `accent-cool` fill

**Add Item card** (white surface, padding 24px):
- Row: input field "e.g. Red lentils, Pasta, Eggs…" + store dropdown (default "Any Store") + Add button
- Quick-add chips: `+ Eggs` `+ Pasta` `+ Rice` `+ Onions` `+ Lentils` `+ Bread`

**Store filter row:** All Stores (active, `accent-warm-tint`) / Lidl / Albert Heijn / Aldi — outlined pills.

**"TO BUY (5)" section:**
- Each row: checkbox (left, 20×20 rounded with 1px border-strong) · item name · store badge (right)
- Items:
  1. Red lentils (500g) — Aldi
  2. Minced beef (300g) — Lidl
  3. Frozen mixed veg — Albert Heijn
  4. Canned tomatoes (2x) — Aldi
  5. Avocados (2x) — Albert Heijn
- **NEW v2:** when an item is cheaper at another store, show a small `accent-cool` inline hint right under the item name:
  - Red lentils (500g) → "💡 Same item at Lidl: −€0.40" *(use lucide `Lightbulb` icon, no emoji)*
  - Canned tomatoes → "💡 Same item at Lidl: −€0.30"
- Hint style: 12px text-secondary, light `accent-cool-tint` background pill

**"ALREADY BOUGHT (3)" section** (dimmed, strikethrough):
- Spaghetti (500g) — Lidl
- Eggs (12-pack)
- Coconut milk (can) — Albert Heijn
- Top right of this section: "Clear bought" text link

**Footer link:** "This list comes from your weekly plan. Edit plan →" — routes to `/plan`.

---

### 6.6 Achievements (`/achievements`)

This page exists for users who want it, but is calmer than v1 — **no big celebration banner**.

**Page header:** H1 "Achievements" + subtitle "6 of 9 unlocked"

**Profile summary card** (white surface, 1px border, padding 24px):
- Left: avatar (48px) · name "Harun" · two small chips inline: "Kitchen Rookie" (`accent-cool-tint`) and "🔥 7-day streak" (`accent-warm-tint`, small)
- Right: 4 quiet stat tiles in a row, gap 12px — each: small lucide icon + label + value
  - "9 Meals"
  - "€76 Saved"
  - "6/9 Badges"
  - "7d Streak"
  All neutral cards, no colored backgrounds, no emojis as primary visuals.
- Full-width bar at the bottom: "Level 2 → Level 3 · 225 / 250 XP" with `accent-cool` progress bar

**"Level Roadmap" card:**
- Horizontal stepper: 6 nodes connected by a thin line
- Each node: 48×48 rounded-md neutral tile + level icon + label below (e.g. "Kitchen Rookie · Lv.2")
- States:
  - Past levels: filled neutral with check icon
  - Current (Lv.2): 2px `accent-cool` ring + cool-tinted background
  - Future: greyed out, 50% opacity
- Levels: Hungry Student (Lv.1) → Kitchen Rookie (Lv.2 — CURRENT) → Budget Chef (Lv.3) → Flavor Hunter (Lv.4) → Iron Chef (Lv.5) → Kitchen Legend (Lv.6)

**"All Badges" grid** — 3 columns, 11 badges (9 original + 2 new in v2):

**Unlocked (6):**
1. First Bite — "Cook your very first meal" — 1/1 — +50 XP
2. On Fire — "Cook 3 days in a row" — 3/3 — +75 XP
3. Week Warrior — "Cook every day for 7 days" — 7/7 — +150 XP
4. Going Green — "Cook 5 vegan or vegetarian meals" — 5/5 — +100 XP
5. Speed Demon — "Cook 3 meals in under 10 minutes" — 3/3 — +75 XP
6. Money Saver — "Save €50 vs eating out" — €50/€50 — +125 XP

**Locked (5):**
7. Picky Eater — "Save 5 recipes to favourites" — 2/5 — 40%
8. Iron Chef — "Cook 20 meals total" — 9/20 — 45%
9. Kitchen Legend — "Cook 50 meals total" — 9/50 — 18%
10. **NEW: Sunday Planner** — "Plan 4 weeks in a row" — 0/4 — 0% — +200 XP
11. **NEW: Smart Shopper** — "Buy from the cheapest store 5 times" — 0/5 — 0% — +100 XP

Card style: white surface, soft border, lucide icon in a **small soft-tinted square** (NOT a saturated colored block). Title + 1-line description + XP badge top-right + progress bar at bottom. Locked cards: greyscale + lock overlay icon.

**Footer text** (text-secondary, centered): "Keep planning, cooking, and saving to unlock more." *(no rocket emoji, no exclamation)*

---

### 6.7 Profile modal

Triggered by the gear icon next to the user row in the sidebar.

- Centered modal, 560px wide, padding 32px, white surface, rounded-lg, soft backdrop blur
- Title "Edit Profile" + close (X) top-right
- **Profile header card** (inside modal — `bg-muted`): avatar (left, 56px) + name + "Kitchen Rookie" chip + "🔥 7d streak" chip + XP bar
- **Quick stats row:** 4 neutral mini tiles — "9 Meals" / "€76 Saved" / "6/9 Badges" / "7d Streak"
- **Your Name** — input (default "harun")
- **Avatar** picker — grid of 11 emoji avatars: 👨‍🎓 👩‍🎓 👨‍🍳 👩‍🍳 🧑‍🍳 👩‍💻 👨‍💻 🧑‍🦱 🧙 🐧 🦊
- **Daily Calorie Goal** slider 1200 → 3500, default 2000
- **Weekly Grocery Budget** slider €10 → €80, default €35

**NEW SECTION — "Motivation style":**
- Three radio cards in a row:
  - **Calm** — "Hide streaks, XP, and badges from main views"
  - **Balanced** — "Show small progress hints only" *(default selected)*
  - **Motivated** — "Show streaks, daily missions, and full gamification"
- Selected card: 2px `accent-warm` border, neutral fill
- Helper text below: "You can change this anytime. We won't pressure you."

**NEW SECTION — "Weekly goal":**
- Slider 2 → 7 meals/week, default 4
- Helper text: "We'll celebrate weekly progress instead of daily streaks."

**Footer:** Cancel (outlined) + Save Changes (`accent-warm` solid — *not gradient*, since the modal already lives inside a screen with a primary gradient elsewhere).

---

## 7. Component library — concrete contracts

### `<Card>`
- Variants: `default` (`bg-surface`, 1px `border-subtle`, `shadow-card`, rounded-md), `elevated` (uses `shadow-elevated`), `muted` (`bg-muted`, no border)
- Padding controlled by parent; component does not enforce padding.

### `<StatCard>`
Props: `label`, `value`, `subtitle?`, `icon?` (lucide), `trend?` ("up"/"down"), `progress?` (0–1).
- Layout: tiny inline icon + label → big value → optional subtitle → optional thin progress bar
- **No colored icon backgrounds.** Icon color = `text-tertiary`.

### `<Button>`
Variants:
- `primary` — pink→teal gradient (ONLY ONE per screen)
- `solid` — `accent-warm` background, white text — default for regular CTAs
- `outline` — white background, 1px `border-strong`, `text-primary`
- `ghost` — transparent, `text-primary`, hover `bg-muted`
- `danger` — `text-danger`, no background

Sizes: `sm` 32px, `md` 40px, `lg` 48px. All `rounded-md` (except pill variants which are `rounded-full`).

### `<Chip>`
- Pill, height 32px, padding 0 12px, font 13px, `rounded-full`
- States: default (`border-subtle`), active (`accent-warm-tint` bg + warm text + warm border)
- Optional leading icon (12–14px)

### `<RecipeCard>`
- White surface, rounded-md, 1px `border-subtle`, `overflow-hidden`
- **Top — 16:10 food image** with overlay chips:
  - Top-left: category chip (white pill, dark text) — Breakfast / Lunch / Dinner / Soup
  - Top-right: store badge (uses store color tint + colored text)
  - Bottom-left: small heart button — outlined white when unfavourited, filled `accent-warm` when favourited
  - Bottom-right: price tag — black pill, white text, 13px semibold ("€0.70")
- **Body (padding 20px):**
  - Title (15px semibold)
  - Dietary chips row (soft-tinted Vegan / Halal / Vegetarian — small)
  - 1–2 line description (13px text-secondary)
  - Meta row: 3 neutral pills — kcal (`Flame`) · time (`Clock`) · difficulty (`Star`)
  - Macro row: 3 mini tiles with `bg-muted` — "10g Protein" / "62g Carbs" / "6g Fat"
  - Accordions: "Show ingredients ▾" and "Show steps ▾" (chevron rotates on open)
  - **Primary button** — full width, `accent-warm` solid, label "Cook It!" with `ChefHat` icon. **NOT the screen's gradient button.**
- **Click behavior:** clicking "Cook It!" shows a bottom-right toast: "Logged 350 kcal · 10g P / 62g C / 6g F to today" and updates `user.weeklyMealsCooked` and `todaysPlan` in mock state. The dashboard calorie ring reflects this on next visit.

### `<ProgressRing>`
- SVG component. Props: `value` (0–1), `size` (default 140), `stroke` (default 12), `color` (default `accent-cool`)
- Children slot for centered content

### `<StoreBadge>`
- Small pill, padding 2px 8px, font 11px semibold
- Uses store color tint + colored text

### `<GeneratorStep>`
- Numbered circle (28×28, neutral background, dark digit) + step title (15px semibold) + step subtitle (13px text-secondary) + content slot below
- Steps stack with 24px vertical gap

### `<WeekGrid>` (used on `/plan`)
- 7 columns × 3 rows. Each cell is either an empty placeholder (dashed border, "+ pick") or a filled meal slot (thumbnail + name + price).

---

## 8. Mock data — provide in `src/data/mockData.ts`

Minimum exports:

```ts
export const user = {
  name: "Harun",
  avatar: "👨‍🎓",
  level: 2,
  levelName: "Kitchen Rookie",
  xp: 225,
  xpForNext: 250,
  streakDays: 7,
  weeklyMealGoal: 4,
  weeklyMealsCooked: 5,
  calorieGoal: 2000,
  weeklyBudget: 35,
  weeklySpent: 13.60,
  savedThisMonth: 76,
  motivationStyle: "balanced",   // "calm" | "balanced" | "motivated"
  quietMode: false,
};

export const todaysPlan = [
  { meal: "Breakfast", recipeId: 1, kcal: 350 },
  { meal: "Lunch",     recipeId: 3, kcal: 380 },
  { meal: "Dinner",    recipeId: 2, kcal: 320 },
];

export const todaysTotals = {
  kcal: 1050, protein: 62, carbs: 145, fat: 28, cost: 2.80,
};

export const recipes = [/* 16 recipes per Section 6.2, full ingredient + step arrays in English */];

export const groceryItems = [/* 8 items per Section 6.5, with `bought`, `store`, `cheaperAt?` fields */];

export const weeklySpending = [1.90, 2.30, 0.80, 0.95, 2.60, 3.80, 0]; // Sun–Sat

export const badges = [/* 11 badges per Section 6.6, with `unlocked`, `progress`, `xp`, `iconName` */];

export const levels = [/* 6 levels per Section 6.6 */];

export const weekPlan = [/* 7 days × 3 meals, with Mon & Tue pre-filled */];
```

Use **real ingredients and steps** for at least the 6 most-shown recipes (Banana Oat Porridge, Egg & Cheese Omelette, Hearty Lentil Soup, Avocado Toast, Pasta Aglio e Olio, Koshari). Other recipes can have shorter realistic placeholders.

---

## 9. Anti-patterns — explicitly forbidden

- **No motivational quote anywhere in the app.** Not even a small one. Not on the dashboard, not on empty states, not in modals.
- **No pink→teal gradient outside the Plan-my-week button on the dashboard** *(and the Generate-my-recipes button on the Generator, and the Generate-grocery-list button on `/plan`)*. **One gradient per screen, maximum.**
- **No emojis in any section header** ("Recipes 🍳", "Achievements 🏆" — both forbidden).
- **No colored icon background tiles on stat cards.** Icons are inline, `text-tertiary` color.
- **No bright orange trophy banner.** No bright green savings banner. No high-saturation hero blocks.
- **No full-width celebration banner on the dashboard.** The streak lives in the sidebar (chip) and on Achievements only.
- **No `kcal: 0` shown anywhere.** The user has a Today's Plan with logged meals; the dashboard reflects that.
- **No invented pages outside this spec.** No "Discover", no "Community", no "Settings" as a separate page (settings live in the Profile modal).
- **No lorem ipsum.** Every text element uses the real content from Sections 6 and 8.
- **No third-party UI kit.** Tailwind primitives only.
- **No "Sign in" or auth flow.** The user is always logged in as Harun.

---

## 10. Acceptance criteria — the build is correct if all are true

1. Opening `/` shows, in this order above the fold: greeting → Today hero (plan + ring) → 3 calm stats → Plan-my-week banner. Below the fold: Weekly spending + Quick start → Today's cheapest picks.
2. There is no quote and no celebratory banner anywhere on the dashboard.
3. The pink→teal gradient appears on **exactly one button per screen, maximum**, and on **no other element** (no text, no border, no card background).
4. Sidebar contains: brand → 6 nav items → THIS WEEK (budget + calories) → Quiet-mode toggle → streak + XP chips + level progress (only when Quiet mode = OFF) → user row → Log Out.
5. Toggling Quiet mode ON instantly hides the streak chip, XP chip, and level progress from the sidebar. Toggling OFF restores them.
6. Recipe Generator's 3 steps are visually clear, sequentially numbered with neutral circles, and the bottom "Generate my recipes" gradient button is the screen's only gradient.
7. `/plan` renders the 7-day grid with **at least 2 days pre-filled** (Mon + Tue), and the right rail shows live totals computed from the filled slots.
8. `/recipes` shows **all 16 recipe cards** with the exact names, prices (all under €2), store badges, and dietary chips listed in Section 6.2.
9. `/grocery` shows the exact 8 items from Section 6.5 with **at least 2 "cheaper at" hints** (Red lentils and Canned tomatoes).
10. `/achievements` shows 6 unlocked + 5 locked badges (including the 2 new v2 badges), the 6-step level roadmap with Lv.2 active, and no big celebration banner.
11. Profile modal includes the new "Motivation style" radio cards (Calm/Balanced/Motivated) and the "Weekly goal" slider (2–7).
12. Pressing "Cook It!" on any recipe shows a toast confirming the meal was logged, and the dashboard's calorie ring + macro pills + "Cooked this week" stat reflect the change on next visit.
13. **First-impression test:** a new user opening the dashboard does not feel "overloaded". They immediately see today's plan, their savings, and a clear next action. This is the single most important success criterion.

---

## 11. Deliverable

A single polished, deployable **Vite + React + TypeScript + Tailwind** project that meets all 13 acceptance criteria. Prioritize visual polish, calm hierarchy, faithful adherence to the spec, and absence of v1's noise. Make sure every screen is reachable from the sidebar and the routing works end-to-end.

Build everything in one pass. Do not ask clarifying questions — the spec is intentionally complete.
