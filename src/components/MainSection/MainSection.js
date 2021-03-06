import React, { useState, useEffect, useReducer } from 'react'
import Inputs from './Inputs/Inputs'
import AlgoSection from './AlgoSection/AlgoSection'
import PlayMenu from './PlayMenu/PlayMenu'
import { Routes, Route, useLocation } from "react-router-dom";
import { createArray, createRandomArray } from '../../functions/functions'
import './main-section.css'


import {useDispatch, useSelector} from 'react-redux'
import { updateAllInput,  updateSpeedInput, updateLengthInput, updateArrayInput, updateArrayRandomInput} from '../../store/inputsSlice'


function MainSection(props) {
    const { 
        sortList, 
        searchList, 
        isRunningSync, 
        syncMode, 
        handleRemoveFromCompareList, 
        handleChangeCompareMode,
        handleIsRunningSyncChange,
        compareList,
        compareMode
    } = props

    const list = [...sortList, ...searchList]
    const location = useLocation()

    const  input  = useSelector(state => state.input.syncInput)
    console.log(input)
    const dispatch = useDispatch()


    useEffect(() => {
        if(syncMode)return dispatch(updateArrayInput('syncInput'));
    }, [syncMode])

    //Reset SyncArray if Reset clicked
    useEffect(() => {
        if(isRunningSync === 'reset') return dispatch(updateArrayInput('syncInput'));
    }, [isRunningSync])

    //Turn On CompareMode if page refreshed/or  visit strait to CompareMode page
    useEffect(()=>{
        if(location.pathname === '/compare-mode' &&  !compareMode) handleChangeCompareMode()
    }, [location])


    //INPUT SWITCH ANIMATION
    const [contract, setContract ] = useState(false)
    const [collapseWidth, setCollapseWidth ] = useState(false)
    useEffect( ()=>{
        let timer
        if(syncMode) timer = setTimeout(()=>setContract(false), 400)
        else  timer = setTimeout(()=>setContract(true), 5)
        return ()=> clearTimeout(timer)
    }, [syncMode])
    useEffect( ()=>{
        let timer
        if(contract)timer = setTimeout(()=> setCollapseWidth(true), 200)
        else timer = setTimeout(()=> setCollapseWidth(false), 0)
        return ()=> clearTimeout(timer)
    },[contract])


    return (
        <div className={syncMode ? 'main-section sync-mode-on main-grid grid' : "main-section sync-mode-off main-grid grid"}>

            <div className={collapseWidth ? `collapse-container collapse-width` : `collapse-container`}>
                <div className={contract ? `collapse-section` : 'collapse-section expanded'  }>
                    <Inputs
                        syncMode={syncMode}
                        // inputState={inputState}
                        // dispatch={dispatchArray}
                        isRunningSync={isRunningSync}
                        className={'inputs-sync'}
                    />
                    <PlayMenu
                        type={'sync'}
                        syncMode={syncMode}
                        isRunningSync={isRunningSync}
                        compareMode={compareMode}
                        compareList={compareList}
                        handleIsRunningSyncChange={handleIsRunningSyncChange}
                    />
                </div>
            </div>
            
            <div className={syncMode ? 'content-section sync-mode' : 'content-section individ-mode'}>
                <Routes>
                    <Route path="/compare-mode" exact element={
                        compareList.map( (algo, i) =>   
                            <AlgoSection
                                key={i}
                                typeOfAlgo={algo}
                                syncMode={syncMode}
                                compareMode={compareMode}
                                inputStateSync={input}
                                isRunningSync={isRunningSync}
                                compareList={compareList}
                                handleRemoveFromCompareList={handleRemoveFromCompareList}
                            />
                        )}
                    />

                    { list.map( (algo, i) => {
                            return (
                                <Route key={i} path={algo.path} exact element={
                                    <AlgoSection
                                        list={list}
                                        typeOfAlgo={algo.name}
                                        syncMode={null}
                                        compareMode={compareMode}
                                        inputStateSync={null}
                                        isRunningSync={null}
                                        compareList={compareList}
                                        handleRemoveFromCompareList={null}
                                    >
                                        {!algo.isReady && <h1>Coming soon ...</h1>}
                                    </AlgoSection>
                                }/>
                            ) 
                        })
                    }
                </Routes>
            </div>
        </div>
    )
}

export default MainSection







    //SyncInput states
    // let initArr = createRandomArray()
    // let InitSyncInputState = {
    //     speed:45,
    //     length:60,
    //     array:[...initArr]
    // }
    // function  reducerInputSync(input, action){
    //     switch (action.type){
    //         case 'update':  return { ...input, ...action.playload }
    //         case 'changeSpeed': return {...input, speed : action.playload}
    //         case 'changeLength': return {...input, length : action.playload}
    //         case 'changeArray':
    //             let array = createArray(input.length)
    //             return { ...input,  array : array }
    //         case 'changeArrayRandom':
    //             let randomArr = createRandomArray()
    //             return {...input, length : randomArr.length, array : randomArr}
    //         default : console.log('Throw Error from reducerInputSync')
    //     }
    // }
    // const [ inputState, dispatchArray ] = useReducer(reducerInputSync, InitSyncInputState)

    // //Reset SyncArray if SyncMode is On
    // useEffect(() => {
    //     if(syncMode)return dispatchArray({type:'changeArray'});
    // }, [syncMode])

    // //Reset SyncArray if Reset clicked
    // useEffect(() => {
    //     if(isRunningSync === 'reset') return dispatchArray( {type:'changeArray'} );
    // }, [isRunningSync])
