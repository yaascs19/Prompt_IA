function TextArea({ className = '', id, label, ...props }) {
  return (
    <div className={`field ${className}`.trim()}>
      <label htmlFor={id}>{label}</label>
      <textarea id={id} {...props} />
    </div>
  );
}

export default TextArea;
