import React, { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';

const  modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
  };
  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ]

function EditPost() {
    const {id} = useParams();
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState('');
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        fetch('http://localhost:2000/post/' +id)
    .then(response => {
        response.json().then(postInfo => {
            setTitle(postInfo.title);
            setSummary(postInfo.summary);
            setContent(postInfo.content);
        })
    })
    }, [id])
    
    const updatePost = async(e) =>{
        e.preventDefault();

        const data = new FormData();
        data.set("title", title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('id', id);

        if(files?.[0]){
            data.set('file', files?.[0]);
        }
        

  const response= await fetch('http://localhost:2000/post', {
 method: 'PUT',
 body:data,
 credentials:'include',

});
if(response.ok){
    setRedirect(true);
}

    }

    if(redirect){
        return <Navigate to={'/post/' + id} />
   }
    return (
        <form onSubmit={updatePost}>
            <input type='title' placeholder='Title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}></input>
            <input type='summary' placeholder='summary'
            value={summary}
            onChange={(e) => setSummary(e.target.value)}></input>
            <input  type='file' onChange={e => setFiles(e.target.files)} />
            <ReactQuill  value={content} 
            onChange={newValue => setContent(newValue)}
            modules={modules} formats={formats}/>
            <button style={{marginTop:'5px'}}>Update Post</button>
        </form>
      )
}

export default EditPost