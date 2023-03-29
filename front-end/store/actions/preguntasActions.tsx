import { IpaginatedPreguntas, IPreguntasItem } from '../models'

export enum PreguntasActionTypes {
  SEARCH_PREGUNTAS = 'preguntas/search',
  SEARCHING_PREGUNTAS = 'preguntas/searching',
  FOUND_PREGUNTAS = 'preguntas/found',
  SEARCHING_PREGUNTAS_FAILED = 'preguntas/searching_failed',

  LOAD_PREGUNTAS = 'preguntas/load',
  LOADING_PREGUNTAS = 'preguntas/loading',
  LOADED_PREGUNTAS = 'preguntas/loaded',
  LOADING_PREGUNTAS_FAILED = 'preguntas/loading_failed',

  ADD_PREGUNTAS = 'preguntas/add',
  ADDING_PREGUNTAS = 'preguntas/adding',
  ADDED_PREGUNTAS = 'preguntas/added',
  ADDING_PREGUNTAS_FAILED = 'preguntas/adding_failed',

  REMOVE_PREGUNTA = 'preguntas/remove',
  REMOVING_PREGUNTA = 'preguntas/removing',
  REMOVED_PREGUNTA = 'preguntas/removed',
  REMOVING_PREGUNTA_FAILED = 'preguntas/removing_failed',

  EDIT_PREGUNTAS = 'preguntas/edit',
  EDITING_PREGUNTAS = 'preguntas/editing',
  EDITED_PREGUNTAS = 'preguntas/edited',
  EDITING_PREGUNTAS_FAILED = 'preguntas/editing_failed',
}

export function searchPreguntas(searchOptions: TSearchOptions | string, keep?: boolean): ISearchPreguntasAction {
  return {
    type: PreguntasActionTypes.SEARCH_PREGUNTAS,
    searchOptions: typeof searchOptions === 'string' ? { searchString: searchOptions } : searchOptions,
    keep: keep,
  }
}

export function searchingPreguntas(): ISearchingPreguntasAction {
  return {
    type: PreguntasActionTypes.SEARCHING_PREGUNTAS,
  }
}

export function foundPreguntas(preguntas: IpaginatedPreguntas, keep?: boolean): IFoundPreguntasAction {
  return {
    type: PreguntasActionTypes.FOUND_PREGUNTAS,
    keep: keep,
    payload: {
      preguntas,
    },
  }
}

export function searchingPreguntasFailed(): ISearchingPreguntasFailedAction {
  return {
    type: PreguntasActionTypes.SEARCHING_PREGUNTAS_FAILED,
  }
}

export function loadPreguntas(loadOptions: TSearchOptions): ILoadPreguntasAction {
  return {
    type: PreguntasActionTypes.LOAD_PREGUNTAS,
    loadOptions: loadOptions,
  }
}

export function loadingPreguntas(): ILoadingPreguntasAction {
  return {
    type: PreguntasActionTypes.LOADING_PREGUNTAS,
  }
}

export function loadedPreguntas(preguntas: IpaginatedPreguntas): ILoadedPreguntasAction {
  return {
    type: PreguntasActionTypes.LOADED_PREGUNTAS,
    payload: {
      preguntas,
    },
  }
}

export function loadingPreguntasFailed(): ILoadingPreguntasFailedAction {
  return {
    type: PreguntasActionTypes.LOADING_PREGUNTAS_FAILED,
  }
}

export function addPreguntas(pregunta: IPreguntasItem): IAddPreguntasAction {
  return {
    type: PreguntasActionTypes.ADD_PREGUNTAS,
    payload: pregunta,
  }
}

export function addingPreguntas(): IAddingPreguntasAction {
  return {
    type: PreguntasActionTypes.ADDING_PREGUNTAS,
  }
}

export function addedPreguntas(preguntas: IpaginatedPreguntas): IAddedPreguntasAction {
  return {
    type: PreguntasActionTypes.ADDED_PREGUNTAS,
    payload: {
      preguntas,
    },
  }
}

export function addingPreguntasFailed(errData: { data: { message: string; field?: string }; status: number }): IAddingPreguntasFailedAction {
  return {
    type: PreguntasActionTypes.ADDING_PREGUNTAS_FAILED,
    message: errData.data.message,
    status: errData.status,
    field: errData.data.field,
  }
}

export function removePregunta(pregunta: IPreguntasItem): IRemovePreguntaAction {
  return {
    type: PreguntasActionTypes.REMOVE_PREGUNTA,
    payload: pregunta,
  }
}

export function removingPregunta(): IRemovingPreguntaAction {
  return {
    type: PreguntasActionTypes.REMOVING_PREGUNTA,
  }
}

