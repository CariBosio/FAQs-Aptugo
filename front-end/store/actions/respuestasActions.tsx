import { IpaginatedRespuestas, IRespuestasItem } from '../models'

export enum RespuestasActionTypes {
  SEARCH_RESPUESTAS = 'respuestas/search',
  SEARCHING_RESPUESTAS = 'respuestas/searching',
  FOUND_RESPUESTAS = 'respuestas/found',
  SEARCHING_RESPUESTAS_FAILED = 'respuestas/searching_failed',

  LOAD_RESPUESTAS = 'respuestas/load',
  LOADING_RESPUESTAS = 'respuestas/loading',
  LOADED_RESPUESTAS = 'respuestas/loaded',
  LOADING_RESPUESTAS_FAILED = 'respuestas/loading_failed',

  ADD_RESPUESTAS = 'respuestas/add',
  ADDING_RESPUESTAS = 'respuestas/adding',
  ADDED_RESPUESTAS = 'respuestas/added',
  ADDING_RESPUESTAS_FAILED = 'respuestas/adding_failed',

  REMOVE_REPUESTA = 'respuestas/remove',
  REMOVING_REPUESTA = 'respuestas/removing',
  REMOVED_REPUESTA = 'respuestas/removed',
  REMOVING_REPUESTA_FAILED = 'respuestas/removing_failed',

  EDIT_RESPUESTAS = 'respuestas/edit',
  EDITING_RESPUESTAS = 'respuestas/editing',
  EDITED_RESPUESTAS = 'respuestas/edited',
  EDITING_RESPUESTAS_FAILED = 'respuestas/editing_failed',
}

export function searchRespuestas(searchOptions: TSearchOptions | string, keep?: boolean): ISearchRespuestasAction {
  return {
    type: RespuestasActionTypes.SEARCH_RESPUESTAS,
    searchOptions: typeof searchOptions === 'string' ? { searchString: searchOptions } : searchOptions,
    keep: keep,
  }
}

export function searchingRespuestas(): ISearchingRespuestasAction {
  return {
    type: RespuestasActionTypes.SEARCHING_RESPUESTAS,
  }
}

export function foundRespuestas(respuestas: IpaginatedRespuestas, keep?: boolean): IFoundRespuestasAction {
  return {
    type: RespuestasActionTypes.FOUND_RESPUESTAS,
    keep: keep,
    payload: {
      respuestas,
    },
  }
}

export function searchingRespuestasFailed(): ISearchingRespuestasFailedAction {
  return {
    type: RespuestasActionTypes.SEARCHING_RESPUESTAS_FAILED,
  }
}

export function loadRespuestas(loadOptions: TSearchOptions): ILoadRespuestasAction {
  return {
    type: RespuestasActionTypes.LOAD_RESPUESTAS,
    loadOptions: loadOptions,
  }
}

export function loadingRespuestas(): ILoadingRespuestasAction {
  return {
    type: RespuestasActionTypes.LOADING_RESPUESTAS,
  }
}

export function loadedRespuestas(respuestas: IpaginatedRespuestas): ILoadedRespuestasAction {
  return {
    type: RespuestasActionTypes.LOADED_RESPUESTAS,
    payload: {
      respuestas,
    },
  }
}

export function loadingRespuestasFailed(): ILoadingRespuestasFailedAction {
  return {
    type: RespuestasActionTypes.LOADING_RESPUESTAS_FAILED,
  }
}

export function addRespuestas(repuesta: IRespuestasItem): IAddRespuestasAction {
  return {
    type: RespuestasActionTypes.ADD_RESPUESTAS,
    payload: repuesta,
  }
}

export function addingRespuestas(): IAddingRespuestasAction {
  return {
    type: RespuestasActionTypes.ADDING_RESPUESTAS,
  }
}

export function addedRespuestas(respuestas: IpaginatedRespuestas): IAddedRespuestasAction {
  return {
    type: RespuestasActionTypes.ADDED_RESPUESTAS,
    payload: {
      respuestas,
    },
  }
}

export function addingRespuestasFailed(errData: { data: { message: string; field?: string }; status: number }): IAddingRespuestasFailedAction {
  return {
    type: RespuestasActionTypes.ADDING_RESPUESTAS_FAILED,
    message: errData.data.message,
    status: errData.status,
    field: errData.data.field,
  }
}

export function removeRepuesta(repuesta: IRespuestasItem): IRemoveRepuestaAction {
  return {
    type: RespuestasActionTypes.REMOVE_REPUESTA,
    payload: repuesta,
  }
}

export function removingRepuesta(): IRemovingRepuestaAction {
  return {
    type: RespuestasActionTypes.REMOVING_REPUESTA,
  }
}

export function removedRepuesta(): IRemovedRepuestaAction {
  return {
    type: RespuestasActionTypes.REMOVED_REPUESTA,
  }
}

