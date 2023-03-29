export interface IRespuestasItem {
  _id?: String
  createdAt: Date

  Pregunta: string
  Respuesta: String
  Unidad: String
}

export interface IpaginatedRespuestas {
  docs: IRespuestasItem[]
  totalDocs: number
  offset: number
  limit: number
  totalPages: number
  page: number
  pagingCounter: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage: number | null
  nextPage: number | null
}
export interface IClasesItem {
  _id?: String
  createdAt: Date

  nombreClase: string
}

export interface IpaginatedClases {
  docs: IClasesItem[]
  totalDocs: number
  offset: number
  limit: number
  totalPages: number
  page: number
  pagingCounter: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage: number | null
  nextPage: number | null
}
export interface IPreguntasItem {
  _id?: String
  createdAt: Date

  Pregunta: string
  Unidad: String
}

export interface IpaginatedPreguntas {
  docs: IPreguntasItem[]
  totalDocs: number
  offset: number
  limit: number
  totalPages: number
  page: number
  pagingCounter: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage: number | null
  nextPage: number | null
}
export interface IUsersItem {
  _id?: String
  createdAt: Date

  FirstName: string

  LastName: string

  Email: string

  Password: string
  Role: String
}

export interface IpaginatedUsers {
  docs: IUsersItem[]
  totalDocs: number
  offset: number
  limit: number
  totalPages: number
  page: number
  pagingCounter: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage: number | null
  nextPage: number | null
}

export enum ApiStatus {
  NOTLOADED = 'notloaded',
  LOADING = 'loading',
  LOADED = 'loaded',
  FAILED = 'failed',
}
