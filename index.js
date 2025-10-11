const { createApp, ref } = Vue;

const ingredients = ref([
    'Water',
    'Salt',
]);

activeIngredient = ref(null);

for (let i = 1; i <= 50; i++) {
    ingredients.value.push(`Ingredient ${i}`);
}


function ingredientClicked(ingredient) {
    console.log('Clicked on ingredient:', ingredient);
    activeIngredient.value = ingredient;
}


createApp({
    setup() {
        return {
            ingredients,
            activeIngredient,
            ingredientClicked,
        };
    }
}).mount('body');