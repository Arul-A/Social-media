import React, { useContext } from 'react'
import { Link} from 'react-router-dom'
import DataContext from '../context/DataContext'

const Nav = () => {
  const {search, setSearch} = useContext(DataContext)
  return (
    <nav className='Nav'>
      <form className='Form' onSubmit={(e) => e.preventDefault()}>
        <label htmlFor='search'>Search posts</label>
        <input id='search' type='text' placeholder='search' value={search} onChange={(e) => setSearch(e.target.value)} />
      </form>
      <ul>
        <li className='nav-item'><Link to='#'>Home</Link></li>
        <li className='nav-item'><Link to='newpost'>post</Link></li>
        <li className='nav-item'><Link to='about'>About</Link></li>
      </ul>
    </nav>


  )
}

export default Nav