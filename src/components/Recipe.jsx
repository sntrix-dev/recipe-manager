import { DeleteIcon, EditIcon } from "../design/icons";

const Recipe = ({
  name = "",
  ingredients = [],
  steps = [],
  onEdit,
  onDelete,
}) => {
  return (
    <div className="bg-white rounded-md p-4 relative">
      <div className="absolute top-4 right-4 flex items-center gap-4">
        <button className="p-1" onClick={onEdit}>
          <EditIcon />
        </button>
        <button className="p-1" onClick={onDelete}>
          <DeleteIcon />
        </button>
      </div>
      <h2 className="text-4xl font-bold text-primary mb-6">{name}</h2>
      <div>
        <h3 className="text-xl font-semibold">Ingredients</h3>
        <ul className="list-disc ml-4 mt-4">
          {ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>
      <div className="mt-6">
        <h3 className="text-xl font-semibold">Cooking Steps</h3>
        <div className="mt-4">
          {steps.map((step, index) => (
            <div key={index} className="flex gap-2">
              <div className="font-semibold w-max">Step {index + 1}:</div>{" "}
              <div className="flex-1">{step}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Recipe;
