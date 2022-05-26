export default function InputText(props) {
    return (
        <input 
            type="text"
            value={props.value}
            className={props.className}
            defaultValue={props.defaultValue}
            placeholder={props.placeholderText}
            
            onChange={props.handleInputText}
            onFocus={props.handleFocus}
            onBlur={props.handleBlur}
        />
    );
}