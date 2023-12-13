const Error= ({ message }) => {
    const notifStyle = {
        color: "red",
        background: "lightgrey",
        fontSize: "20px",
        borderStyle: "solid",
        borderRadius: "5px",
        padding: "10px",
        marginBottom: "10px",
    }
    if (message === null) {
        return null
    }
    return (
        <div>
            <div style={notifStyle}>{message}</div>
        </div>
    )
}

export default Error