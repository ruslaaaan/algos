import React, { useEffect, useState } from 'react'
import './inputs.css'



import {useDispatch, useSelector} from 'react-redux'



import { updateAllInput,  updateSpeedInput, updateLengthInput, updateArrayInput, updateArrayRandomInput} from '../../../store/inputsSlice'


function Inputs({syncMode, inputState, isRunningSync, dispatch, className}) {


    const inputDispatch = useDispatch()
    const { input } = useSelector(state => state)

    let localLength = className === 'inputs-sync' ? input.length : 60
    let localSpeed = className === 'inputs-sync' ? input.speed : 45
    const [length, setLength ] = useState(localLength)
    const [speed, setSpeed ] = useState(localSpeed)

    const handleLengthChange = (l) =>{
        if(className === 'inputs-sync'){
            inputDispatch(updateLengthInput(l))
            inputDispatch(updateArrayInput())
        } else{
            dispatch({type: 'changeLength', playload: l})
            dispatch({type: 'changeArray', playload: l})
        }
        return setLength(l)
    }


    const handleSpeedChange = (s) =>{
        if(className === 'inputs-sync'){
            inputDispatch((updateSpeedInput(s)))
        } else dispatch({type: 'changeSpeed', playload: s});
        return setSpeed(s)
    }



    const checkIfNeedDisable = () => {
        if(className === 'local-inputs'){
            if(syncMode) return true;
            else return false;
        } else {
            if(isRunningSync === 'run' || isRunningSync === 'pause' ) return true
            else return false;
        }
    }

    //Generate new array when RESET clicked
    useEffect(() => {
        if(isRunningSync === 'reset') dispatch({type: 'changeArray'})
    }, [isRunningSync])

    return(
        <div className={className}>
            <div className='input-content'>
                <div className="input-container">
                        <p>Length: {length} </p>  
                        <div className="range-input-container">
                            <input 
                                disabled={checkIfNeedDisable()}
                                type="range" 
                                className="slider" 
                                step="1" 
                                min={20} max={100} 
                                value={length} 
                                onChange={ e => handleLengthChange(e.target.value) }
                            />
                        </div>
                    <button
                        className='input-btn'
                        disabled={checkIfNeedDisable()} 
                        onClick={()=>{
                                handleLengthChange(length)
                                className === 'inputs-sync' ? inputDispatch(updateArrayInput()) : dispatch({type: 'changeArray'})}
                        }>GENERATE
                    </button>

                    <button
                        className='input-btn'
                        disabled={checkIfNeedDisable()}
                        onClick={ ()=> className === 'inputs-sync' ? inputDispatch(updateArrayRandomInput()) : dispatch({type: 'changeArrayRandom'})}> 
                        RANDOM
                    </button>
                </div>
            </div>
            <div className="input-container">
                <p>Speed: {speed}  ms</p> 
                <div className="range-input-container">
                    <input 
                        disabled={checkIfNeedDisable()} 
                        type="range" 
                        className="slider speed-slider" 
                        step="1" 
                        min={5} max={200} 
                        // value={syncMode ? '' : inputState.speed} 
                        value={speed} 
                        onChange={ e => handleSpeedChange(e.target.value)}
                    />
                </div>
            </div>
        </div>)
}
export default Inputs







// function Inputs({syncMode, inputState, isRunningSync, dispatch, className}) {

//     const [length, setLength ] = useState(60)
//     const handleLengthChange = (l) =>{
//         dispatch({type: 'changeLength', playload: l})
//         dispatch({type: 'changeArray', playload: l})
//         return setLength(l)
//     }
//     const [speed, setSpeed ] = useState(45)
//     const handleSpeedChange = (s) =>{
//         dispatch({type: 'changeSpeed', playload: s})
//         return setSpeed(s)
//     }
//     const checkIfNeedDisable = () => {
//         if(className === 'local-inputs'){
//             if(syncMode) return true;
//             else return false;
//         } else {
//             if(isRunningSync === 'run' || isRunningSync === 'pause' ) return true
//             else return false;
//         }
//     }

//     //Generate new array when RESET clicked
//     useEffect(() => {
//         if(isRunningSync === 'reset') dispatch({type: 'changeArray'})
//     }, [isRunningSync])

//     return(
//         <div className={className}>
//             <div className='input-content'>
//                 <div className="input-container">
//                         <p>Length: {length} </p>  
//                         <div className="range-input-container">
//                             <input 
//                                 disabled={checkIfNeedDisable()}
//                                 type="range" 
//                                 className="slider" 
//                                 step="1" 
//                                 min={20} max={100} 
//                                 value={length} 
//                                 onChange={ e => handleLengthChange(e.target.value) }
//                             />
//                         </div>
//                     <button
//                         className='input-btn'
//                         disabled={checkIfNeedDisable()} 
//                         onClick={()=>{
//                                 handleLengthChange(length)
//                                 dispatch({type: 'changeArray'})}
//                         }>GENERATE
//                     </button>

//                     <button
//                         className='input-btn'
//                         disabled={checkIfNeedDisable()}
//                         onClick={ ()=> dispatch({type: 'changeArrayRandom'})}>
//                         RANDOM
//                     </button>
//                 </div>
//             </div>
//             <div className="input-container">
//                 <p>Speed: {speed}  ms</p> 
//                 <div className="range-input-container">
//                     <input 
//                         disabled={checkIfNeedDisable()} 
//                         type="range" 
//                         className="slider speed-slider" 
//                         step="1" 
//                         min={5} max={200} 
//                         // value={syncMode ? '' : inputState.speed} 
//                         value={speed} 
//                         onChange={ e => handleSpeedChange(e.target.value)}
//                     />
//                 </div>
//             </div>
//         </div>
//     )
// }
// export default Inputs