import './App.css';
import React, { useState, useEffect } from "react";
import Cards from "./components/Cards/Cards";
import Nav from "./components/Nav/Nav";
import  axios  from 'axios' ;
import About from './components/views/About/About';
import Detail from './components/views/Detail/Detail';
import {Routes, Route, useLocation, useNavigate} from "react-router-dom";
import LoginForm from './components/loginForm/LoginForm';
import Favorites from './components/Favorites/Favorites';



const EMAIL = 'florloto.ge@gmail.com';
const PASSWORD = 'hola1234';


function App() {
   const [access, setAccess] = useState(false);
   const navigate = useNavigate();

   const login = (userData) =>{
      if (userData.password === PASSWORD && userData.email === EMAIL) {
         setAccess(true);
         navigate('/home'); 
      }
   }

   useEffect(() => {
      !access && navigate('/');
   }, [access, navigate]);

   
   const [ characters, setCharacters] = useState ([
      {
         id: 1,
         name: 'Rick Sanchez',
         status: 'Alive',
         species: 'Human',
         gender: 'Male',
         origin: {
            name: 'Earth (C-137)',
            url: 'https://rickandmortyapi.com/api/location/1',
         },
         image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
      }
   ]);


   const {pathname} = useLocation();  //usamos useLocation para esconder la nav condicionalmenmte

   const onSearch = (id) => {
      axios(`https://rickandmortyapi.com/api/character/${id}`)
      .then(({ data }) => {
         if (data.name) {
            const characterExists = characters.some(
            (character) => character.id === data.id
            );
   
         if (!characterExists) {
            setCharacters([...characters, data]);
            } else {
            window.alert('¡Este personaje ya se encuentra en la lista!');
            }
         }
      })
      .catch((error) => {
         console.error('Error en la solicitud:', error);
      });
   };

   const onClose = (id) => {
      const filteredCharacters = characters.filter((character) => character.id !== parseInt(id)
      );
      setCharacters(filteredCharacters);
   };

   const addRandomCharacter = () => {
      axios("https://rickandmortyapi.com/api/character/")
      .then(({ data }) => {
         const randomCharacter = data.results[Math.floor(Math.random() * data.results.length)];
         const characterExists = characters.some(
            (character) => character.id === randomCharacter.id);
         if (!characterExists) {
            setCharacters([...characters, randomCharacter]);
         } else {
            window.alert('¡Este personaje ya se encuentra en la lista!');
         }
      })
   };

const getContainerClass = () => {
   if (pathname === '/') {
      return 'backgroundLogin';
   } else {
      return 'backgroundDefault';
   }
   };


   return (
      <div className={`App ${getContainerClass()}`}>
         {pathname !== "/" &&  // si pathname es distinta a / entonces se muestra el nav
         <Nav onSearch={onSearch} addRandomCharacter={addRandomCharacter} />
         }
         <Routes>
            <Route path="/" element={<LoginForm login={login} />} /> 
            <Route path= "/home" element={<Cards characters={characters} onClose= {onClose} />} />
            <Route path= "/about" element={<About />} />
            <Route path= "/detail/:id" element={<Detail />} />
            <Route path= "/favorites" element= {<Favorites />} />
            <Route path="*" element={<div><img src="./img/03fdb791c0c8753db54348da091ba79b.jpg" alt="imagen_no_encontrada" /></div>} />
         </Routes>
         
      </div>
   );
}

export default App;
