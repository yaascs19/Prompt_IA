function Avatar({ name }) {
  const initials = name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2);

  return (
    <span className="avatar" aria-hidden="true">
      {initials}
    </span>
  );
}

export default Avatar;
