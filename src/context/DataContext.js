import { createContext, useState, useEffect } from "react";
import api from '../api/data'
import { format } from 'date-fns'
import { useNavigate } from 'react-router-dom';

const DataContext = createContext({})

export const DataProvider = ({ children }) => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [newTitle, setNewTitle] = useState('');
    const [newBody, setNewBody] = useState('');
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await api.get('/posts');
                setPosts(response.data)
            }
            catch (err) {
                if (err.response) {
                    console.log(err.response.data)
                    console.log(err.response.status)
                    console.log(err.response.headers)
                } else {
                    console.log(`Error:${err.message}`)
                }

            }
        }
        fetchPosts()
        setLoading(false)
    }, []);

    useEffect(() => {
        const filteredResults = posts.filter(post =>
            post.body.toLowerCase().includes(search.toLowerCase()) ||
            post.title.toLowerCase().includes(search.toLowerCase())
        );
        setSearchResults(filteredResults.reverse());
    }, [posts, search]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const id = posts.length ? (parseInt(posts[posts.length - 1].id, 10) + 1).toString() : '1';
        const datetime = format(new Date(), 'MMMM dd, yyyy p');
        const newPost = { id, title: newTitle, datetime, body: newBody };
        try {
            const response = await api.post('/posts', newPost)
            const updatedPosts = [...posts, response.data];
            setPosts(updatedPosts)
            setNewTitle('');
            setNewBody('');
            navigate('/');
        } catch (err) {
            if (err.response) {
                console.error("Error response data:", err.response.data);
                console.error("Error response status:", err.response.status);
                console.error("Error response headers:", err.response.headers);
            } else {
                console.error(`Error: ${err.message}`);
            }
        }
    };
    const handleDelete = async (id) => {
        try {
            await api.delete(`/posts/${id}`);
            const postList = posts.filter(post => post.id !== id);
            setPosts(postList);
            navigate('/');
        } catch (err) {
            if (err.response) {
                console.error("Error response data:", err.response.data);
                console.error("Error response status:", err.response.status);
                console.error("Error response headers:", err.response.headers);
            } else {
                console.error(`Error: ${err.message}`);
            }
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <DataContext.Provider value={{
            search, setSearch,searchResults, newTitle, setNewTitle, newBody, setNewBody, handleSubmit,
            posts,setPosts,handleDelete

        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext