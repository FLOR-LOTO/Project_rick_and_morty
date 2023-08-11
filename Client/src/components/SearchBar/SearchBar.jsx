import React from "react";
import style from "./SearchBar.module.css";
import {useState} from "react";

const SearchBar = ({onSearch}) => { 

   const [ id, setId] = useState ("")

   const [ useId, setUseId] = useState([])

   const handleChange = (event) => { 
      setId(event.target.value) 
   };

   const handleAddRandomCharacter = () => {
      const maxId = 826;
      let randomId = Math.floor(Math.random()* maxId) + 1;
      while (useId.includes(randomId)) {
         randomId = Math.floor(Math.random()* maxId) + 1;
      };
      setId(randomId.toString());
      onSearch(randomId);
      setUseId([...useId, randomId]);
   };

   return (
      <div className= {style.navBar}>
         <input id= {style.input} type='Search' onChange= {handleChange}/>
         <button id={style.buttonSearch} onClick={() =>onSearch(id)}>Agregar</button>
         <button className={style.btnRandom} onClick={handleAddRandomCharacter}>Add Random</button>
      </div>
   );
}

export default SearchBar;