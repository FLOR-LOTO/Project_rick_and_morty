import Card from '../Card/Card'
import style from './Cards.module.css'

 const Cards = ({characters, onClose}) => { //recibe todos los personajes
   return (
      
      <div className= {style.container}>
      {characters.map((element, index) => {
         return (
         <Card 
            key= {index}
            id={element.id}
            name={element.name}
            status={element.status}
            species={element.species}
            gender={element.gender}
            origin={element.origin}
            image={element.image}
            onClose={onClose} />
         );
      })}
      </div>)
}

export default Cards;