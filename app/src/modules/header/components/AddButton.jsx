import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function AddButton(props) {
    return (
    <button 
        type={props.type || "submit"} 
        onClick={props.handleClick} 
        className={props.className}
    >
        <FontAwesomeIcon icon={faPlus} />
    </button>
    );
}