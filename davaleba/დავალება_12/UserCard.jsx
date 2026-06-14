function UserCard({ user }) {
  return (
    <div className={user.role === 'Admin' ? 'admin-card' : 'user-card'}>
      <img src={user.photo} alt={user.name} />
      <h3>{user.name}</h3>
      <p>{user.age} წლის</p>
      <p>{user.role}</p>
      <p>{user.skills.join(', ')}</p>
    </div>
  );
}

export default UserCard;