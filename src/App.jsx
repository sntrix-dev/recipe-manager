import { useState } from "react";
import "./App.css";
import AddRecipe from "./components/AddRecipeModal";
import Header from "./components/header";
import Modal from "./design/components/Modal";
import RecipeDataSource from "./components/RecipeDataSource";
import Recipe from "./components/Recipe";

// title, image, ingredients list, preparation steps

function App() {
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [modalType, setModalType] = useState("add");
  const [recipe, setRecipe] = useState([]);
  const [editData, setEditData] = useState(null);

  return (
    <div className="App">
      <Header
        onClickAdd={() => {
          setAddModalOpen(true);
          setModalType("add");
        }}
      />
      <main className="w-full max-w-[1500px] mx-auto px-4 py-10 grid grid-cols-2 gap-4">
        <RecipeDataSource
          newRecipe={recipe}
          editData={editData}
          onEdit={(data) => {
            setAddModalOpen(true);
            setModalType("edit");
            setEditData(data);
          }}
        >
          <Recipe />
        </RecipeDataSource>
      </main>
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
