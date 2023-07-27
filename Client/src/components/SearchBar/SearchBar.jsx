import style from "./SearchBar.module.css";
import {useState} from "react";

const SearchBar = ({onSearch}) => {
   const [ character, setCharacter] = useState ("") 

   const handleChange = (event) => { 
      setCharacter(event.target.value) 
   };

   return (
      <div className= {style.navBar}>
         <input id= {style.input} type='Search' value= {character} onChange= {handleChange}/>
         <button id={style.buttonSearch} onClick={() =>onSearch(character)}>Agregar</button>
      </div>
   );
}

export default SearchBar;