export function removingRepuestaFailed(): IRemovingRepuestaFailedAction {
  return {
    type: RespuestasActionTypes.REMOVING_REPUESTA_FAILED,
  }
}

export function editRespuestas(repuesta: IRespuestasItem): IEditRespuestasAction {
  return {
    type: RespuestasActionTypes.EDIT_RESPUESTAS,
    payload: repuesta,
  }
}

export function editingRespuestas(): IEditingRespuestasAction {
  return {
    type: RespuestasActionTypes.EDITING_RESPUESTAS,
  }
}

export function editedRespuestas(respuestas: IRespuestasItem): IEditedRespuestasAction {
  return {
    type: RespuestasActionTypes.EDITED_RESPUESTAS,
    payload: respuestas,
  }
}

export function editingRespuestasFailed(): IEditingRespuestasFailedAction {
  return {
    type: RespuestasActionTypes.EDITING_RESPUESTAS_FAILED,
  }
}

type TSearchOptions = {
  searchString?: string
  searchField?: string
  page?: number
  limit?: number
  populate?: boolean
  sort?: {
    field: string
    method?: 'asc' | 'desc'
  }
  filters?: { field: string; value: string }[]
}

export interface ISearchRespuestasAction {
  type: RespuestasActionTypes.SEARCH_RESPUESTAS
  searchOptions: TSearchOptions
  keep?: boolean
}

export interface ISearchingRespuestasAction {
  type: RespuestasActionTypes.SEARCHING_RESPUESTAS
}

export interface IFoundRespuestasAction {
  type: RespuestasActionTypes.FOUND_RESPUESTAS
  keep?: boolean
  payload: {
    respuestas: IpaginatedRespuestas
  }
}

export interface ISearchingRespuestasFailedAction {
  type: RespuestasActionTypes.SEARCHING_RESPUESTAS_FAILED
}

export interface ILoadRespuestasAction {
  type: RespuestasActionTypes.LOAD_RESPUESTAS
  loadOptions: TSearchOptions
}

export interface ILoadingRespuestasAction {
  type: RespuestasActionTypes.LOADING_RESPUESTAS
}

export interface ILoadedRespuestasAction {
  type: RespuestasActionTypes.LOADED_RESPUESTAS
  payload: {
    respuestas: IpaginatedRespuestas
  }
}

export interface ILoadingRespuestasFailedAction {
  type: RespuestasActionTypes.LOADING_RESPUESTAS_FAILED
}

export interface IAddRespuestasAction {
  type: RespuestasActionTypes.ADD_RESPUESTAS
  payload: IRespuestasItem
}

export interface IAddingRespuestasAction {
  type: RespuestasActionTypes.ADDING_RESPUESTAS
}

export interface IAddedRespuestasAction {
  type: RespuestasActionTypes.ADDED_RESPUESTAS
  payload: {
    respuestas: IpaginatedRespuestas
  }
}

export interface IAddingRespuestasFailedAction {
  type: RespuestasActionTypes.ADDING_RESPUESTAS_FAILED
  message: string
  status: number
  field?: string
}

export interface IRemoveRepuestaAction {
  type: RespuestasActionTypes.REMOVE_REPUESTA
  payload: IRespuestasItem
}

export interface IRemovingRepuestaAction {
  type: RespuestasActionTypes.REMOVING_REPUESTA
}

export interface IRemovedRepuestaAction {
  type: RespuestasActionTypes.REMOVED_REPUESTA
}

export interface IRemovingRepuestaFailedAction {
  type: RespuestasActionTypes.REMOVING_REPUESTA_FAILED
}

export interface IEditRespuestasAction {
  type: RespuestasActionTypes.EDIT_RESPUESTAS
  payload: IRespuestasItem
}

export interface IEditingRespuestasAction {
  type: RespuestasActionTypes.EDITING_RESPUESTAS
}

export interface IEditedRespuestasAction {
  type: RespuestasActionTypes.EDITED_RESPUESTAS
  payload: IRespuestasItem
}

export interface IEditingRespuestasFailedAction {
  type: RespuestasActionTypes.EDITING_RESPUESTAS_FAILED
}

export type RespuestasAction =
  | ISearchRespuestasAction
  | ISearchingRespuestasAction
  | IFoundRespuestasAction
  | ISearchingRespuestasFailedAction
  | ILoadRespuestasAction
  | ILoadingRespuestasAction
  | ILoadedRespuestasAction
  | ILoadingRespuestasFailedAction
  | IAddRespuestasAction
  | IAddingRespuestasAction
  | IAddedRespuestasAction
  | IAddingRespuestasFailedAction
  | IRemoveRepuestaAction
  | IRemovingRepuestaAction
  | IRemovedRepuestaAction
  | IRemovingRepuestaFailedAction
  | IEditRespuestasAction
  | IEditingRespuestasAction
  | IEditedRespuestasAction
  | IEditingRespuestasFailedAction
