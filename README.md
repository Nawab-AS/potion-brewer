# Potion Brewer

A simple clone of Little Alchemy, but with the theme of *Magic*

## Live Demo
You can try out the live demo [here](https://nawab-as.github.io/potion-brewer)!


## Features

All of the basic little alchemy features
- Ingredients list
- 'Cauldron' (the workspace)
- Merging ingredients
- Reset Button
- Saves game to localStorage automatically


# Usage

- Click and drag Ingredients from the ingredient list onto the cauldron

- if the ingredient you are dragging turns red, it means that it is outside of the cauldron and will be automatically deleted

- If you drop an ingredient next to another, it may merge with it, creating a new ingredient which will now be displayed on your ingredients list

- If at any point you you would like to restart, scroll to the bottom of the ingredients list and click the reset button


## Installation

### Requirements
- A modern web browser (Chrome, Firefox, Safari, or Edge)
- Local development server
<br><br>

1. Clone this repository with git:
```bash
git clone https://github.com/Nawab-AS/potion-brewer.git
cd ./potion-brewer
```

2. Host using any web server

Since this is a static web page, you can host it with any web server, personally, I used python's builtin http server with:
```bash
python -m http.server -p 3000
```
Then visit `http://localhost:3000` in your browser


## Editing the merges

> [!NOTE]
> If you want to play the game, don't look into the `merges.json` file! It contains all the merges which will ruin the overall experience.

### Adding new merges

In order to add merges simply edit the `merges.json` file to add the following. Note that the ingredients and results as type sensitive


```json
{
    "merges": [
        ...

        {"ingredients": ["<ingredint 1>", "<ingredint 2>"], "result": "<result of the merge>"},

        ...
    ]
}
```


### Removing Merges

Removing merges is typically not recommended as it may make some other merges impossiable to form.

1.  Find the merge in the `merges.json` file, using the CTRL-F menu with the following search command:
`"results": "<the ingredient you want to remove>"`

2. Delete the whole line of code

<br>
<br>


## Questions or Concerns
For any questions or concerns please email me at nawab-as@hackclub.app