function Badge({ children, tone = 'green' }) {
  return <span className={`badge badge--${tone}`}>{children}</span>;
}

export default Badge;
