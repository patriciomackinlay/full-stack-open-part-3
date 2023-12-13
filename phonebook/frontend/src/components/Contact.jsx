import personService from "../services/persons"

const Contact = (props) => {
    
    return (
        <li>{props.name} {props.number} <button  onClick={() => props.handleDelete(props.id, props.name)}>delete</button> </li>
    )
}

export default Contact