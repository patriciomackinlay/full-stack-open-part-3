import Contact from "./Contact"


const Persons = (props) => {
    return (
        <ul>{
        props.phonebook.map(person => 
                <Contact name={person.name} id={person.id} number={person.number} key={person.id} handleDelete={props.handleDelete}/>
        )
        }
        </ul>
    )
}

export default Persons