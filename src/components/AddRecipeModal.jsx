import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Button from "../design/components/Button";
import Textfield from "../design/components/Textfield";
import { CloseIcon } from "../design/icons";

const AddRecipe = ({ type, getData, onClose, data, getEditData }) => {
  const [recipeName, setRecipeName] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [ingredientName, setIngredientName] = useState("");
  const [stepDesc, setStepDesc] = useState("");
  const [steps, setSteps] = useState([]);

  useEffect(() => {
    if (type === "edit") {
      setRecipeName(data.name);
      setIngredients(data.ingredients);
      setSteps(data.steps);
    } else {
      setRecipeName("");
      setIngredients([]);
      setSteps([]);
    }
  }, [data, type]);

  const handleIngredients = (action, value) => {
    if (value) {
      if (action === "add") {
        if (!ingredients.includes(value)) {
          setIngredients((prevState) => [...prevState, value]);
          setIngredientName("");
        }
      }
      if (action === "delete") {
        setIngredients((prevState) =>
          prevState.filter((item) => item !== value)
        );
      }
    }
  };

  const handleSteps = (action, value) => {
    if (value) {
      if (action === "add") {
        if (!steps.includes(value)) {
          setSteps((prevState) => [...prevState, value]);
          setStepDesc("");
        }
      }
      if (action === "delete") {
        setSteps((prevState) => prevState.filter((item) => item !== value));
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const recipe = {
      id: type === "add" ? uuidv4() : data.id,
      name: recipeName,
      ingredients,
      steps,
      show: true,
    };

    if (window.localStorage) {
      const prevData = localStorage.getItem("recipes");
      let recipesLocal = [];
      if (prevData) {
        recipesLocal = JSON.parse(prevData);
      }
      if (type === "add") {
        recipesLocal.push(recipe);
        getData(recipe);
      } else {
        recipesLocal = recipesLocal.map((item) =>
          item.id === data.id ? recipe : item
        );

        getEditData(recipe);
      }
      localStorage.setItem("recipes", JSON.stringify(recipesLocal));
    }
    onClose();
    setRecipeName("");
    setIngredients([]);
    setSteps([]);
  };

  return (
    <form className="space-y-8" onSubmit={handleSubmit}>
      <h2 className="text-4xl text-center font-semibold">
        {type === "add" ? "Add" : "Update"} Recipe
      </h2>
      <div className="w-full space-y-4 max-h-[calc(75vh_-_4rem)] overflow-auto">
        <Textfield
          label="Recipe Name"
          name="recipe-name"
          required
          value={recipeName}
          onChange={(e) => setRecipeName(e.target.value)}
        />
        <div>
          <div className="w-full flex items-end gap-8">
            <Textfield
              label="Ingredient"
              name="recipe-name"
              value={ingredientName}
              onChange={(e) => setIngredientName(e.target.value)}
            />
            <Button
              size="lg"
              theme="dark"
              type="button"
              onClick={() => {
                handleIngredients("add", ingredientName);
              }}
            >
              Add
            </Button>
          </div>
          <div className="flex items-center flex-wrap gap-4 mt-4">
            {ingredients.map((ingredient, index) => (
              <div
                key={index}
                className="flex bg-primary gap-2 items-center py-1.5 px-4 w-max rounded-full text-white"
              >
                <h4>{ingredient}</h4>
                <button
                  onClick={() => handleIngredients("delete", ingredient)}
                  type="button"
                >
                  <CloseIcon />
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full">
          <div className="w-full flex items-end gap-8">
            <Textfield
              label={`Add step ${steps.length + 1}`}
              name="recipe-name"
              value={stepDesc}
              onChange={(e) => setStepDesc(e.target.value)}
            />
            <Button
              size="lg"
              theme="dark"
              type="button"
              onClick={() => {
                handleSteps("add", stepDesc);
              }}
            >
              Add
            </Button>
          </div>
          <div className="w-full py-4 px-4 space-y-2">
            {steps.map((step, index) => (
              <div
                key={index}
                className="w-full flex items-center justify-between gap-10"
              >
                <div key={index} className="flex gap-2">
                  <div className="font-semibold w-max">Step {index + 1}:</div>{" "}
                  <div className="flex-1">{step}</div>
                </div>
                <button
                  onClick={() => handleSteps("delete", step)}
                  type="button"
                >
                  <CloseIcon />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Button fullWidth size="lg" theme="dark" type="submit">
        {type === "add" ? "Add" : "Update"}
      </Button>
    </form>
  );
};

export default AddRecipe;
