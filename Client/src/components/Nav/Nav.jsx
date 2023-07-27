import SearchBar from '../SearchBar/SearchBar'
import { Link } from "react-router-dom";
import style from "./Nav.module.css"

const Nav = ({onSearch}) => {  //({onSearch, addRandomCharacter})
    // const handleAddRandomCharacter = () => {
    //     addRandomCharacter();
    // };
    return (
        <div className= {style.container}>
            <SearchBar onSearch={onSearch} />
            <div >
            <Link to= "/home">
                <button className={style.btn} >HOME</button>
            </Link>
            <Link to= "/about">
                <button className={style.btn}>ABOUT</button>
            </Link>
            <Link to= "/favorites">
                <button className={style.btn}>FAVORITES</button>
            </Link>
            <Link to= "/">
                <button className={style.btn}>LOG OUT</button>
            </Link>
            </div>
        </div>
    );
}

//<div>
//<button className={style.btnRandom} onClick={handleAddRandomCharacter}>Add Random</button>
//</div> */}

export default Nav;