import { useEffect, useState } from "react";
import "./App.css";
import AddRecipe from "./components/AddRecipeModal";
import Header from "./components/header";
import Modal from "./design/components/Modal";
import RecipeDataSource from "./components/RecipeDataSource";
import Recipe from "./components/Recipe";
import { SearchIcon } from "./design/icons";
import Button from "./design/components/Button";
import { recipesMockData } from "./data/recipes";

// title, image, ingredients list, preparation steps

function App() {
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [modalType, setModalType] = useState("add");
  const [recipe, setRecipe] = useState([]);
  const [editData, setEditData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewData, setViewData] = useState(null);
  const [recipeCount, setRecipeCount] = useState(0);

  useEffect(() => {
    if (!!window) {
      const storage = localStorage.getItem("recipes");
      if (storage) {
        const data = JSON.parse(storage);
        setRecipeCount(data.length);
      }
    }
  }, [recipeCount]);

  const handleMockdata = () => {
    if (!!window) {
      localStorage.setItem("recipes", JSON.stringify(recipesMockData));
      recipesMockData.forEach((item) => {
        console.log(item);

        setRecipe(item);
      });
      setRecipeCount(recipesMockData.length);
    }
  };

  return (
    <div className="App">
      <Header
        onClickAdd={() => {
          setAddModalOpen(true);
          setModalType("add");
        }}
      />
      {!!recipeCount && (
        <div className="w-full max-w-[1500px] mx-auto px-4 pt-4 flex items-center justify-center gap-10">
          <div className="relative min-w-[15rem] w-full lg:w-[25%]">
            <input
              type="text"
              name="search"
              placeholder="Search by recipe or ingredients"
              className="bg-light outline-none border-none pl-8 pr-4 py-2 rounded-md w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute left-2 top-[calc(50%_-_8px)]">
              <SearchIcon />
            </div>
          </div>
        </div>
      )}
      {!!recipeCount ? (
        <main className="w-full max-w-[1500px] mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <RecipeDataSource
            newRecipe={recipe}
            editData={editData}
            onEdit={(data) => {
              setAddModalOpen(true);
              setModalType("edit");
              setEditData(data);
            }}
            searchTerm={searchTerm.toLowerCase().replace(" ", "")}
          >
            <Recipe
              setOpenView={() => setViewModalOpen(true)}
              getViewData={(data) => setViewData(data)}
            />
          </RecipeDataSource>
        </main>
      ) : (
        <div className="w-full min-h-[60vh] flex items-center justify-center p-4">
          <div className="flex flex-col items-center gap-4">
            <h3 className="text-4xl">Start by adding recipes!</h3>
            <Button size="lg" theme="dark" onClick={handleMockdata}>
              Add mock recipes
            </Button>
          </div>
        </div>
      )}
      <Modal open={isAddModalOpen} onClose={() => setAddModalOpen(false)}>
        <AddRecipe
          type={modalType}
          data={editData}
          getData={(data) => setRecipe(data)}
          getEditData={(data) => setEditData(data)}
          onClose={() => setAddModalOpen(false)}
        />
      </Modal>
      <Modal open={isViewModalOpen} onClose={() => setViewModalOpen(false)}>
        <Recipe {...viewData} isView={true} />
      </Modal>
    </div>
  );
}

export default App;
