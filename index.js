const { createApp, ref, computed } = Vue;

const activeIngredient = ref(null);
const activeIngredientOutsite = ref(false);
const ingredients = ref(['air', 'bone', 'crystal', 'earth', 'feather', 'fire', 'gold', 'herbs', 'light', 'magic', 'shadow', 'spirit', 'water']);
const ingredientsFound = computed(() => ingredients.value.length);
const storedIngredients = ref([]);

if (localStorage.getItem('ingredients')) {
    ingredients.value = JSON.parse(localStorage.getItem('ingredients')); // overwrites ingredients if found in local storage
}
if (localStorage.getItem('storedIngredients')) {
    storedIngredients.value = JSON.parse(localStorage.getItem('storedIngredients')); // overwrites ingredients if found in local storage
}


function reset() {
    if (!confirm("Are you sure you want to reset? This will delete all your ingredients forever (a long time).")) return;
    ingredients.value = ['air', 'bone', 'crystal', 'earth', 'feather', 'fire', 'gold', 'herbs', 'light', 'magic', 'shadow', 'spirit', 'water'];
    storedIngredients.value = [];
    localStorage.removeItem('ingredients');
    localStorage.removeItem('storedIngredients');
}

// get cauldron coordinates
let cauldronPos = {};
const getCauldronPos = () => {
    cauldronPos = document.getElementById('cauldron').getBoundingClientRect();
};
window.addEventListener('resize', getCauldronPos);
getCauldronPos();

function isPointInCauldron(x, y) {
    if (x - 100 >= cauldronPos.left && x + 100 <= cauldronPos.right && y - 25 >= cauldronPos.top && y + 25 <= cauldronPos.bottom) {
        return true;
    }
    return false;
}



// Mouse position tracking
let mousePos = ref({x: 0, y: 0});
document.addEventListener('mousemove', (event) => {
    mousePos.value = {x: event.clientX, y: event.clientY};
    if (activeIngredient.value) {
        if (isPointInCauldron(mousePos.value.x, mousePos.value.y)) {
            activeIngredientOutsite.value = false;
        } else {
            activeIngredientOutsite.value = true;
        }
    }
});

document.addEventListener('mousedown', (e) => {
    e.preventDefault();
});
document.addEventListener('mouseup', (e) => {
    e.preventDefault();
    if (!activeIngredient.value) return; // continue if an ingredient is being carried

    if (isPointInCauldron(mousePos.value.x, mousePos.value.y)) {
        let mousePos2 = {x: mousePos.value.x-96, y: mousePos.value.y-21};

        // merge ingredients if they are close enough
        for (let i = 0; i < storedIngredients.value.length; i++) {
            const otherIngredient = storedIngredients.value[i];

            if (Math.abs(otherIngredient.x - mousePos2.x) < 192 && Math.abs(otherIngredient.y - mousePos2.y) < 52) {
                let newName = merge(activeIngredient.value, otherIngredient.name);
                if (!newName) break;
                
                otherIngredient.name = newName;

                // position other ingredient on the midpoint of the two ingredients
                otherIngredient.x = (otherIngredient.x + mousePos2.x) / 2;
                otherIngredient.y = (otherIngredient.y + mousePos2.y) / 2;
                activeIngredient.value = null;
                return; // otherIngredient becomes the new Ingredient
            }
        }

        storedIngredients.value.push({
            name: activeIngredient.value,
            x: mousePos2.x,
            y: mousePos2.y,
            id: Date.now(), // I mean it *is* unique
        });

    }
    activeIngredient.value = null;
});

function ingredientClicked(ingredient) {
    activeIngredient.value = ingredient;
}


function storedIngredientClicked(storedIngredientID) {
    const ingredientIndex = storedIngredients.value.findIndex(ingredient => ingredient.id == storedIngredientID);
    if (ingredientIndex === -1) return; // ingredient not found

    activeIngredient.value = storedIngredients.value[ingredientIndex].name;
    storedIngredients.value.splice(ingredientIndex, 1);
}


// load merges from merges.json
const totalIngredients = ref(0);
let merges = {};
fetch('./merges.json')
    .then(response => response.json())
    .then(data => {
        merges = data.merges;
        totalIngredients.value = merges.length + 13; // 13 default ingredients
    });


function merge(ingredient1, ingredient2) {
    const result = merges.find(merge => 
        (merge.ingredients.includes(ingredient1) && merge.ingredients.includes(ingredient2))
    );
    if (!result) return null;

    if (!ingredients.value.includes(result.result)) ingredients.value.push(result.result);
    return result.result;
}


// mount Vue app
createApp({
    setup() {
        return {
            ingredients,
            activeIngredient,
            storedIngredients,
            ingredientClicked,
            storedIngredientClicked,
            mousePos,
            activeIngredientOutsite,
            reset,
            ingredientsFound,
            totalIngredients
        };
    }
}).mount('body');



// save the ingredients and caludron to local storage when closed
window.addEventListener('beforeunload', () => {
    localStorage.setItem('storedIngredients', JSON.stringify(storedIngredients.value));
    localStorage.setItem('ingredients', JSON.stringify(ingredients.value));
});
