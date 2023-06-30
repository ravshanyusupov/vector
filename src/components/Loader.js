function Loader() {
    return(
        <>
            <div className="spinner-border" style={{display: 'flex', justifyContent: 'center', margin: '220px auto'}} role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </>
    )
}
export default Loader