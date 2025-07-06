import { atom } from "jotai";

interface blogType {
    id:string,
    title:string,
    content:string,
    publishDate:string
    author:{
        name:string|null
    }
}

export const blogsAtom = atom<blogType[]> ([])

export const timeoutIdAtom = atom<number>()