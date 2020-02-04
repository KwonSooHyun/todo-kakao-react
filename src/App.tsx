import React, {useState} from 'react';
import './App.scss';
import TodoList from './components/TodoList';
interface Todo{
    "id" : string;
    "recordDate" : string;
    "completed" : boolean;
    "text" : string;
}
type AppProps = {
    text : string;
    todoList : Array<Todo>;
    modalState : string;
}

export default function App({text , todoList, modalState} : AppProps) {

    init();

    /*
        기능 :  todoModel, todoViewClass 객체 생성
                localstorage의 todos / 빈객체 전달
    */
    function init() : void{
        const encodedTodos : any = localStorage ? localStorage.getItem("todoList") : [];
        todoList = isTodosExist_(localStorage) ? decodeTodos_(encodedTodos) : [];
        modalState = "none"
    }


    /*
        기능 : localStorage의 todos 존재 여부 check
    */
    function isTodosExist_(storage : Storage) : boolean{
        return !!storage.getItem("todoList");
    }

     //암호화
     function encodeTodos_(decodedTodos : Array<any>) : Array<Todo>{
        decodedTodos.forEach(element => element.text = escape(element.text));
        return decodedTodos;
    }   

    //복호화
    function decodeTodos_(encodedTodos : Array<any>) : Array<Todo>{
        encodedTodos.forEach(element => element.text = escape(element.text));
        return encodedTodos;
    }

    /*
        기능 : 난수 생성 (무한loop방지를 위해 max 10설정)
    */
    function makeId_(todos : Array<Todo>) : string{
        let maxLoop : number = 10;
        let ranNum : string = "";

        //guid 방식 난수 생성
        while(maxLoop-- > 0){
            ranNum = (()=>{
                return Math.floor(1+Math.random()*0x10000).toString().substring(1);
            })();
            if(todoList.filter(element=>element.id == ranNum).length > 0){
                return ranNum;
            }
        }
        return ranNum;
    }


    const addHandler = {
        addTodo : function(id : string, text : string) : void{
            if(Object.keys(todoList).indexOf(id) > -1 ){
                //this.showModal("이미 존재하는 일정입니다.");
                return;
            }
            const now = new Date();
            const todo : Todo = {
                "id" : id,
                "text" : text,
                "recordDate" : (new Date()).toLocaleString(),
                "completed" : false
            }
            todoList.push(todo);
        },

        deleteTodo : function(id : string){
            todoList = todoList.filter(element => element.id != id);
        },

        changeTodoState : function(id : string) : void{
            
        }
    

    }

    return (
        <div className="app">
            <h1>react js version</h1>
            <header className="header">
                <div className="input">
                    <textarea id="inputTextarea" className="inputTextarea" placeholder="할 일을 입력하세요."></textarea>
                    <div id="createButton" className="createButton">추가</div>
                </div>
            </header>

            <div className="wrapper">
                <select className="wrapperSelect" id="wrapperSelect">
                    <option value="all">전체</option>
                    <option value="incompleted">할 일</option>
                    <option value="completed">완료된 일</option>
                </select>
                <TodoList 
                    {...JSON.stringify(todos)}
                ></TodoList>
            </div>
                
            <div className="bottom">
                <div id="saveButton" className="saveButton">저장하기</div>
            </div>
                
            <div id="modal" className="modal">
                <div className="modalContent">
                    <span id="modalClose" className="modalClose">&times;</span>
                    <p id="modalText" className="modalText"></p>
                </div>
            </div>

        </div>
    );
}
