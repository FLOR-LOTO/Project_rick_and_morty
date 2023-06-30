import React, {useState, useEffect} from "react";
import axios from "axios";  //hace peticiones, el fetch retorna un http reuquest, con axios nos salteamos esa conversion al json
import { useParams } from "react-router-dom";
import style from "./Detail.module.css";

function Detail() {
    const {id} = useParams();
    const [character, setCharacter] = useState({});

    useEffect(() => {   // cuando se monta el componente ejecuta el codigo que busca el personaje
        axios(`https://rickandmortyapi.com/api/character/${id}`).then(({ data }) => {  // cada vez que este id sea diferente vuelve a ejec el useEffect
        if (data.name) {
            setCharacter(data);
        } else {
            window.alert('No hay personajes con ese ID');
        }
        });
         return setCharacter({});   // cuando se desmonta, osea cuando salimos, ejecuta el return, limpia el personaje
    }, [id]);  // como dependencia usa el id


    return (
    <div className= {style.detail}>
        {character.name && (  // este condicional dice, si existe el personaje.name se renderiza el resto
            <div>
                {character.name && <h1>{character.name}</h1>}  {/*es este condicional decimos que si tiene ese dato se renderice*/}
                {character.image && <img className= {style.img} src= {character.image} alt={character.name} />}
                {character.species && <h2>Specie: {character.species}</h2>}
                {character.status && <h2>Status: {character.status}</h2>}
                {character.gender && <h2>Gender: {character.gender}</h2>}
                {character.origin.name && <h2>Origin: {character.origin.name}</h2>}
            </div>
        )}
    </div>
    );
}

export default Detail;