const API_BASE = "http://localhost:8080";

const USERNAME = "string";
const PASSWORD = "string";

const ALLOWED_CUISINES = new Set([
  "Asiatisk",
  "fransk",
  "internasjonal",
  "italiensk",
  "nordisk",
  "vegetar",
]);

const recipes = [
  {
    name: "Lemon Garlic Pasta",
    instructions:
      "Boil pasta, sauté garlic in olive oil, toss with lemon zest and parsley.",
    cookingTime: 20,
    difficulty: "EASY",
    cuisine: "italiensk",
    imageUrl: "",
  },
  {
    name: "Creamy Tomato Soup",
    instructions:
      "Cook onion and garlic, add tomatoes and stock, simmer and blend.",
    cookingTime: 30,
    difficulty: "EASY",
    cuisine: "vegetar",
    imageUrl: "",
  },
  {
    name: "Veggie Stir Fry",
    instructions:
      "Stir fry mixed vegetables, add soy-ginger sauce, serve with rice.",
    cookingTime: 25,
    difficulty: "EASY",
    cuisine: "Asiatisk",
    imageUrl: "",
  },
  {
    name: "Chicken Quesadillas",
    instructions:
      "Cook chicken with spices, fill tortillas with cheese and chicken, toast.",
    cookingTime: 25,
    difficulty: "EASY",
    cuisine: "internasjonal",
    imageUrl: "",
  },
  {
    name: "Mushroom Risotto",
    instructions:
      "Cook arborio rice gradually with stock, add mushrooms and parmesan.",
    cookingTime: 45,
    difficulty: "MEDIUM",
    cuisine: "italiensk",
    imageUrl: "",
  },
  {
    name: "Beef Tacos",
    instructions:
      "Cook beef with taco spices, serve in tortillas with toppings.",
    cookingTime: 30,
    difficulty: "EASY",
    cuisine: "internasjonal",
    imageUrl: "",
  },
  {
    name: "Baked Salmon",
    instructions: "Season salmon, bake until flaky, serve with lemon and dill.",
    cookingTime: 28,
    difficulty: "EASY",
    cuisine: "nordisk",
    imageUrl: "",
  },
  {
    name: "Thai Green Curry",
    instructions:
      "Simmer curry paste with coconut milk, add vegetables and tofu or chicken.",
    cookingTime: 40,
    difficulty: "MEDIUM",
    cuisine: "Asiatisk",
    imageUrl: "",
  },
  {
    name: "Shakshuka",
    instructions:
      "Simmer tomatoes and peppers, crack eggs into sauce and poach.",
    cookingTime: 35,
    difficulty: "MEDIUM",
    cuisine: "internasjonal",
    imageUrl: "",
  },
  {
    name: "Pesto Gnocchi",
    instructions: "Pan-sear gnocchi and toss with pesto and cherry tomatoes.",
    cookingTime: 20,
    difficulty: "EASY",
    cuisine: "italiensk",
    imageUrl: "",
  },
  {
    name: "Stuffed Bell Peppers",
    instructions: "Fill peppers with rice and mince, bake until tender.",
    cookingTime: 55,
    difficulty: "MEDIUM",
    cuisine: "internasjonal",
    imageUrl: "",
  },
  {
    name: "Butter Chicken",
    instructions:
      "Cook marinated chicken, simmer in spiced tomato-cream sauce.",
    cookingTime: 60,
    difficulty: "HARD",
    cuisine: "Asiatisk",
    imageUrl: "",
  },
  {
    name: "Egg Fried Rice",
    instructions: "Stir fry rice with egg, peas, carrots, and soy sauce.",
    cookingTime: 18,
    difficulty: "EASY",
    cuisine: "Asiatisk",
    imageUrl: "",
  },
  {
    name: "Lentil Stew",
    instructions: "Simmer lentils with carrots, celery, onion, and spices.",
    cookingTime: 50,
    difficulty: "MEDIUM",
    cuisine: "vegetar",
    imageUrl: "",
  },
  {
    name: "Shrimp Linguine",
    instructions:
      "Cook shrimp in garlic butter, toss with linguine and chili flakes.",
    cookingTime: 22,
    difficulty: "EASY",
    cuisine: "italiensk",
    imageUrl: "",
  },
  {
    name: "Chickpea Salad Bowl",
    instructions: "Mix chickpeas, cucumber, tomato, herbs, and lemon dressing.",
    cookingTime: 15,
    difficulty: "EASY",
    cuisine: "vegetar",
    imageUrl: "",
  },
  {
    name: "Chicken Alfredo",
    instructions:
      "Cook chicken, make creamy parmesan sauce, toss with fettuccine.",
    cookingTime: 35,
    difficulty: "MEDIUM",
    cuisine: "italiensk",
    imageUrl: "",
  },
  {
    name: "Beef Stroganoff",
    instructions: "Sear beef, cook mushrooms, simmer with sour cream sauce.",
    cookingTime: 45,
    difficulty: "MEDIUM",
    cuisine: "internasjonal",
    imageUrl: "",
  },
  {
    name: "Vegetable Lasagna",
    instructions: "Layer pasta, ricotta, spinach, and tomato sauce, then bake.",
    cookingTime: 70,
    difficulty: "HARD",
    cuisine: "italiensk",
    imageUrl: "",
  },
  {
    name: "Roasted Cauliflower Tacos",
    instructions: "Roast spiced cauliflower, serve in tortillas with slaw.",
    cookingTime: 30,
    difficulty: "EASY",
    cuisine: "vegetar",
    imageUrl: "",
  },
  {
    name: "Coq au Vin",
    instructions:
      "Brown chicken, braise with red wine, mushrooms, and pearl onions until tender.",
    cookingTime: 95,
    difficulty: "HARD",
    cuisine: "fransk",
    imageUrl: "",
  },
  {
    name: "Beef Wellington",
    instructions:
      "Wrap seared beef and mushroom duxelles in puff pastry and bake.",
    cookingTime: 120,
    difficulty: "HARD",
    cuisine: "internasjonal",
    imageUrl: "",
  },
  {
    name: "Ramen Tonkotsu",
    instructions:
      "Simmer pork bones for rich broth, prepare tare, noodles, and toppings.",
    cookingTime: 180,
    difficulty: "HARD",
    cuisine: "Asiatisk",
    imageUrl: "",
  },
  {
    name: "Paella Valenciana",
    instructions: "Cook saffron rice with seafood and chicken in a wide pan.",
    cookingTime: 70,
    difficulty: "HARD",
    cuisine: "internasjonal",
    imageUrl: "",
  },
  {
    name: "Lamb Rogan Josh",
    instructions: "Slow-cook lamb in aromatic Kashmiri-style curry sauce.",
    cookingTime: 90,
    difficulty: "HARD",
    cuisine: "Asiatisk",
    imageUrl: "",
  },
  {
    name: "Moussaka",
    instructions:
      "Layer eggplant, spiced meat, and béchamel; bake until golden.",
    cookingTime: 85,
    difficulty: "HARD",
    cuisine: "internasjonal",
    imageUrl: "",
  },
  {
    name: "Duck Confit",
    instructions:
      "Cure duck legs, slow-cook in fat, then crisp skin before serving.",
    cookingTime: 160,
    difficulty: "HARD",
    cuisine: "fransk",
    imageUrl: "",
  },
  {
    name: "Bouillabaisse",
    instructions: "Prepare saffron seafood stew with shellfish and white fish.",
    cookingTime: 75,
    difficulty: "HARD",
    cuisine: "fransk",
    imageUrl: "",
  },
  {
    name: "Biryani Hyderabadi",
    instructions:
      "Layer marinated meat and rice, then dum-cook with whole spices.",
    cookingTime: 100,
    difficulty: "HARD",
    cuisine: "Asiatisk",
    imageUrl: "",
  },
  {
    name: "Cassoulet",
    instructions:
      "Slow-bake beans with duck sausage and pork until rich and tender.",
    cookingTime: 150,
    difficulty: "HARD",
    cuisine: "fransk",
    imageUrl: "",
  },
  {
    name: "Pho Bo",
    instructions:
      "Simmer beef bones and spices for broth, serve with rice noodles and herbs.",
    cookingTime: 160,
    difficulty: "HARD",
    cuisine: "Asiatisk",
    imageUrl: "",
  },
  {
    name: "Osso Buco",
    instructions:
      "Braise veal shanks with mirepoix, wine, and stock until tender.",
    cookingTime: 120,
    difficulty: "HARD",
    cuisine: "italiensk",
    imageUrl: "",
  },
  {
    name: "Sushi Platter",
    instructions:
      "Prepare sushi rice, slice fish, and roll assorted maki and nigiri.",
    cookingTime: 90,
    difficulty: "HARD",
    cuisine: "Asiatisk",
    imageUrl: "",
  },
  {
    name: "Lasagna Bolognese",
    instructions:
      "Layer ragù, béchamel, and pasta sheets; bake until bubbling.",
    cookingTime: 95,
    difficulty: "HARD",
    cuisine: "italiensk",
    imageUrl: "",
  },
  {
    name: "Pad Thai",
    instructions:
      "Stir-fry rice noodles with tamarind sauce, egg, tofu, and peanuts.",
    cookingTime: 35,
    difficulty: "MEDIUM",
    cuisine: "Asiatisk",
    imageUrl: "",
  },
  {
    name: "Gnocchi al Forno",
    instructions: "Bake gnocchi with tomato sauce, mozzarella, and basil.",
    cookingTime: 40,
    difficulty: "MEDIUM",
    cuisine: "italiensk",
    imageUrl: "",
  },
  {
    name: "Chicken Cacciatore",
    instructions: "Braised chicken with tomatoes, olives, peppers, and herbs.",
    cookingTime: 65,
    difficulty: "MEDIUM",
    cuisine: "italiensk",
    imageUrl: "",
  },
  {
    name: "Mapo Tofu",
    instructions: "Cook tofu in spicy fermented bean sauce with minced meat.",
    cookingTime: 30,
    difficulty: "MEDIUM",
    cuisine: "Asiatisk",
    imageUrl: "",
  },
  {
    name: "Falafel Wrap",
    instructions: "Fry chickpea falafel and serve in pita with tahini salad.",
    cookingTime: 45,
    difficulty: "MEDIUM",
    cuisine: "vegetar",
    imageUrl: "",
  },
  {
    name: "Spanakopita",
    instructions: "Layer filo pastry with spinach-feta filling and bake crisp.",
    cookingTime: 60,
    difficulty: "MEDIUM",
    cuisine: "vegetar",
    imageUrl: "",
  },
  {
    name: "Tuna Nicoise Salad",
    instructions:
      "Assemble tuna, eggs, potatoes, beans, and olives with vinaigrette.",
    cookingTime: 30,
    difficulty: "EASY",
    cuisine: "fransk",
    imageUrl: "",
  },
  {
    name: "Tom Yum Soup",
    instructions: "Simmer lemongrass broth with mushrooms and shrimp.",
    cookingTime: 30,
    difficulty: "EASY",
    cuisine: "Asiatisk",
    imageUrl: "",
  },
  {
    name: "Pancit Canton",
    instructions:
      "Stir-fry noodles with vegetables and chicken in soy-citrus sauce.",
    cookingTime: 35,
    difficulty: "EASY",
    cuisine: "Asiatisk",
    imageUrl: "",
  },
  {
    name: "Bibimbap Bowl",
    instructions: "Serve rice with sautéed vegetables, egg, and gochujang.",
    cookingTime: 40,
    difficulty: "MEDIUM",
    cuisine: "Asiatisk",
    imageUrl: "",
  },
  {
    name: "Chana Masala",
    instructions: "Simmer chickpeas in spiced tomato-onion gravy.",
    cookingTime: 35,
    difficulty: "EASY",
    cuisine: "Asiatisk",
    imageUrl: "",
  },
  {
    name: "Minestrone",
    instructions: "Cook vegetable soup with beans, pasta, and herbs.",
    cookingTime: 40,
    difficulty: "EASY",
    cuisine: "italiensk",
    imageUrl: "",
  },
  {
    name: "Fish and Chips",
    instructions: "Batter and fry fish, serve with crispy potatoes.",
    cookingTime: 50,
    difficulty: "MEDIUM",
    cuisine: "internasjonal",
    imageUrl: "",
  },
  {
    name: "Teriyaki Chicken",
    instructions: "Pan-cook chicken with sweet soy glaze, serve over rice.",
    cookingTime: 30,
    difficulty: "EASY",
    cuisine: "Asiatisk",
    imageUrl: "",
  },
  {
    name: "Stuffed Zucchini Boats",
    instructions: "Fill zucchini with herbed mince and bake until tender.",
    cookingTime: 45,
    difficulty: "MEDIUM",
    cuisine: "vegetar",
    imageUrl: "",
  },
  {
    name: "Red Lentil Dahl",
    instructions: "Cook lentils with turmeric, garlic, and tempered spices.",
    cookingTime: 35,
    difficulty: "EASY",
    cuisine: "Asiatisk",
    imageUrl: "",
  },
  {
    name: "Katsu Curry",
    instructions:
      "Bread and fry cutlet, serve with Japanese curry sauce and rice.",
    cookingTime: 50,
    difficulty: "MEDIUM",
    cuisine: "Asiatisk",
    imageUrl: "",
  },
  {
    name: "Pork Adobo",
    instructions: "Simmer pork in soy-vinegar-garlic sauce until tender.",
    cookingTime: 70,
    difficulty: "MEDIUM",
    cuisine: "Asiatisk",
    imageUrl: "",
  },
  {
    name: "Seafood Jambalaya",
    instructions: "Cook rice with shrimp, sausage, tomatoes, and spices.",
    cookingTime: 65,
    difficulty: "HARD",
    cuisine: "internasjonal",
    imageUrl: "",
  },
];

