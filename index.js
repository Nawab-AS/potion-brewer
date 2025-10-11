const { createApp, ref } = Vue;

const ingredients = ref([
    'Water',
    'Salt',
]);

activeIngredient = ref(null);


for (let i = 1; i <= 50; i++) {
    ingredients.value.push(`Ingredient ${i}`);
}


// Mouse position tracking
let mousePos = ref({x: 0, y: 0});
document.addEventListener('mousemove', (event) => {
    mousePos.value = {x: event.clientX, y: event.clientY};
});

document.addEventListener('mousedown', (e) => {e.preventDefault();});
document.addEventListener('mouseup', (e) => {
    e.preventDefault();
    activeIngredient.value = null;
});



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
            mousePos,
        };
    }
}).mount('body');