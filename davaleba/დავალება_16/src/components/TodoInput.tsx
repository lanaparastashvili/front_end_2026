import React, { useState } from "react";
import icon from '../assets/icon.svg';


type TodoInputProps = {
    onAdd:(title:string)  => void;
};

function TodoInput({onAdd}:TodoInputProps){
    const[value,setValue] = useState<string>("");

    function handleAdd():void{
        if(value.trim()==="")return;
        onAdd(value.trim());
        setValue("");
    }

    function handleKeyDown(e:React.KeyboardEvent<HTMLInputElement>):void{
        if(e.key === "Enter"){
            handleAdd();
        }
    }

    return (
        <div className="input-row">
            <img src={icon} alt="check" className="input-icon" />
            <input 

            className="note-input"
            type="text"
            placeholder=" Note"
            value={value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>)=>
                 setValue(e.target.value)
                } 
                onKeyDown={handleKeyDown}
            />
            <button className="add-btn" onClick={handleAdd}>+</button>
        </div>

    )
}
export default TodoInput;