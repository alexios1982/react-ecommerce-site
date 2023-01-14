import "./button.styles.scss";

const BUTTON_STYLE_TYPES = {
  google: "google-sign-in",
  iverted: "inverted",
};

function Button({ children, buttonType, ...otherProps }) {
  return (
    <button
      className={`button-container ${BUTTON_STYLE_TYPES[buttonType]}`}
      {...otherProps}
    >
      {children}
    </button>
  );
}

export default Button;
