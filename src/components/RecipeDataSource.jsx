import React, {
  Children,
  cloneElement,
  Fragment,
  isValidElement,
  useEffect,
  useState,
} from "react";

const RecipeDataSource = ({
  children,
  newRecipe = {},
  onEdit,
  editData,
  searchTerm,
}) => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipe, setFilteredRecipe] = useState([]);

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
      const recipeExists = recipes.filter(
        (recipe) => recipe.id === newRecipe.id
      ).length;
      if (!!recipeExists) {
        console.log(newRecipe, recipeExists);
        setRecipes((prevState) => [...prevState, newRecipe]);
      }
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

  //when search is triggered
  useEffect(() => {
    if (searchTerm) {
      const items = recipes.map((recipe) => {
        let show = false;
        // check for name
        const name = recipe.name
          .toLowerCase()
          .replace(" ", "")
          .slice(0, searchTerm.length);
        if (name === searchTerm) {
          show = true;
        }
        // check for ingredinets
        recipe.ingredients?.forEach((ingredient) => {
          ingredient = ingredient
            .toLowerCase()
            .replace(" ", "")
            .slice(0, searchTerm.length);
          if (ingredient === searchTerm) {
            show = true;
          }
        });

        return { ...recipe, show };
      });
      setFilteredRecipe(items);
    } else {
    }
  }, [searchTerm]);

  const handleDelete = (id) => {
    if (!!window) {
      const filteredData = recipes.filter((recipe) => recipe.id !== id);
      setRecipes(filteredData);
      localStorage.setItem("recipes", JSON.stringify(filteredData));
    }
  };

  return (
    <>
      {(!!searchTerm ? filteredRecipe : recipes).map((recipe, index) => {
        if (recipe.show) {
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
            }
            return <Fragment />;
          });
        }

        return <Fragment />;
      })}
    </>
  );
};

export default RecipeDataSource;
