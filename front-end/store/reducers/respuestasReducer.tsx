import produce from 'immer'
import { RespuestasAction, RespuestasActionTypes } from '../actions/respuestasActions'
import { ApiStatus, IRespuestasItem } from '../models'

export const initialRespuestasState: IRespuestasState = {
  loadingStatus: ApiStatus.NOTLOADED,
  addingStatus: ApiStatus.NOTLOADED,
  searchingStatus: ApiStatus.NOTLOADED,
  searchString: '',
  respuestas: [],
  foundrespuestas: [],
  totalDocs: 0,
  errMessage: '',
  errStatus: null,
  errField: null,
}

export default function respuestasReducer(state: IRespuestasState = initialRespuestasState, action: RespuestasAction) {
  return produce(state, (draft) => {
    switch (action.type) {
      case RespuestasActionTypes.SEARCH_RESPUESTAS:
        draft.searchString = action.searchOptions.searchString
        break
      case RespuestasActionTypes.SEARCHING_RESPUESTAS:
        draft.searchingStatus = ApiStatus.LOADING
        draft.loadingStatus = ApiStatus.NOTLOADED
        draft.addingStatus = ApiStatus.NOTLOADED
        break

      case RespuestasActionTypes.SEARCHING_RESPUESTAS_FAILED:
        draft.searchingStatus = ApiStatus.FAILED
        break

      case RespuestasActionTypes.FOUND_RESPUESTAS:
        draft.searchingStatus = ApiStatus.LOADED
        action.keep ? draft.foundrespuestas.push(...action.payload.respuestas.docs) : (draft.foundrespuestas = action.payload.respuestas.docs)
        draft.totalDocs = action.payload.respuestas.totalDocs
        break

      case RespuestasActionTypes.LOAD_RESPUESTAS:
      case RespuestasActionTypes.LOADING_RESPUESTAS:
        draft.loadingStatus = ApiStatus.LOADING
        draft.addingStatus = ApiStatus.NOTLOADED
        draft.searchingStatus = ApiStatus.NOTLOADED
        draft.foundrespuestas = []
        break

      case RespuestasActionTypes.LOADING_RESPUESTAS_FAILED:
        draft.loadingStatus = ApiStatus.FAILED
        break

      case RespuestasActionTypes.LOADED_RESPUESTAS:
        draft.loadingStatus = ApiStatus.LOADED
        draft.respuestas = action.payload.respuestas.docs
        draft.totalDocs = action.payload.respuestas.totalDocs
        break

      case RespuestasActionTypes.ADD_RESPUESTAS:
      case RespuestasActionTypes.ADDING_RESPUESTAS:
        draft.addingStatus = ApiStatus.LOADING
        draft.searchingStatus = ApiStatus.NOTLOADED
        draft.errMessage = ''
        draft.errStatus = null
        draft.errField = null
        break

      case RespuestasActionTypes.ADDING_RESPUESTAS_FAILED:
        draft.addingStatus = ApiStatus.FAILED
        draft.errMessage = action.message
        draft.errStatus = action.status
        draft.errField = action.field
        break

      case RespuestasActionTypes.ADDED_RESPUESTAS:
        draft.addingStatus = ApiStatus.LOADED
        draft.errStatus = 200
        draft.respuestas.push(action.payload.respuestas.docs[0])
        if (draft.searchString) draft.foundrespuestas.push(action.payload.respuestas.docs[0])
        break

      case RespuestasActionTypes.REMOVE_REPUESTA:
        draft.respuestas.splice(
          draft.respuestas.findIndex((repuesta) => repuesta._id === action.payload._id),
          1
        )
        break

      case RespuestasActionTypes.EDIT_RESPUESTAS:
        draft.loadingStatus = ApiStatus.NOTLOADED
        draft.addingStatus = ApiStatus.LOADING
        draft.searchingStatus = ApiStatus.NOTLOADED
        draft.respuestas[draft.respuestas.findIndex((repuesta) => repuesta._id === action.payload._id)] = action.payload
        break

      case RespuestasActionTypes.EDITED_RESPUESTAS:
        draft.addingStatus = ApiStatus.LOADED
        draft.respuestas[draft.respuestas.findIndex((repuesta) => repuesta._id === action.payload._id)] = action.payload
        draft.foundrespuestas[draft.foundrespuestas.findIndex((repuesta) => repuesta._id === action.payload._id)] = action.payload
        break
    }
  })
}

export interface IRespuestasState {
  loadingStatus: ApiStatus
  addingStatus: ApiStatus
  searchingStatus: ApiStatus
  searchString: string
  respuestas: IRespuestasItem[]
  foundrespuestas: IRespuestasItem[]
  totalDocs: number
  errMessage?: string
  errStatus?: number
  errField?: string
}
