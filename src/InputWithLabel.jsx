import style from './InputWithLabel.module.css';
import { useEffect } from 'react'
import { useRef } from 'react';

function InputWithLabel (props)
{       const inputRef=useRef();
        useEffect(() => 
            { inputRef.current.focus();
            });
        return(
            <>
                <label htmlFor="title" >{props.children}</label>
                <input className={style.InputWithLabel}
                    name="title" id="title"  ref={inputRef}
                    placeholder="Enter todo title"
                    value={props.todoTitle} 
                    onChange={props.handleTitleChange} >
                </input>
                
            </>

            );


}
export default InputWithLabel;