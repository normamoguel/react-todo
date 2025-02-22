import { useNavigate } from "react-router-dom";
import style from "./NavBar.module.css";

const NavBar = () => {
    const GoToThePage = useNavigate();
    return(
        <> 
         <div className={style.NavBar}>
          <button className={style.BtnMenu} onClick={() => GoToThePage('/Home')}>Home </button>
          <button className={style.BtnMenu} onClick={() => GoToThePage('/TodoContainer')}>TodoList </button>
          <button className={style.BtnMenu} onClick={() => GoToThePage('/About')}>About </button>
         </div>
        </>

    )

}
export default NavBar;