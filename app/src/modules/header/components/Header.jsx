import React from "react";
import AddButton from "./AddButton";
import "./Header.css";
import Title from "./Title";

export default function Header(props) {
    return (
        <header className='section-header'>
            <Title />

            <form onSubmit={props.handleSubmit}>
                <div className='input-section-header'>
                        <input 
                            className='input-header' 
                            placeholder='type a to-do'
                            value={props.inputNewTodoValue}
                            onChange={props.handleInputNewTodo} />

                        <AddButton className='btn-add-header'/>
                </div>
            </form>
        </header>
    );
}