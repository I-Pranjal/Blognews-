import { Link } from "react-router-dom"
import { navbar } from "../assets/data"


const  Mainheader = () => {
  return <div>
<div className="bg-black text-white flex text-1xl ">
 {/* Listing all the menu options for the navbar :-         */}
    {navbar.map((nav, key) => (
            <div className="m-2 p-1 font-thin hover:text-yellow-300">
              <Link to={nav.path}>{nav.nav}</Link>
            </div>
          ) )}
         

          </div>
    </div> ;
}; 

export default Mainheader  
