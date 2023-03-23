

const DisplayClimbInfo = ({climb}) => {

    return (
        <div className="climbinfo_container">
            <h3>{climb.climb_name}</h3>
            <h4>Posted by: {climb.poster_name}</h4>
            <p>Rated: {climb.rating}</p>
            <p>Comments: {climb.description}</p>
        </div>
        

    )
}

export default DisplayClimbInfo