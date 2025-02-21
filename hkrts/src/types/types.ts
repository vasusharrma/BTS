
export type Kidneytype = { healthy: boolean }[]


export interface User {
  name: string,
  kidneys: Kidneytype

}

export type covid_headers = {
  username: string | string[] | undefined
  password: string | string[] | undefined
}

export interface zodfuncitontyep {
  name: string,
  email: string,
  arr: number[]
}
