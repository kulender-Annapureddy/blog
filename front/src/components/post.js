import React from 'react'
import { formatISO9075} from 'date-fns';
import { Link } from 'react-router-dom';

function Post({_id,title, summary, cover, content, createdAt, author}) {
  return (
    <div className="post">
      <div className='image'>
        <Link to={`/post/${_id}`} style={{textDecoration:'none',color:'black'}}>
      <img src={'http://localhost:2000/'+cover} alt='' />
      </Link>
      </div>
      <div className="content">
        <Link to={`/post/${_id}`} style={{textDecoration:'none',color:'black'}}>
      <h2>{title}</h2>
      </Link>
      <p className="info">
        <a className="author">{author.username}</a>
        <time>{formatISO9075(new Date(createdAt))}</time>
      </p>
      <p className="summary">{summary}</p>
      </div>
      
    </div>
  )
}

export default Post