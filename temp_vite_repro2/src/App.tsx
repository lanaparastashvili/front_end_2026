import { useState } from 'react';
import CommentList from './components/CommentList';
import { initialComments } from './data/comments';
import type { Comment } from './types/comment';
import './index.css';

function App() {
  const [comments, setComments] = useState<Comment[]>(initialComments);

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-start py-12 px-4">
      <div className="w-full max-w-2xl">
        <CommentList comments={comments} setComments={setComments} />
      </div>
    </div>
  );
}

export default App;
