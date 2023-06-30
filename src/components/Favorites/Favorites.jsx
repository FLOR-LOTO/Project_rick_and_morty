import React, {useState} from "react";
import { connect } from "react-redux";
import Card from "../Card/Card";
import { filterCards, orderCards } from "../../redux/actions";
import {useDispatch } from "react-redux";
import style from "./Favorites.module.css"

const Favorites = ({myFavorites}) => {


const dispatch = useDispatch();
const [aux, setAux] = useState(false);


const handleOrder = (event) => {
    dispatch (orderCards(event.target.value))
    setAux(!aux);
};

const handleFilter = (event) => {
    dispatch (filterCards(event.target.value))
};


    return (
    <div>
        <h1>My Favorites</h1>
        <div className={style.fixedContainer} >
        <select className={style.btnOrder} onChange= {handleOrder}>
            <option value="A">Ascendente</option>
            <option value="D">Descendente</option>
        </select>
        <select className={style.btnFilter} onChange= {handleFilter}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Genderless">Genderless</option>
            <option value="unknown">unknown</option>
        </select>
        </div>
        { 
            myFavorites?.map (character => {
                return (
                    <Card 
                    key = {character.id}
                    id = {character.id}
                    name = {character.name}
                    status = {character.status}
                    species = {character.species}
                    gender = {character.gender}
                    origin = {character.origin}
                    image = {character.image}
                    onClose={character.onClose}
                    />
                )
            })
        }
    </div>
    )
};

const mapStateToProps = (state) => {
    return {
        myFavorites: state.myFavorites
    }
};

export default connect(mapStateToProps, null) (Favorites);