import React, {useState, useEffect} from 'react';
import './App.scss';
import TodoList from './components/TodoList';

interface Todo{
    "text" : string;
    "recordDate" : string;
    "completed" : boolean;
}

interface Todos{
    "" : Todo;
}

type AppProps = {
    text : string;
    todos : JSON;
    modalState : string;
}

export default function App() {
    const [text , setText] = useState("");
    const [todos, setTodos] = useState(JSON.parse("{}"));
    const [modalState, setModalState] = useState("none");
    init();

    /*
        기능 :  todoModel, todoViewClass 객체 생성
                localstorage의 todos / 빈객체 전달
    */
    function init() : void{
        // const tempTodos = isTodosExist_(localStorage) ? decodeTodos_(localStorage.getItem("todos")) : JSON.parse("{}");
        // console.log(tempTodos);
        // setTodos(tempTodos);
    }


    /*
        기능 : localStorage의 todos 존재 여부 check
    */
    function isTodosExist_(storage : Storage) : boolean{
        return !!storage.getItem("todos");
    }

     //암호화
     function encodeTodos_(decodedTodos : string | null) : string{
        const encodedTodos= escape(decodedTodos as string);
        return encodedTodos;
    }   

    //복호화
    function decodeTodos_(encodedTodos : string | null) : string{
        const decodedTodos= unescape(encodedTodos as string);
        return decodedTodos;
    }

    function getTodos() : JSON{
        return todos;
    }

    /*
        기능 : 난수 생성 (무한loop방지를 위해 max 10설정)
    */
    function makeId_(todoIds : Array<string>) : string{
        let maxLoop : number = 10;
        let ranNum : string = "";

        //guid 방식 난수 생성
        while(maxLoop-- > 0){
            ranNum = (()=>{
                return Math.floor(1+Math.random()*0x10000).toString().substring(1);
            })();
            if(todoIds.indexOf(ranNum) == -1){
                return ranNum;
            }
        }
        return ranNum;
    }


    const addHandler = {
        addTodo : function(id : string, text : string) : void{
            const todo = {
                "text" : text,
                "recordDate" : (new Date()).toLocaleString(),
                "completed" : false
            }
            let tempTodos = todos;
            tempTodos[id] = todo
            setTodos(tempTodos);
            setText("");
        },

        deleteTodo : function(id : string ){
            if(Object.keys(todos).indexOf(id) == -1 ){
                //this.showModal("존재하지않는 일정입니다.");
                return;
            }
            let tempTodos = todos;
            delete tempTodos[id]
            setTodos(tempTodos);
        },

        changeTodoState : function(id : string) : void{
            let tempTodos = todos;
            tempTodos[id]["completed"] = tempTodos[id]["completed"] ? false : true
            setTodos(tempTodos);
        }
    

    }
    function useEffect(){
        console.log(todos);
    }

    return (
        <div className="app">
            <h1>react js version</h1>
            <header className="header">
                <div className="input">
                    <textarea id="inputTextarea" className="inputTextarea" placeholder="할 일을 입력하세요.">{text}</textarea>
                    <div id="createButton" className="createButton" onClick={()=>{addHandler.addTodo(makeId_(Object.keys(todos)), text)}}>추가</div>
                </div>
            </header>

            <div className="wrapper">
                <select className="wrapperSelect" id="wrapperSelect">
                    <option value="all">전체</option>
                    <option value="incompleted">할 일</option>
                    <option value="completed">완료된 일</option>
                </select>
                <TodoList
                    todos = {todos}
                />
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
