import axios from 'axios'
import { combineEpics, Epic } from 'redux-observable'
import { catchError, filter, map, mergeMap, startWith, switchMap } from 'rxjs/operators'
import {
  addedClases,
  addingClases,
  addingClasesFailed,
  ClasesAction,
  ClasesActionTypes,
  editedClases,
  editingClases,
  editingClasesFailed,
  foundClases,
  loadedClases,
  loadingClases,
  loadingClasesFailed,
  removedClase,
  removingClase,
  removingClaseFailed,
  searchingClases,
  searchingClasesFailed,
} from '../actions/clasesActions'
import buildFormData from './buildFormData'

import { from, of } from 'rxjs'
import { isOfType } from 'typesafe-actions'
import { IState } from '../reducers'

const searchClasesEpic: Epic<ClasesAction, ClasesAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(ClasesActionTypes.SEARCH_CLASES)),
    mergeMap((action) => {
      if (typeof action.searchOptions === 'string') {
        action.searchOptions = {
          searchString: action.searchOptions,
          page: 1,
          searchField: '_id',
        }
      }
      let url = `http://127.0.0.1:4567/api/clases/search/`
      return from(axios.get(url, { params: action.searchOptions })).pipe(
        map((response) => foundClases(response.data, action.keep)),
        startWith(searchingClases()),
        catchError(() => of(searchingClasesFailed()))
      )
    })
  )

const loadClasesEpic: Epic<ClasesAction, ClasesAction, IState> = (action$, state$) => {
  let responses = []
  return action$.pipe(
    filter(isOfType(ClasesActionTypes.LOAD_CLASES)),
    switchMap((action) => {
      let url = `http://127.0.0.1:4567/api/clases/`
      return from(axios.get(url, { params: action.loadOptions })).pipe(
        map((response) => loadedClases(response.data)),
        startWith(loadingClases()),
        catchError(() => of(loadingClasesFailed()))
      )
    })
  )
}

const addClasesEpic: Epic<ClasesAction, ClasesAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(ClasesActionTypes.ADD_CLASES)),

    mergeMap((action) => {
      const data = new FormData()
      buildFormData(data, action.payload)
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      }

      return from(axios.post(`http://127.0.0.1:4567/api/clases/`, data, config)).pipe(
        map((response) => addedClases(response.data)),
        startWith(addingClases()),
        catchError((err) => of(addingClasesFailed(err.response)))
      )
    })
  )

const removeClasesEpic: Epic<ClasesAction, ClasesAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(ClasesActionTypes.REMOVE_CLASE)),
    mergeMap((action) =>
      from(axios.delete(`http://127.0.0.1:4567/api/clases/${action.payload._id}`)).pipe(
        map((response) => removedClase()),
        startWith(removingClase()),
        catchError(() => of(removingClaseFailed()))
      )
    )
  )

const editClasesEpic: Epic<ClasesAction, ClasesAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(ClasesActionTypes.EDIT_CLASES)),
    mergeMap((action) => {
      const data = new FormData()
      buildFormData(data, action.payload)
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      }

      return from(axios.put(`http://127.0.0.1:4567/api/clases/${action.payload._id}`, data, config)).pipe(
        map((response) => editedClases(response.data)),
        startWith(editingClases()),
        catchError(() => of(editingClasesFailed()))
      )
    })
  )

export default combineEpics(searchClasesEpic, loadClasesEpic, addClasesEpic, removeClasesEpic, editClasesEpic)
