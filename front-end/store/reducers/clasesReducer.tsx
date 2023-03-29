import produce from 'immer'
import { ClasesAction, ClasesActionTypes } from '../actions/clasesActions'
import { ApiStatus, IClasesItem } from '../models'

export const initialClasesState: IClasesState = {
  loadingStatus: ApiStatus.NOTLOADED,
  addingStatus: ApiStatus.NOTLOADED,
  searchingStatus: ApiStatus.NOTLOADED,
  searchString: '',
  clases: [],
  foundclases: [],
  totalDocs: 0,
  errMessage: '',
  errStatus: null,
  errField: null,
}

export default function clasesReducer(state: IClasesState = initialClasesState, action: ClasesAction) {
  return produce(state, (draft) => {
    switch (action.type) {
      case ClasesActionTypes.SEARCH_CLASES:
        draft.searchString = action.searchOptions.searchString
        break
      case ClasesActionTypes.SEARCHING_CLASES:
        draft.searchingStatus = ApiStatus.LOADING
        draft.loadingStatus = ApiStatus.NOTLOADED
        draft.addingStatus = ApiStatus.NOTLOADED
        break

      case ClasesActionTypes.SEARCHING_CLASES_FAILED:
        draft.searchingStatus = ApiStatus.FAILED
        break

      case ClasesActionTypes.FOUND_CLASES:
        draft.searchingStatus = ApiStatus.LOADED
        action.keep ? draft.foundclases.push(...action.payload.clases.docs) : (draft.foundclases = action.payload.clases.docs)
        draft.totalDocs = action.payload.clases.totalDocs
        break

      case ClasesActionTypes.LOAD_CLASES:
      case ClasesActionTypes.LOADING_CLASES:
        draft.loadingStatus = ApiStatus.LOADING
        draft.addingStatus = ApiStatus.NOTLOADED
        draft.searchingStatus = ApiStatus.NOTLOADED
        draft.foundclases = []
        break

      case ClasesActionTypes.LOADING_CLASES_FAILED:
        draft.loadingStatus = ApiStatus.FAILED
        break

      case ClasesActionTypes.LOADED_CLASES:
        draft.loadingStatus = ApiStatus.LOADED
        draft.clases = action.payload.clases.docs
        draft.totalDocs = action.payload.clases.totalDocs
        break

      case ClasesActionTypes.ADD_CLASES:
      case ClasesActionTypes.ADDING_CLASES:
        draft.addingStatus = ApiStatus.LOADING
        draft.searchingStatus = ApiStatus.NOTLOADED
        draft.errMessage = ''
        draft.errStatus = null
        draft.errField = null
        break

      case ClasesActionTypes.ADDING_CLASES_FAILED:
        draft.addingStatus = ApiStatus.FAILED
        draft.errMessage = action.message
        draft.errStatus = action.status
        draft.errField = action.field
        break

      case ClasesActionTypes.ADDED_CLASES:
        draft.addingStatus = ApiStatus.LOADED
        draft.errStatus = 200
        draft.clases.push(action.payload.clases.docs[0])
        if (draft.searchString) draft.foundclases.push(action.payload.clases.docs[0])
        break

      case ClasesActionTypes.REMOVE_CLASE:
        draft.clases.splice(
          draft.clases.findIndex((clase) => clase._id === action.payload._id),
          1
        )
        break

      case ClasesActionTypes.EDIT_CLASES:
        draft.loadingStatus = ApiStatus.NOTLOADED
        draft.addingStatus = ApiStatus.LOADING
        draft.searchingStatus = ApiStatus.NOTLOADED
        draft.clases[draft.clases.findIndex((clase) => clase._id === action.payload._id)] = action.payload
        break

      case ClasesActionTypes.EDITED_CLASES:
        draft.addingStatus = ApiStatus.LOADED
        draft.clases[draft.clases.findIndex((clase) => clase._id === action.payload._id)] = action.payload
        draft.foundclases[draft.foundclases.findIndex((clase) => clase._id === action.payload._id)] = action.payload
        break
    }
  })
}

export interface IClasesState {
  loadingStatus: ApiStatus
  addingStatus: ApiStatus
  searchingStatus: ApiStatus
  searchString: string
  clases: IClasesItem[]
  foundclases: IClasesItem[]
  totalDocs: number
  errMessage?: string
  errStatus?: number
  errField?: string
}
