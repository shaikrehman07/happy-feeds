import { useLocation } from "react-router-dom";


function Home(){

    const location = useLocation();

    return (
        <div>
            <h3>Hello, {location.state.name}</h3>
        </div>
    );
}

export default Home;