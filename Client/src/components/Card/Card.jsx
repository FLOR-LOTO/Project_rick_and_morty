import style from "./Card.module.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addFav, removeFav } from "../../redux/actions";
import { useState, useEffect } from "react";


const Card = (props) => {
   const {id, name, image, onClose, addFav, removeFav, myFavorites} = props
   
   const [ isFav, setIsFav ] = useState(false)

   useEffect(() => {                 //simula el ciclo de vida del componente,cuando se monte realiza actualizaciones
      myFavorites.forEach((fav) => {
         if (fav.id === props.id) {
            setIsFav(true);
         }
      });
   }, [myFavorites]);

   const handleFavorite = () => {
      if (isFav) {
         setIsFav(false)
         removeFav(id)
      }
      else{
         setIsFav(true)
         addFav(props)
      }
   }

   return (
      <div className= {style.container}>

         <div className={style.btnHeart}>
         {
         isFav ? (<button onClick={handleFavorite}>❤️</button>) : (<button onClick={handleFavorite}>🤍</button>)
         }
         </div>

         <button className= {style.btnClose} onClick={() => onClose(id)}>X</button>

         <h2 id= {style.id}>{id}</h2>


         <div>
         <Link to= {`/detail/${id}`}>
            <img id= {style.imagen} src={image} alt='img not found' />
         </Link>
         </div>

        
            <h2 className= {style.nameChar}>{name}</h2>
         
      </div>
   );
}

const mapStateToProps = (state) => {
   return {
      myFavorites: state.myFavorites
   }
}

const mapDispatchToProps = (dispatch) => {
   return {
      addFav: (character) => dispatch(addFav(character)), 
      removeFav: (id) => dispatch (removeFav(id))
   }
};

export default connect (mapStateToProps, mapDispatchToProps)(Card);