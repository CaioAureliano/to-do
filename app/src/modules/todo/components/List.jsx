import React from "react";
import Item from "./Item";
import "./List.css";

export default function ListItems(props) {
    return (
        <div className='list-items'>
            {props.todos.length > 0 && props.todos.map(todo => (
                <Item 
                    key={todo._id}
                    value={todo.task} 
                    status={todo.status}
                    deleteItem={_ => props.deleteItem(todo._id)}
                    updateItem={event => props.updateItem(event, todo._id, todo.task)} 
                    updateItemStatus={event => props.updateItemStatus(event, todo._id)} />
            ))}
        </div>
    );
}