import React,{useEffect} from 'react'
import useFirebase from '../hooks/useFirebase';
import {useSelector} from "react-redux"
import "./Landing.css"
export default function Landing() {


    function hexToRGB(h) {
        let r = 0, g = 0, b = 0;
      
        // 3 digits
        if (h.length == 4) {
          r = "0x" + h[1] + h[1];
          g = "0x" + h[2] + h[2];
          b = "0x" + h[3] + h[3];
      
        // 6 digits
        } else if (h.length == 7) {
          r = "0x" + h[1] + h[2];
          g = "0x" + h[3] + h[4];
          b = "0x" + h[5] + h[6];
        }
        
        return {
            r:+r,
            g:+g,
            b:+b
        }
      }


    const changeColor = (e) =>{
        setMode(hexToRGB(e.target.value))
    }

    const setColor = (mode) => {
        switch(mode){
            case "red" :
                setMode({r:255,g:0,b:0})
                return
            case "blue" :
                setMode({r:0,g:0,b:255})
                return
            case "green" :
                setMode({r:0,g:255,b:0})
                return
            case "White" :
                setMode({r:255,g:255,b:255})
                return
            case "OFF" :
                setMode({r:0,g:0,b:0})
                return
            case "smoothTransitions" :
                setSmooth()
                return
            default :
                return
        }
    }
   const {fireBase,setMode,setSmooth} = useFirebase()

   function componentToHex(c) {
        var hex = c?.toString(16);
        return hex?.length == 1 ? "0" + hex : hex;
    }
  
    function rgbToHex(r, g, b) {
        return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
    }

    const setbgColor = (id) =>{
        if (id==="smooth") return
        document.getElementById(id)?.style.setProperty("--color",id)
    }


    const values = useSelector(state=>state.colors)

    useEffect(()=>{
       document.getElementById("lightBulb").style.setProperty("--color",rgbToHex(values?.r,values?.g,values?.b)) 
    },[values])

  return (
    <div className='w-screen bg-gray-800 h-screen px-6 pt-2 flex flex-col lg:flex-row  justify-around overflow-hidden'>
        <ul className='flex flex-col gap-8 p-8 text-7xl '>
            {["White","red","green","blue","smoothTransitions","OFF"].map((mode,index)=>{
                        const elem =  <li data-text={mode==="smoothTransitions"?"Smooth": `${mode}`} id={mode==="smoothTransitions"?"smooth": `${mode}`} key={index} className={`cursor-pointer option active tracking-widest max-w-fit py-2 rounded-2xl`} onClick={()=>{setColor(mode)}}>{mode==="smoothTransitions"?"Smooth": `${mode}`}</li>
                        setbgColor(mode==="smoothTransitions"?"smooth": `${mode}`)
                        return(elem)
            })}
        </ul>
        <div className='flex justify-center'>
            <div className='flex items-center gap-3'>
                <label id='lightBulb' className='lightBulb' for="lightInput">
                    <div className='top'></div>
                    <div>
                        <span data-index={1}></span>
                        <span data-index={2}></span>
                        <span data-index={3}></span>
                        <span data-index={4}></span>
                    </div>
                </label>
                <input id='lightInput' className='hidden' type="color" onChange={(e)=>changeColor(e)}/>
            </div>
        </div>
    </div>
  )
}
