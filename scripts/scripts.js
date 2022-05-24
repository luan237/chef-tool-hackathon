// Generate random numbers

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//                                                      pull request from API
const options = {
  method: "GET",
  url: "https://tasty.p.rapidapi.com/recipes/list",
  params: { from: "0", size: "40", tags: "under_30_minutes" },
  headers: {
    "X-RapidAPI-Host": "tasty.p.rapidapi.com",
    // "X-RapidAPI-Key": "64cf3f3dd8msh110a7f3ecfeae42p13875ejsn6708d76498d4",
    // backup
    "X-RapidAPI-Key": "e1fe5b89d3mshaebd7a6e0eb6032p1fa504jsn27b8471d788b",
  },
};

// FUNCTION TO CREATE NEW ELEMENTS WITH CLASS
const createElementWithClass = (elementName, className) => {
  const element = document.createElement(elementName);
  element.classList.add(className);
  return element;
};

// query
const flipContainer = document.querySelector(".flip__container");
const chefCard = document.querySelector(".chef-card");
const recipeCardEl = createElementWithClass("section", "recipe-card");
const recipeGenerator = document.querySelector(".recipe-generator");
recipeCardEl.classList.add("recipe-card__hide");

///////////////////////////////////////////////////////////////////////
// axios GET
function newRecipe() {
  recipeCardEl.innerHTML = "";
  axios.request(options).then(function (response) {
    const getData = response.data.results[getRandomInt(0, 39)];
    //                          food name
    const foodName = getData.name;

    const recipeCardTitleEl = createElementWithClass(
      "h2",
      "recipe-card__title"
    );
    recipeCardTitleEl.textContent = foodName;
    recipeCardEl.appendChild(recipeCardTitleEl);
    flipContainer.appendChild(recipeCardEl);
    // console.log(foodName);
    //                          food image
    // const foodImage = getData.thumbnail_url;
    // console.log(foodImage);
    //                          food description
    // const foodDes = getData.description;
    // console.log(foodDes);

    //                          food ingredients
    // console.log(getData.sections);
    const foodIngredientList = getData.sections;
    for (let i = 0; i < foodIngredientList.length; i++) {
      const eachIngredient = foodIngredientList[i].components;
      eachIngredient.forEach((singleIngredient) => {
        // console.log(singleIngredient.raw_text);
        const recipeCardListEl = createElementWithClass(
          "ul",
          "recipe-card__list"
        );
        const recipeCardItemEl = createElementWithClass(
          "li",
          "recipe-card__item"
        );
        recipeCardItemEl.textContent = singleIngredient.raw_text;
        recipeCardListEl.appendChild(recipeCardItemEl);
        recipeCardEl.appendChild(recipeCardListEl);
      });
    }

    //                          food recipe video or instruction
    let foodVideo = getData.original_video_url;
    if (foodVideo == null) {
      const foodInstruct = getData.instructions;
      const instructionEl = createElementWithClass("ol", "instruction");
      foodInstruct.forEach((line) => {
        const instructionStepEl = createElementWithClass(
          "li",
          "instruction__step"
        );
        instructionStepEl.textContent = line.display_text;
        instructionEl.appendChild(instructionStepEl);
      });
      // console.log(line.display_text);
      recipeCardEl.appendChild(instructionEl);
    } else {
      const recipeCardVideoEl = createElementWithClass(
        "iframe",
        "recipe-card__video"
      );
      recipeCardVideoEl.setAttribute("src", foodVideo);
      recipeCardEl.appendChild(recipeCardVideoEl);
    }
  });
}

//

newRecipe();
//
let getRecipe = document.querySelector(".chef-card__button");
getRecipe.addEventListener("click", (e) => {
  e.preventDefault();
  chefCard.classList.add("chef-card__gone");
  recipeCardEl.classList.add("recipe-card__in");
  recipeGenerator.classList.add("recipe-generator--active");

  setTimeout(() => {
    recipeCardEl.classList.remove("recipe-card__hide");
  }, 1000);
});

recipeCardEl.addEventListener("click", (e) => {
  e.preventDefault();
  recipeCardEl.innerHTML = "<h2>Meow...Meow...</h2>";
  //STYLE IN OUR FLIPPING TRANSITION
  setTimeout(() => {
    newRecipe();
  }, 1500);
});
