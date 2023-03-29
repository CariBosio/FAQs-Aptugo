import axios from 'axios'
import { combineEpics, Epic } from 'redux-observable'
import { catchError, filter, map, mergeMap, startWith, switchMap } from 'rxjs/operators'
import {
  addedPreguntas,
  addingPreguntas,
  addingPreguntasFailed,
  editedPreguntas,
  editingPreguntas,
  editingPreguntasFailed,
  foundPreguntas,
  loadedPreguntas,
  loadingPreguntas,
  loadingPreguntasFailed,
  PreguntasAction,
  PreguntasActionTypes,
  removedPregunta,
  removingPregunta,
  removingPreguntaFailed,
  searchingPreguntas,
  searchingPreguntasFailed,
} from '../actions/preguntasActions'
import buildFormData from './buildFormData'

import { from, of } from 'rxjs'
import { isOfType } from 'typesafe-actions'
import { IState } from '../reducers'

const searchPreguntasEpic: Epic<PreguntasAction, PreguntasAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(PreguntasActionTypes.SEARCH_PREGUNTAS)),
    mergeMap((action) => {
      if (typeof action.searchOptions === 'string') {
        action.searchOptions = {
          searchString: action.searchOptions,
          page: 1,
          searchField: '_id',
        }
      }
      let url = `http://127.0.0.1:4567/api/preguntas/search/`
      return from(axios.get(url, { params: action.searchOptions })).pipe(
        map((response) => foundPreguntas(response.data, action.keep)),
        startWith(searchingPreguntas()),
        catchError(() => of(searchingPreguntasFailed()))
      )
    })
  )

const loadPreguntasEpic: Epic<PreguntasAction, PreguntasAction, IState> = (action$, state$) => {
  let responses = []
  return action$.pipe(
    filter(isOfType(PreguntasActionTypes.LOAD_PREGUNTAS)),
    switchMap((action) => {
      let url = `http://127.0.0.1:4567/api/preguntas/`
      return from(axios.get(url, { params: action.loadOptions })).pipe(
        map((response) => loadedPreguntas(response.data)),
        startWith(loadingPreguntas()),
        catchError(() => of(loadingPreguntasFailed()))
      )
    })
  )
}

const addPreguntasEpic: Epic<PreguntasAction, PreguntasAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(PreguntasActionTypes.ADD_PREGUNTAS)),

    mergeMap((action) => {
      const data = new FormData()
      buildFormData(data, action.payload)
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      }

      return from(axios.post(`http://127.0.0.1:4567/api/preguntas/`, data, config)).pipe(
        map((response) => addedPreguntas(response.data)),
        startWith(addingPreguntas()),
        catchError((err) => of(addingPreguntasFailed(err.response)))
      )
    })
  )

const removePreguntasEpic: Epic<PreguntasAction, PreguntasAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(PreguntasActionTypes.REMOVE_PREGUNTA)),
    mergeMap((action) =>
      from(axios.delete(`http://127.0.0.1:4567/api/preguntas/${action.payload._id}`)).pipe(
        map((response) => removedPregunta()),
        startWith(removingPregunta()),
        catchError(() => of(removingPreguntaFailed()))
      )
    )
  )

const editPreguntasEpic: Epic<PreguntasAction, PreguntasAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(PreguntasActionTypes.EDIT_PREGUNTAS)),
    mergeMap((action) => {
      const data = new FormData()
      buildFormData(data, action.payload)
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      }

      return from(axios.put(`http://127.0.0.1:4567/api/preguntas/${action.payload._id}`, data, config)).pipe(
        map((response) => editedPreguntas(response.data)),
        startWith(editingPreguntas()),
        catchError(() => of(editingPreguntasFailed()))
      )
    })
  )

export default combineEpics(searchPreguntasEpic, loadPreguntasEpic, addPreguntasEpic, removePreguntasEpic, editPreguntasEpic)
