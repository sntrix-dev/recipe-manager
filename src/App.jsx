import { useState } from "react";
import "./App.css";
import AddRecipe from "./components/AddRecipeModal";
import Header from "./components/header";
import Modal from "./design/components/Modal";
import RecipeDataSource from "./components/RecipeDataSource";
import Recipe from "./components/Recipe";
import { SearchIcon } from "./design/icons";

// title, image, ingredients list, preparation steps

function App() {
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [modalType, setModalType] = useState("add");
  const [recipe, setRecipe] = useState([]);
  const [editData, setEditData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  // const [recipesCount, setRecipesCount] = useState(0);

  return (
    <div className="App">
      <Header
        onClickAdd={() => {
          setAddModalOpen(true);
          setModalType("add");
        }}
      />
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
      {/* {!!recipesCount ? ( */}
      <main className="w-full max-w-[1500px] mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-2 gap-4">
        <RecipeDataSource
          newRecipe={recipe}
          editData={editData}
          // getRecipesCount={(count) => setRecipesCount(count)}
          onEdit={(data) => {
            setAddModalOpen(true);
            setModalType("edit");
            setEditData(data);
          }}
          searchTerm={searchTerm.toLowerCase().replace(" ", "")}
        >
          <Recipe />
        </RecipeDataSource>
      </main>
      {/* ) : (
        <div className="w-full min-h-[60vh] flex items-center justify-center">
          <h3 className="text-2xl">Start by adding new recipe!</h3>
        </div>
      )} */}
      <Modal open={isAddModalOpen} onClose={() => setAddModalOpen(false)}>
        <AddRecipe
          type={modalType}
          data={editData}
          getData={(data) => setRecipe(data)}
          getEditData={(data) => setEditData(data)}
          onClose={() => setAddModalOpen(false)}
        />
      </Modal>
    </div>
  );
}

export default App;
