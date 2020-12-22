const parseInput = (input: string[]) => {
  const parsed = new Map<string, string[][]>();
  let ingredientList: string[] = [];

  input.forEach((line) => {
    const parts = line.split(' (contains ');
    const ingredients = parts[0].split(' ');
    const allergens = parts[1].replace(')', '').split(', ');

    allergens.forEach((a) => {
      const ingList = parsed.get(a) || [];
      ingList.push(ingredients);
      parsed.set(a, ingList);
    });
    ingredientList = ingredientList.concat(ingredients);
  });

  return { parsed, ingredientList };
};

const matchIngredientsToAllergens = (list: Map<string, string[][]>) => {
  const finalList = new Map<string, string>();
  const allergenMap = new Map<string, string[]>();

  list.forEach((ingredientLists, allergen) => {
    const commonIngredients: string[] = [];

    ingredientLists[0].forEach((i) => {
      if (ingredientLists.every((l) => l.includes(i)))
        commonIngredients.push(i);
    });

    allergenMap.set(allergen, commonIngredients);
  });

  while (allergenMap.size > 0) {
    allergenMap.forEach((commonIngredients, allergen) => {
      if (commonIngredients.length === 1) {
        // If we find one with only one ingredient, we remove it from the list, and remove the ingredient from others in the list.
        const ing = commonIngredients[0];
        finalList.set(allergen, ing);

        allergenMap.delete(allergen);
        allergenMap.forEach((ci, a) => {
          allergenMap.set(
            a,
            ci.filter((v) => v !== ing)
          );
        });
      }
    });
  }

  return finalList;
};

const findInMap = <T>(map: Map<any, T>, val: T) => {
  for (const [_, v] of map) {
    if (v === val) {
      return true;
    }
  }
  return false;
};

const part1 = (input: string[]) => {
  const { parsed, ingredientList } = parseInput(input);
  const matched = matchIngredientsToAllergens(parsed);

  return ingredientList.reduce(
    (a, c) => (findInMap(matched, c) ? a : a + 1),
    0
  );
};

const part2 = (input: string[]) => {
  const { parsed } = parseInput(input);
  const matched = matchIngredientsToAllergens(parsed);

  const keys: string[] = [];
  for (const key of matched.keys()) {
    keys.push(key);
  }

  return keys
    .sort()
    .reduce((a: string, c) => a + (matched.get(c) || '') + ',', '')
    .slice(0, -1);
};

export default {
  part1,
  part2,
};
