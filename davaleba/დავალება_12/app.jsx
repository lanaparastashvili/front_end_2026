import UserCard from './UserCard';

const users = [
 { id: 1, name: 'ანა', age: 28, role: 'Admin', skills: ['React', 'CSS'], photo: 'https://picsum.photos/seed/ana/200' },
  { id: 2, name: 'გიორგი', age: 34, role: 'User', skills: ['Python', 'SQL'], photo: 'https://picsum.photos/seed/giorgi/200' },
  { id: 3, name: 'მარიამ', age: 22, role: 'User', skills: ['Figma', 'HTML'], photo: 'https://picsum.photos/seed/mariam/200' },
];

function App() {
  return (
    <div>
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}

export default App;