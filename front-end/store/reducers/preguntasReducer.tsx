import produce from 'immer'
import { PreguntasAction, PreguntasActionTypes } from '../actions/preguntasActions'
import { ApiStatus, IPreguntasItem } from '../models'

export const initialPreguntasState: IPreguntasState = {
  loadingStatus: ApiStatus.NOTLOADED,
  addingStatus: ApiStatus.NOTLOADED,
  searchingStatus: ApiStatus.NOTLOADED,
  searchString: '',
  preguntas: [],
  foundpreguntas: [],
  totalDocs: 0,
  errMessage: '',
  errStatus: null,
  errField: null,
}

export default function preguntasReducer(state: IPreguntasState = initialPreguntasState, action: PreguntasAction) {
  return produce(state, (draft) => {
    switch (action.type) {
      case PreguntasActionTypes.SEARCH_PREGUNTAS:
        draft.searchString = action.searchOptions.searchString
        break
      case PreguntasActionTypes.SEARCHING_PREGUNTAS:
        draft.searchingStatus = ApiStatus.LOADING
        draft.loadingStatus = ApiStatus.NOTLOADED
        draft.addingStatus = ApiStatus.NOTLOADED
        break

      case PreguntasActionTypes.SEARCHING_PREGUNTAS_FAILED:
        draft.searchingStatus = ApiStatus.FAILED
        break

      case PreguntasActionTypes.FOUND_PREGUNTAS:
        draft.searchingStatus = ApiStatus.LOADED
        action.keep ? draft.foundpreguntas.push(...action.payload.preguntas.docs) : (draft.foundpreguntas = action.payload.preguntas.docs)
        draft.totalDocs = action.payload.preguntas.totalDocs
        break

      case PreguntasActionTypes.LOAD_PREGUNTAS:
      case PreguntasActionTypes.LOADING_PREGUNTAS:
        draft.loadingStatus = ApiStatus.LOADING
        draft.addingStatus = ApiStatus.NOTLOADED
        draft.searchingStatus = ApiStatus.NOTLOADED
        draft.foundpreguntas = []
        break

      case PreguntasActionTypes.LOADING_PREGUNTAS_FAILED:
        draft.loadingStatus = ApiStatus.FAILED
        break

      case PreguntasActionTypes.LOADED_PREGUNTAS:
        draft.loadingStatus = ApiStatus.LOADED
        draft.preguntas = action.payload.preguntas.docs
        draft.totalDocs = action.payload.preguntas.totalDocs
        break

      case PreguntasActionTypes.ADD_PREGUNTAS:
      case PreguntasActionTypes.ADDING_PREGUNTAS:
        draft.addingStatus = ApiStatus.LOADING
        draft.searchingStatus = ApiStatus.NOTLOADED
        draft.errMessage = ''
        draft.errStatus = null
        draft.errField = null
        break

      case PreguntasActionTypes.ADDING_PREGUNTAS_FAILED:
        draft.addingStatus = ApiStatus.FAILED
        draft.errMessage = action.message
        draft.errStatus = action.status
        draft.errField = action.field
        break

      case PreguntasActionTypes.ADDED_PREGUNTAS:
        draft.addingStatus = ApiStatus.LOADED
        draft.errStatus = 200
        draft.preguntas.push(action.payload.preguntas.docs[0])
        if (draft.searchString) draft.foundpreguntas.push(action.payload.preguntas.docs[0])
        break

      case PreguntasActionTypes.REMOVE_PREGUNTA:
        draft.preguntas.splice(
          draft.preguntas.findIndex((pregunta) => pregunta._id === action.payload._id),
          1
        )
        break

      case PreguntasActionTypes.EDIT_PREGUNTAS:
        draft.loadingStatus = ApiStatus.NOTLOADED
        draft.addingStatus = ApiStatus.LOADING
        draft.searchingStatus = ApiStatus.NOTLOADED
        draft.preguntas[draft.preguntas.findIndex((pregunta) => pregunta._id === action.payload._id)] = action.payload
        break

      case PreguntasActionTypes.EDITED_PREGUNTAS:
        draft.addingStatus = ApiStatus.LOADED
        draft.preguntas[draft.preguntas.findIndex((pregunta) => pregunta._id === action.payload._id)] = action.payload
        draft.foundpreguntas[draft.foundpreguntas.findIndex((pregunta) => pregunta._id === action.payload._id)] = action.payload
        break
    }
  })
}

export interface IPreguntasState {
  loadingStatus: ApiStatus
  addingStatus: ApiStatus
  searchingStatus: ApiStatus
  searchString: string
  preguntas: IPreguntasItem[]
  foundpreguntas: IPreguntasItem[]
  totalDocs: number
  errMessage?: string
  errStatus?: number
  errField?: string
}
