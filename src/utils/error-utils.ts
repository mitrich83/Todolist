import {setAppErrorAC, SetAppErrorACType, setAppStatusAC, SetAppStatusACType} from '../app/app-reducer';
import {Dispatch} from 'redux';
import {CommonResponseType} from '../api/todolist-api';

export const handleServerNetworkError = (dispatch: Dispatch<ErrorActionType>, message: string)=> {
    dispatch(setAppErrorAC(message))
    dispatch(setAppStatusAC('failed'))
  }

export const handleServerAppError = <T>(dispatch: Dispatch<ErrorActionType>, data: CommonResponseType<T>)=> {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('some error'))
    }
    dispatch(setAppStatusAC('failed'))
}

  type ErrorActionType =  SetAppStatusACType | SetAppErrorACType