export function removedPregunta(): IRemovedPreguntaAction {
  return {
    type: PreguntasActionTypes.REMOVED_PREGUNTA,
  }
}

export function removingPreguntaFailed(): IRemovingPreguntaFailedAction {
  return {
    type: PreguntasActionTypes.REMOVING_PREGUNTA_FAILED,
  }
}

export function editPreguntas(pregunta: IPreguntasItem): IEditPreguntasAction {
  return {
    type: PreguntasActionTypes.EDIT_PREGUNTAS,
    payload: pregunta,
  }
}

export function editingPreguntas(): IEditingPreguntasAction {
  return {
    type: PreguntasActionTypes.EDITING_PREGUNTAS,
  }
}

export function editedPreguntas(preguntas: IPreguntasItem): IEditedPreguntasAction {
  return {
    type: PreguntasActionTypes.EDITED_PREGUNTAS,
    payload: preguntas,
  }
}

export function editingPreguntasFailed(): IEditingPreguntasFailedAction {
  return {
    type: PreguntasActionTypes.EDITING_PREGUNTAS_FAILED,
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

export interface ISearchPreguntasAction {
  type: PreguntasActionTypes.SEARCH_PREGUNTAS
  searchOptions: TSearchOptions
  keep?: boolean
}

export interface ISearchingPreguntasAction {
  type: PreguntasActionTypes.SEARCHING_PREGUNTAS
}

export interface IFoundPreguntasAction {
  type: PreguntasActionTypes.FOUND_PREGUNTAS
  keep?: boolean
  payload: {
    preguntas: IpaginatedPreguntas
  }
}

export interface ISearchingPreguntasFailedAction {
  type: PreguntasActionTypes.SEARCHING_PREGUNTAS_FAILED
}

export interface ILoadPreguntasAction {
  type: PreguntasActionTypes.LOAD_PREGUNTAS
  loadOptions: TSearchOptions
}

export interface ILoadingPreguntasAction {
  type: PreguntasActionTypes.LOADING_PREGUNTAS
}

export interface ILoadedPreguntasAction {
  type: PreguntasActionTypes.LOADED_PREGUNTAS
  payload: {
    preguntas: IpaginatedPreguntas
  }
}

export interface ILoadingPreguntasFailedAction {
  type: PreguntasActionTypes.LOADING_PREGUNTAS_FAILED
}

export interface IAddPreguntasAction {
  type: PreguntasActionTypes.ADD_PREGUNTAS
  payload: IPreguntasItem
}

export interface IAddingPreguntasAction {
  type: PreguntasActionTypes.ADDING_PREGUNTAS
}

export interface IAddedPreguntasAction {
  type: PreguntasActionTypes.ADDED_PREGUNTAS
  payload: {
    preguntas: IpaginatedPreguntas
  }
}

export interface IAddingPreguntasFailedAction {
  type: PreguntasActionTypes.ADDING_PREGUNTAS_FAILED
  message: string
  status: number
  field?: string
}

export interface IRemovePreguntaAction {
  type: PreguntasActionTypes.REMOVE_PREGUNTA
  payload: IPreguntasItem
}

export interface IRemovingPreguntaAction {
  type: PreguntasActionTypes.REMOVING_PREGUNTA
}

export interface IRemovedPreguntaAction {
  type: PreguntasActionTypes.REMOVED_PREGUNTA
}

export interface IRemovingPreguntaFailedAction {
  type: PreguntasActionTypes.REMOVING_PREGUNTA_FAILED
}

export interface IEditPreguntasAction {
  type: PreguntasActionTypes.EDIT_PREGUNTAS
  payload: IPreguntasItem
}

export interface IEditingPreguntasAction {
  type: PreguntasActionTypes.EDITING_PREGUNTAS
}

export interface IEditedPreguntasAction {
  type: PreguntasActionTypes.EDITED_PREGUNTAS
  payload: IPreguntasItem
}

export interface IEditingPreguntasFailedAction {
  type: PreguntasActionTypes.EDITING_PREGUNTAS_FAILED
}

export type PreguntasAction =
  | ISearchPreguntasAction
  | ISearchingPreguntasAction
  | IFoundPreguntasAction
  | ISearchingPreguntasFailedAction
  | ILoadPreguntasAction
  | ILoadingPreguntasAction
  | ILoadedPreguntasAction
  | ILoadingPreguntasFailedAction
  | IAddPreguntasAction
  | IAddingPreguntasAction
  | IAddedPreguntasAction
  | IAddingPreguntasFailedAction
  | IRemovePreguntaAction
  | IRemovingPreguntaAction
  | IRemovedPreguntaAction
  | IRemovingPreguntaFailedAction
  | IEditPreguntasAction
  | IEditingPreguntasAction
  | IEditedPreguntasAction
  | IEditingPreguntasFailedAction
