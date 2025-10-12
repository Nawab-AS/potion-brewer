const { createApp, ref } = Vue;

activeIngredient = ref(null);
const ingredients = ref([
    'Water',
    'Salt',
]);
const storedIngredients = ref([]);

// initialize ingredients
for (let i = 1; i <= 50; i++) {
    ingredients.value.push(`Ingredient ${i}`);
}



// get cauldron coordinates
let cauldronPos = {};
const getCauldronPos = () => {
    cauldronPos = document.getElementById('cauldron').getBoundingClientRect();
};
window.addEventListener('resize', getCauldronPos);
getCauldronPos();



// Mouse position tracking
let mousePos = ref({x: 0, y: 0});
document.addEventListener('mousemove', (event) => {
    mousePos.value = {x: event.clientX, y: event.clientY};
});

document.addEventListener('mousedown', (e) => {
    e.preventDefault();
});
document.addEventListener('mouseup', (e) => {
    e.preventDefault();
    if (!activeIngredient.value) return; // continue if an ingredient is being carried

    if (mousePos.value.x - 100 >= cauldronPos.left && mousePos.value.x + 100 <= cauldronPos.right &&
            mousePos.value.y - 25 >= cauldronPos.top && mousePos.value.y + 25 <= cauldronPos.bottom) {
        // mouse in in cauldron
        storedIngredients.value.push({
            name: activeIngredient.value,
            x: mousePos.value.x-96,
            y: mousePos.value.y-21,
            id: Date.now(),
        });

    }
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
            storedIngredients,
            ingredientClicked,
            mousePos,
        };
    }
}).mount('body');