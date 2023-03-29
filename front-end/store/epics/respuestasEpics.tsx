import axios from 'axios'
import { combineEpics, Epic } from 'redux-observable'
import { catchError, filter, map, mergeMap, startWith, switchMap } from 'rxjs/operators'
import {
  addedRespuestas,
  addingRespuestas,
  addingRespuestasFailed,
  editedRespuestas,
  editingRespuestas,
  editingRespuestasFailed,
  foundRespuestas,
  loadedRespuestas,
  loadingRespuestas,
  loadingRespuestasFailed,
  removedRepuesta,
  removingRepuesta,
  removingRepuestaFailed,
  RespuestasAction,
  RespuestasActionTypes,
  searchingRespuestas,
  searchingRespuestasFailed,
} from '../actions/respuestasActions'
import buildFormData from './buildFormData'

import { from, of } from 'rxjs'
import { isOfType } from 'typesafe-actions'
import { IState } from '../reducers'

const searchRespuestasEpic: Epic<RespuestasAction, RespuestasAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(RespuestasActionTypes.SEARCH_RESPUESTAS)),
    mergeMap((action) => {
      if (typeof action.searchOptions === 'string') {
        action.searchOptions = {
          searchString: action.searchOptions,
          page: 1,
          searchField: '_id',
        }
      }
      let url = `http://127.0.0.1:4567/api/respuestas/search/`
      return from(axios.get(url, { params: action.searchOptions })).pipe(
        map((response) => foundRespuestas(response.data, action.keep)),
        startWith(searchingRespuestas()),
        catchError(() => of(searchingRespuestasFailed()))
      )
    })
  )

const loadRespuestasEpic: Epic<RespuestasAction, RespuestasAction, IState> = (action$, state$) => {
  let responses = []
  return action$.pipe(
    filter(isOfType(RespuestasActionTypes.LOAD_RESPUESTAS)),
    switchMap((action) => {
      let url = `http://127.0.0.1:4567/api/respuestas/`
      return from(axios.get(url, { params: action.loadOptions })).pipe(
        map((response) => loadedRespuestas(response.data)),
        startWith(loadingRespuestas()),
        catchError(() => of(loadingRespuestasFailed()))
      )
    })
  )
}

const addRespuestasEpic: Epic<RespuestasAction, RespuestasAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(RespuestasActionTypes.ADD_RESPUESTAS)),

    mergeMap((action) => {
      const data = new FormData()
      buildFormData(data, action.payload)
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      }

      return from(axios.post(`http://127.0.0.1:4567/api/respuestas/`, data, config)).pipe(
        map((response) => addedRespuestas(response.data)),
        startWith(addingRespuestas()),
        catchError((err) => of(addingRespuestasFailed(err.response)))
      )
    })
  )

const removeRespuestasEpic: Epic<RespuestasAction, RespuestasAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(RespuestasActionTypes.REMOVE_REPUESTA)),
    mergeMap((action) =>
      from(axios.delete(`http://127.0.0.1:4567/api/respuestas/${action.payload._id}`)).pipe(
        map((response) => removedRepuesta()),
        startWith(removingRepuesta()),
        catchError(() => of(removingRepuestaFailed()))
      )
    )
  )

const editRespuestasEpic: Epic<RespuestasAction, RespuestasAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(RespuestasActionTypes.EDIT_RESPUESTAS)),
    mergeMap((action) => {
      const data = new FormData()
      buildFormData(data, action.payload)
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      }

      return from(axios.put(`http://127.0.0.1:4567/api/respuestas/${action.payload._id}`, data, config)).pipe(
        map((response) => editedRespuestas(response.data)),
        startWith(editingRespuestas()),
        catchError(() => of(editingRespuestasFailed()))
      )
    })
  )

export default combineEpics(searchRespuestasEpic, loadRespuestasEpic, addRespuestasEpic, removeRespuestasEpic, editRespuestasEpic)
