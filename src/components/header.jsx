const { default: Button } = require("../design/components/Button");

const Header = ({ onClickAdd }) => {
  return (
    <header className="w-full bg-light">
      <div className="flex items-center justify-between py-4 px-4 max-w-[1500px] mx-auto">
        <div>
          <h1 className="text-2xl font-bold">Recipe Manager</h1>
        </div>
        <div>
          <Button
            size="lg"
            variant="contained"
            theme="primary"
            onClick={onClickAdd}
          >
            Add Recipe
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
