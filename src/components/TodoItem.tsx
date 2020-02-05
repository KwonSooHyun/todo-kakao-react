export default function TodoItem(props : any) : string{
    const complete = props.todo.completed ? "할 일로 변경" : "완료로 변경";
    let buttonHtml = "";
    if(props.todo.completed){
        buttonHtml = 
        "<button className='wrapperRemoveButton' remove='" + props.todo.id+ "'>지우기</button>" + 
        "<button className='wrapperChangeState' state=" + props.todo.id + ">"  + complete + "</button>";
    }else{
        buttonHtml = 
        "<button className='wrapperChangeState' state=" + props.todo.id + ">"  + complete + "</button>";
    }
    return (
         "<li className='wrapperLi' id='" + props.todo.id + "' completed=" + props.todo.completed + ">" +  
            "<span className='wrapperSpan'>" + 
                props.todo.text + "[" + props.todo.recordDate+ "]" +
            "</span>" + 
            buttonHtml + 
        "</li>"
    );
}