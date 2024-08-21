
export const getClassNamesForTheme = (
  theme
) => {
  if (theme === "dark") {
    return {
      background: "bg-dark",
      border: "border-dark",
      text: "text-dark",
    };
  }
  if (theme === "light") {
    return {
      background: "bg-light",
      border: "border-light",
      text: "text-light",
    };
  }
  if (theme === "primary") {
    return {
      background: "bg-primary",
      border: "border-primary",
      text: "text-primary",
    };
  }
  if (theme === "secondary") {
    return {
      background: "bg-secondary",
      border: "border-secondary",
      text: "text-secondary",
    };
  }
  return {
    background: "bg-light",
    border: "border-light",
    text: "text-light",
  };
};
