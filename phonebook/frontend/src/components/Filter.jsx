const Filter = (props) => {
    return (
        <div>
            filter: <input
            value={props.newFilter}
            onChange={props.handleChange} />
        </div>
    )
}
export default Filter