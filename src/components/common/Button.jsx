function Button({ as: Component = 'button', children, className = '', variant = 'primary', ...props }) {
  const componentProps =
    Component === 'button' && !props.type
      ? {
          type: 'button',
          ...props,
        }
      : props;

  return (
    <Component className={`button button--${variant} ${className}`.trim()} {...componentProps}>
      {children}
    </Component>
  );
}

export default Button;
