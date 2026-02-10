import { Link } from "react-router-dom"

const AnalysisPage = ()=>{

    return(
        <div>
            Analysis Page
            <br/>
            <Link to={"/"}>Home</Link>
            <br/>
            <Link to={"/analysis"}>Analysis</Link>
            <br/>
            <Link to={"/predict"}>Prediction</Link>
        </div>
    )
}

export default AnalysisPage