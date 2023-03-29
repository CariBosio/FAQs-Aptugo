import { combineReducers } from 'redux'

import clasesReducer, { IClasesState, initialClasesState } from './clasesReducer'
import preguntasReducer, { initialPreguntasState, IPreguntasState } from './preguntasReducer'
import respuestasReducer, { initialRespuestasState, IRespuestasState } from './respuestasReducer'
import usersReducer, { initialUsersState, IUsersState } from './usersReducer'

export interface IState {
  respuestas: IRespuestasState
  clases: IClasesState
  preguntas: IPreguntasState
  users: IUsersState
}

export const initialState: IState = {
  respuestas: initialRespuestasState,
  clases: initialClasesState,
  preguntas: initialPreguntasState,
  users: initialUsersState,
}

export default combineReducers({
  respuestas: respuestasReducer,
  clases: clasesReducer,
  preguntas: preguntasReducer,
  users: usersReducer,
})
