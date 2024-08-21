const Textfield = ({
  label,
  minRows,
  type = "text",
  validation,
  name,
  ...props
}) => {
  return (
    <div className="flex flex-col flex-1 gap-2">
      <label htmlFor={name} className="text-lg font-medium">
        {label}
        {props.required && <span className="text-red-600">*</span>}
      </label>
      {minRows ? (
        <textarea
          rows={minRows}
          className="bg-background outline-none border-none px-4 py-2 rounded-md"
          name={name}
        />
      ) : (
        <input
          {...props}
          name={name}
          id={name}
          type={type}
          className="bg-background outline-none border-none px-4 py-2 rounded-md"
        />
      )}
    </div>
  );
};

export default Textfield;
