import React, {useState, useEffect} from "react";
import axios from "axios";  //hace peticiones, el fetch retorna un http reuquest, con axios nos salteamos esa conversion al json
import { useParams } from "react-router-dom";
import style from "./Detail.module.css";

function Detail() {
    const {id} = useParams();
    const [character, setCharacter] = useState({});

    useEffect(() => {   // cuando se monta el componente ejecuta el codigo que busca el personaje
        axios(`http://localhost:3001/rickandmorty/character/${id}`).then(({ data }) => {  // cada vez que este id sea diferente vuelve a ejec el useEffect
        if (data.name) {
            setCharacter(data);
        } else {
            window.alert('No hay personajes con ese ID');
        }
        });
         return setCharacter({});   // cuando se desmonta, osea cuando salimos, ejecuta el return, limpia el personaje
    }, [id]);  // como dependencia usa el id


return (
    <div className={style.container}>
        {character.name && (
        <div className={style.content}>
            <div className={style.imageContainer}>
            {character.image && (
                <img className={style.img} src={character.image} alt={character.name} />
            )}
            </div>
            <div className={style.textContainer}>
            {character.name && <h1>{character.name}</h1>}
            {character.species && <h2 className={style.description}>Specie: {character.species}</h2>}
            {character.status && <h2 className={style.description}>Status: {character.status}</h2>}
            {character.gender && <h2 className={style.description}>Gender: {character.gender}</h2>}
            {character.origin && <h2 className={style.description}>Origin: {character.origin}</h2>}
            </div>
        </div>
        )}
    </div>
    );
}

export default Detail;