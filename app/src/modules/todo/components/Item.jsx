import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InputText from "../../common/components/InputText";
import "./Item.css";

export default function Item(props) {
    return (
        <div className='item'>
            <div className='item-check'>
                <input 
                    type="checkbox" 
                    defaultChecked={props.status} 
                    onChange={props.updateItemStatus} />
            </div>
            
            <div className='item-content'>
                <InputText 
                    handleBlur={props.updateItem}
                    className='input-content'
                    defaultValue={props.value} />
            </div>

            <div className='item-options'>
                <button 
                    className='btn-remove-item' 
                    type='button' 
                    title='delete'
                    onClick={props.deleteItem} >

                    <FontAwesomeIcon icon={faTrash} />
                </button>
            </div>
        </div>
    );
}