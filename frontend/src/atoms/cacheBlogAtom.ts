import { atom } from "jotai";

export interface blogType {
    id:string,
    title:string,
    content:string,
    publishDate:string,
    author:{
        name:string
    }
}

export const cacheBlogAtom = atom<{[key:string]: blogType}>({});
export const cacheTimeout = atom<number>();