function normalizeRecipe(entry) {
  if (Array.isArray(entry)) {
    const [name, instructions, cookingTime, difficulty, cuisine, imageUrl] =
      entry;
    return {
      name,
      instructions,
      cookingTime,
      difficulty,
      cuisine,
      imageUrl: imageUrl ?? "",
    };
  }

  if (entry && typeof entry === "object") {
    return {
      name: entry.name,
      instructions: entry.instructions,
      cookingTime: entry.cookingTime,
      difficulty: entry.difficulty,
      cuisine: entry.cuisine,
      imageUrl: entry.imageUrl ?? "",
    };
  }

  return null;
}

function extractCookie(headers) {
  const setCookie = headers.get("set-cookie");
  if (!setCookie) return null;
  return setCookie.split(";")[0];
}

async function loginAndGetCookie() {
  const res = await fetch(`${API_BASE}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: USERNAME, password: PASSWORD }),
  });

  const text = await res.text();
  if (!res.ok) throw new Error(`Login failed: ${res.status} ${text}`);

  const cookie = extractCookie(res.headers);
  if (!cookie) throw new Error("No Set-Cookie returned from login");

  console.log("Logged in, got cookie: jwt");
  return cookie;
}

async function createRecipe(cookie, recipe) {
  const res = await fetch(`${API_BASE}/api/recipe`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookie,
    },
    body: JSON.stringify(recipe),
  });

  const body = await res.text();
  if (!res.ok) {
    console.log(`FAILED: ${recipe.name} -> ${res.status} ${body}`);
    return false;
  }

  console.log(`Created: ${recipe.name}`);
  return true;
}

async function main() {
  const cookie = await loginAndGetCookie();

  let ok = 0;
  for (let i = 0; i < recipes.length; i++) {
    const normalized = normalizeRecipe(recipes[i]);

    if (!normalized) {
      console.log(`SKIPPED index ${i}: invalid recipe entry`);
      continue;
    }

    if (
      !normalized.name ||
      !normalized.instructions ||
      typeof normalized.cookingTime !== "number" ||
      !["EASY", "MEDIUM", "HARD"].includes(normalized.difficulty) ||
      !ALLOWED_CUISINES.has(normalized.cuisine)
    ) {
      console.log(`SKIPPED ${normalized.name ?? `index ${i}`}: invalid fields`);
      continue;
    }

    const success = await createRecipe(cookie, normalized);
    if (success) ok++;
  }

  console.log(`Done: ${ok}/${recipes.length} created`);
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
