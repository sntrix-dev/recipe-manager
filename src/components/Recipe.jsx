import Button from "../design/components/Button";
import { DeleteIcon, EditIcon } from "../design/icons";

const Recipe = ({
  name = "",
  ingredients = [],
  steps = [],
  onEdit,
  onDelete,
  isView = false,
  setOpenView,
  getViewData,
}) => {
  const handleView = () => {
    setOpenView();
    getViewData({ name, ingredients, steps });
  };

  return (
    <div
      className={`bg-white rounded-md p-4 relative h-full flex flex-col justify-between ${
        isView ? "max-h-[85vh] overflow-auto" : ""
      }`}
    >
      <div>
        <h2 className="text-2xl lg:text-4xl font-bold text-primary mb-6">
          {name}
        </h2>
        {ingredients.length > 0 && (
          <div>
            <h3 className="text-lg lg:text-xl font-semibold">Ingredients</h3>
            <ul className="list-disc ml-4 mt-4">
              {(isView ? ingredients : ingredients.slice(0, 3)).map(
                (ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                )
              )}
              {!isView && ingredients.length > 3 && (
                <button
                  className="text-primary font-semibold hover:underline transition-all duration-300 ease-in-out"
                  onClick={handleView}
                >
                  +{ingredients.length - 3} items.
                </button>
              )}
            </ul>
          </div>
        )}
        {steps.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg lg:text-xl font-semibold">Cooking Steps</h3>
            <div className="mt-4">
              {(isView ? steps : steps.slice(0, 2)).map((step, index) => (
                <div key={index} className="flex gap-2">
                  <div className="font-semibold w-max">Step {index + 1}:</div>{" "}
                  <div className="flex-1">{step}</div>
                </div>
              ))}
              {!isView && steps.length > 3 && (
                <button
                  className="text-primary font-semibold hover:underline transition-all duration-300 ease-in-out"
                  onClick={handleView}
                >
                  +{steps.length - 3} steps.
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      {!isView && (
        <div className="w-full flex items-center  gap-10 self-end justify-self-end">
          <Button
            size="lg"
            fullWidth
            theme="primary"
            className=" mt-4"
            onClick={handleView}
          >
            View Complete Recipe
          </Button>
          <div className=" flex items-center justify-end gap-4 mt-4">
            <button className="p-1 text-primary" onClick={onEdit}>
              <EditIcon />
            </button>
            <button className="p-1 text-primary" onClick={onDelete}>
              <DeleteIcon />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Recipe;
