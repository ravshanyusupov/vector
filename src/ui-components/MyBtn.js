function MyBtn({children, ...props}) {
    return(
        <button {...props}>{children}</button>
    )
}
export default MyBtn