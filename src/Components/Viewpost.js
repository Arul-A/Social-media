import React, { useContext } from 'react'
import './Components.css'
import { useParams, Link} from 'react-router-dom'
import DataContext from '../context/DataContext'

const Viewpost = () => {
    const {posts, handleDelete} = useContext(DataContext)
    const { id } = useParams()
    console.log(typeof(id))
    console.log(id)
    const post = posts ? posts.find(post => post.id === id):null;
    
    if (!post) {
        return <div>Loading...</div>;
      }
    
    return (
        <div className='post viewpost'>
                <h2>{post.title}</h2>
                <p>{post.datetime}</p>
                <p>{post.body}</p>
                <Link to={`/edit/${post.id}`}><button className='editbtn'>Edit</button></Link>
                <button className='delbtn' onClick={()=>handleDelete(post.id)}>Delete</button>
                
        </div>
    )
}

export default Viewpost