import React from 'react';
import TodoItem from './TodoItem';



export default function TodoList(props : any){
    const keyList : Array<string> = Object.keys(props.todos);  
    console.log(keyList);
    return(
        <ul className="wrapperUl" id="wrapperUl">
            {keyList.map(key => {    
                //<TodoItem {...props.todos[key]}/>
                console.log(key);
            })}
        </ul>
    );
}