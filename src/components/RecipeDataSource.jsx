import React, {
  Children,
  cloneElement,
  Fragment,
  isValidElement,
  useEffect,
  useState,
} from "react";

const RecipeDataSource = ({ children, newRecipe = {}, onEdit, editData }) => {
  const [recipes, setRecipes] = useState([]);

  // Getting data from localStorage on Mount
  useEffect(() => {
    if (!!window) {
      const storage = localStorage.getItem("recipes");
      if (storage) {
        const data = JSON.parse(storage);
        setRecipes(data);
      }
    }
  }, []);

  //when new recipe is added, adding to the list
  useEffect(() => {
    if (Object.keys(newRecipe).length) {
      setRecipes((prevState) => [...prevState, newRecipe]);
    }
  }, [newRecipe]);

  //when edited data recieved switching the object
  useEffect(() => {
    if (editData?.id) {
      setRecipes((prevState) =>
        prevState.map((recipe) =>
          recipe.id === editData.id ? editData : recipe
        )
      );
    }
  }, [editData]);

  const handleDelete = (id) => {
    if (!!window) {
      const filteredData = recipes.filter((recipe) => recipe.id !== id);
      setRecipes(filteredData);
      localStorage.setItem("recipes", JSON.stringify(filteredData));
    }
  };

  return (
    <>
      {recipes.map((recipe, index) => {
        return Children.map(children, (child) => {
          if (isValidElement(child)) {
            {
              return cloneElement(child, {
                ...recipe,
                onEdit: () => {
                  onEdit(recipe);
                },
                onDelete: () => handleDelete(recipe.id),
              });
            }
          } else {
            return <Fragment />;
          }
        });
      })}
    </>
  );
};

export default RecipeDataSource;
