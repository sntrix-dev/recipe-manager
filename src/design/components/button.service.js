import { getClassNamesForTheme } from "./service";

export const getVariantThemeStyles = (variant, theme) => {
  if (variant === "contained") {
    let b = getClassNamesForTheme(theme);
    if (theme === "gradient") {
      b.background = `bg-[linear-gradient(to_right,_#2AF598,_#009EFD)]`;
      b.border = "border-transparent";
    }
    const t = getClassNamesForTheme(theme === "light" ? "dark" : "light");
    return `border ${b.border} ${b.background} ${t.text}`;
  }
  if (variant === "outline") {
    const t = getClassNamesForTheme(theme);
    return `border ${t.border} ${t.text}`;
  }
  return ``;
};

export const getSizeStyles = (size) => {
  if (size === "sm") {
    return "px-4 py-5";
  }
  if (size === "md") {
    return "px-4 py-8";
  }
  if (size === "lg") {
    return "py-2 px-6";
  }
  return ``;
};
