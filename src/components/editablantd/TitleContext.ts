import React from 'react'

/**
 * Context hook is used to set global level state where the value can also be used by child components
 * Here I'm creating the context
 * */
export interface IContext {
    title?: string | null;
    setTitle: (name: string) => void;
}

export const initialContextTitle: IContext = {
  title: 'Sandlwood',
  setTitle: (title?:string | null) => {}
}

export const TitleContext = React.createContext({} as IContext)
