import { getSizeStyles, getVariantThemeStyles } from "./button.service";

const Button = ({
  children,
  fullWidth = false,
  variant = "contained",
  size = "md",
  theme = "light",
  className,
  ...props
}) => {
  const variantStyles = getVariantThemeStyles(variant, theme);
  const sizeStyles = getSizeStyles(size);
  const styles = `${variantStyles} ${sizeStyles} ${
    fullWidth ? "w-full" : "lg:w-max w-full"
  } rounded-full font-medium ${className}`;

  return (
    <button {...props} className={styles}>
      {children}
    </button>
  );
};

export default Button;
