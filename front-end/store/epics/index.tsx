import { Action } from 'redux'
import { combineEpics, createEpicMiddleware } from 'redux-observable'
import { IState } from '../reducers'
import clasesEpics from './clasesEpics'
import preguntasEpics from './preguntasEpics'
import respuestasEpics from './respuestasEpics'
import usersEpics from './usersEpics'

export const rootEpic = combineEpics(respuestasEpics, clasesEpics, preguntasEpics, usersEpics)

export default createEpicMiddleware<Action, Action, IState>()
