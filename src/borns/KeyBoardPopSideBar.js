import React, { useRef, useState,useContext } from "react";
import { InputText } from 'primereact/inputtext';
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import layout from "simple-keyboard-layouts/build/layouts/japanese";
import "../borns/stylesSideBar.css";
import  { KeyBordContext} from '../borns/KeyBordContext';

    export const KeyBoardPopSideBar = () => {   
       
  
  const {value, setValue,libdata} = useContext(KeyBordContext);


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



  let keyboardOptions = {
   
    /**
     * Layout by:
     * Sterling Butters (https://github.com/SterlingButters)
     */
    layout: {
        default: [
            "{backspace}",
            "\u0636 \u0635 \u062B \u0642 \u0641 \u063A \u0639 \u0647 \u062E \u062D \u062C \u062F \u0626 \u0621 \u0624 \u0631 \u0644\u0627 \u0649",
            "\u0630 \u0634 \u0633 \u064A \u0628 \u0644 \u0627 \u062A \u0646 \u0645 \u0643 \u0637 \u0629 \u0648 \u0632 \u0638 \u0623 \u0622",
            "{space}",
        ],
        shift: [
            "{backspace}",
            "\u0636 \u0635 \u062B \u0642 \u0641 \u063A \u0639 \u0647 \u062E \u062D \u062C \u062F \u0626 \u0621 \u0624 \u0631 \u0644\u0627 \u0649",
            "\u0630 \u0634 \u0633 \u064A \u0628 \u0644 \u0627 \u062A \u0646 \u0645 \u0643 \u0637 \u0629 \u0648 \u0632 \u0638 \u0623 \u0622",
            "{space}",

        ],
    },
    display: {
      "{escape}": "esc ⎋",
      "{tab}": "tab ⇥",
      "{backspace}": "Backspace ⌫",
      "{space}": "  ",
      "{enter}": "enter ↵",
      "{capslock}": "caps lock ⇪",
      "{shiftleft}": "shift ⇧",
      "{shiftright}": "shift ⇧",
      "{controlleft}": "ctrl ⌃",
      "{controlright}": "ctrl ⌃",
      "{altleft}": "alt ⌥",
      "{altright}": "alt ⌥",
      "{metaleft}": "cmd ⌘",
      "{metaright}": "cmd ⌘"
    }
  };


  

  return (
    <>

<span>{libdata}</span>
     
     <Keyboard
        baseClass={"simple-keyboard-arrows"}
        keyboardRef={r => (keyboard.current = r)}
        layoutName={layout}
        onChange={onChange}
        onKeyPress={onKeyPress}
        {...keyboardOptions}
      />


      
    </>
  );
}


