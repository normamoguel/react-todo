import style from './InputWithLabel.module.css';
import { useEffect } from 'react'
import { useRef } from 'react';
import PropTypes from 'prop-types';

function InputWithLabel ({children,todoTitle,handleTitleChange})
{       const inputRef=useRef();
        useEffect(() => 
            { inputRef.current.focus();
            });
        return(
            <>
                <label htmlFor="title" >{children}</label>
                <input className={style.InputWithLabel}
                    name="title" id="title"  ref={inputRef}
                    placeholder="Enter todo title"
                    value={todoTitle} 
                    onChange={handleTitleChange} >
                </input>
                
            </>

            );


}
InputWithLabel.propTypes={
  children: PropTypes.object.isRequired,
  todoTitle: PropTypes.string.isRequired,
  handleTitleChange: PropTypes.func.isRequired
}

export default InputWithLabel;