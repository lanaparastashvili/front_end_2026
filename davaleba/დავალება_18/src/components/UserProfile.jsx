import React from 'react';


const UserProfile = ({ user }) => {
  if (!user) return null;

  const joinDate = new Date(user.created_at).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  return (
    <div className="user-profile">
      <img src={user.avatar_url} alt={`${user.name}'s avatar`} className="avatar" />
      
      <div className="profile-header">
        <div className="name-info">
          <h2>{user.name || user.login}</h2>
          <p className="username">@{user.login}</p>
        </div>
        <p className="joined-date">Joined {joinDate}</p>
      </div>

      <p className={`bio ${!user.bio ? 'empty' : ''}`}>
        {user.bio || 'This profile has no bio'}
      </p>

      <div className="stats-card">
        <div className="stat">
          <h4>Repos</h4>
          <p>{user.public_repos}</p>
        </div>
        <div className="stat">
          <h4>Followers</h4>
          <p>{user.followers}</p>
        </div>
        <div className="stat">
          <h4>Following</h4>
          <p>{user.following}</p>
        </div>
      </div>

      <div className="links-grid">
        <div className={`link-item ${!user.location ? 'empty' : ''}`}>
          <svg width="14" height="20" xmlns="http://www.w3.org/2000/svg"><path d="M7.023 0C3.15 0 0 3.149 0 7.022c0 4.79 6.275 12.35 6.55 12.67a.64.64 0 00.946 0c.275-.32 6.55-7.88 6.55-12.67C14.046 3.15 10.896 0 7.023 0zm0 9.55a2.53 2.53 0 110-5.06 2.53 2.53 0 010 5.06z" fill="currentColor" fillRule="evenodd"/></svg>
          <span>{user.location || 'Not Available'}</span>
        </div>
        <div className={`link-item ${!user.twitter_username ? 'empty' : ''}`}>
          <svg width="20" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M20 1.892a8.112 8.112 0 01-2.356.646 4.11 4.11 0 001.804-2.27 8.22 8.22 0 01-2.605.996 4.096 4.096 0 00-6.973 3.736A11.624 11.624 0 011.39.734a4.096 4.096 0 001.265 5.464 4.07 4.07 0 01-1.853-.512v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 14.542a11.575 11.575 0 006.29 1.843c7.547 0 11.675-6.252 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 1.892z" fill="currentColor" fillRule="nonzero"/></svg>
          <span>{user.twitter_username || 'Not Available'}</span>
        </div>
        <div className={`link-item ${!user.blog ? 'empty' : ''}`}>
          <svg width="20" height="19" xmlns="http://www.w3.org/2000/svg"><path d="M9.824 13.914l-2.074 1.346c-.736.477-1.705.511-2.483.088l-4.22-2.316a2.43 2.43 0 01-1.18-2.671L1.24 6.136C1.472 5.093 2.217 4.257 3.23 3.896l4.22-1.503a2.464 2.464 0 012.875 1.155l1.632 2.88-3.076 2.052c-.672.449-1.096 1.196-1.139 2.001-.044.805.302 1.583.926 2.08l1.156.953zM18.76 12.863l-1.372-4.223a2.43 2.43 0 00-1.884-1.68l-4.407-.811a2.464 2.464 0 00-2.825 1.761l-1.222 4.316 3.076-2.052c.672-.449 1.488-.518 2.19-.186.702.332 1.2 1.002 1.332 1.78l.422 2.502 2.074-1.346c.736-.477 1.258-1.195 1.486-2.001a2.43 2.43 0 00-.87-2.06z" fill="currentColor" fillRule="nonzero"/></svg>
          <a href={user.blog ? (user.blog.startsWith('http') ? user.blog : `https://${user.blog}`) : '#'} target="_blank" rel="noreferrer" className={!user.blog ? 'disabled' : ''}>
            {user.blog || 'Not Available'}
          </a>
        </div>
        <div className={`link-item ${!user.company ? 'empty' : ''}`}>
          <svg width="20" height="19" xmlns="http://www.w3.org/2000/svg"><path d="M10.82 2.574A1.334 1.334 0 009.68 2a1.334 1.334 0 00-1.14.574L1.312 12.637C.941 13.167.92 13.882 1.26 14.436a1.313 1.313 0 001.127.632h14.586a1.313 1.313 0 001.127-.632c.34-.554.32-1.269-.052-1.799L10.82 2.574zM9.68 12.39a1.07 1.07 0 110-2.14 1.07 1.07 0 010 2.14zm1.182-4.103a.589.589 0 01-1.178.134l-.428-3.424a.589.589 0 011.176-.148l.43 3.438z" fill="currentColor" fillRule="evenodd"/></svg>
          <span>{user.company || 'Not Available'}</span>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
