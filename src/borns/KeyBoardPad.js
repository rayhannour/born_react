import React, { useRef, useState,useContext } from "react";
import { InputText } from 'primereact/inputtext';
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import "../borns/styles.css";
import  { KeyBordContext} from '../borns/KeyBordContext';

    export const KeyBoardPad = () => {   
       
  
  const {value, setValue,data} = useContext(KeyBordContext);


  const [input, setInput] = useState("");
  const [layout, setLayout] = useState("default");
  const keyboard = useRef();

  const onChange = input => {
    setInput(input);
    setValue(input);
  };

  const handleShift = () => {
    const newLayoutName = layout === "default" ? "shift" : "default";
    setLayout(newLayoutName);
  };

  const onKeyPress = button => {
    /**
     * If you want to handle the shift and caps lock buttons
     */
    if (button === "{shift}" || button === "{lock}") handleShift();
  };

  const onChangeInput = event => {
    const input = event.target.value;
    setInput(input);
    keyboard.current.setInput(input);
  };


  let keyboardOptionsNumPad = {
   
    /**
     * Layout by:
     * Sterling Butters (https://github.com/SterlingButters)
     */
    layout: {
        default: [
            "1 2 3","4 5 6","7 8 9","0","{backspace}",
        ],
        shift: [
          "1 2 3","4 5 6","7 8 9","0","{backspace}",
        ],
    },
    display: {
      "{backspace}": "Backspace ⌫"
    }
  };

  return (
    <>
    <InputText type="text" value={input}
        placeholder={"Tap on the virtual keyboard to start"}
        onChange={onChangeInput} style={{visibility: "hidden"}} />


<Keyboard
        baseClass={"simple-keyboard-arrows-numpad"}
        keyboardRef={r => (keyboard.current = r)}
        layoutName={layout}
        onChange={onChange}
        onKeyPress={onKeyPress}
        {...keyboardOptionsNumPad}
      />

      
    </>
  );
}


