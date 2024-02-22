import { useLocation } from "react-router-dom";

function Serch() {
    const location = useLocation()
    const keyword = new URLSearchParams(location.search).get("keyword")
    console.log(keyword);
    return null;
}

export default Serch;