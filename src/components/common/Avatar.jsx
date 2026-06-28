function Avatar({ name, src }) {
  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className="avatar"
        style={{ objectFit: 'cover', borderRadius: '12px' }}
      />
    );
  }

  const initials = name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return <span className="avatar" aria-hidden="true">{initials}</span>;
}

export default Avatar;
