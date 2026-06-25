function Input({ error, id, label, ...props }) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <input aria-invalid={Boolean(error)} id={id} {...props} />
      {error ? <span className="field__error">{error}</span> : null}
    </div>
  );
}

export default Input;
