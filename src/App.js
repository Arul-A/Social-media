import React from 'react';
import './App.css';
import Header from './Components/Header';
import Home from './Components/Home';
import Nav from './Components/Nav';
import Newpost from './Components/Newpost';
import Missing from './Components/Missing';
import About from './Components/About';
import Footer from './Components/Footer';
import Viewpost from './Components/Viewpost';
import EditPost from './Components/Editpost';
import { Routes, Route } from 'react-router-dom';
import { DataProvider } from './context/DataContext';

const App = () => {
  return (
    <div className="App">
      <DataProvider>
        <Header title="Social-Media" />
        <Nav />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='newpost' element={<Newpost />} />
          <Route path='post/:id' element={<Viewpost />} />
          <Route path='edit/:id' element={<EditPost />} />
          <Route path='about' element={<About />} />
          <Route path='*' element={<Missing />} />
        </Routes>
        <Footer />
      </DataProvider>
    </div>
  );
}

export default App;
