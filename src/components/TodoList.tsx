import React from 'react';
import TodoItem from './TodoItem';



export default function TodoList(props : any){
    const todos : Array<any> = props.todos;  
    
    return(
        <ul className="wrapperUl" id="wrapperUl">
            {Object.keys(todos).map(value => {
               <TodoItem></TodoItem>
            })}
        </ul>
    );
}