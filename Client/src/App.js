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


function App() {
   
const [access, setAccess] = useState(false);
const navigate = useNavigate();

const login = async (userData) => {
   const { email, password } = userData;
   const URL = 'http://localhost:3001/rickandmorty/login/';
   try {
      const { data } = await axios(URL + `?email=${email}&password=${password}`)
         const { access } = data;
         setAccess(data);
         access && navigate('/home');
      } catch(error) {
         window.alert(error.message);
      }
   }

useEffect(() => {
   !access && navigate('/');
}, [access, navigate]);


const [ characters, setCharacters] = useState ([]);

const {pathname} = useLocation();  //usamos useLocation para esconder la nav condicionalmenmte

// const onSearch = async (id) => {
//    try{
//       const { data } = await axios(`http://localhost:3001/rickandmorty/character/${id}`)
//          if (data.name) {
//             const characterExists = characters.some(
//             (character) => character.id === data.id
//             );
   
//          if (!characterExists) {
//             setCharacters([...characters, data]);
//             } else {
//             window.alert('¡Este personaje ya se encuentra en la lista!');
//             }
//          }
//    } catch(error){
//       window.alert(error.message);
//    };
// };

async function onSearch(id) {
   try {
     const { data } = await axios(
       `http://localhost:3001/rickandmorty/character/${id}`
     );
     if (data.name) {
       setCharacters((oldChars) => [...oldChars, data]);
     }
   } catch (error) {
     window.alert(error.message);
   }
 }

const onClose = (id) => {
   const filteredCharacters = characters.filter((character) => character.id !== parseInt(id)
   );
   setCharacters(filteredCharacters);
};


// const addRandomCharacter = () => {
//    axios.get("http://localhost:3001/rickandmorty/characters")
//       .then(({ data }) => {
//          const randomCharacter = data[Math.floor(Math.random() * data.length)];
//          const characterExists = characters.some(character => character.id === randomCharacter.id);
//          if (!characterExists) {
//             setCharacters([...characters, randomCharacter]);
//          } else {
//             window.alert('¡Este personaje ya se encuentra en la lista!');
//          }
//       })
//       .catch(error => {
//          console.error('Error:', error);
//       });
// };

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
      <Nav onSearch={onSearch}/> // addRandomCharacter={addRandomCharacter} 
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
