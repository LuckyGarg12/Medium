import { atom } from "jotai"

interface User {
    name:string | null,
    email:string
}

export const userAtom = atom<User>({name:null, email:""})