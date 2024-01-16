import { type FC, type ReactNode } from 'react'

// eslint-disable-next-line @typescript-eslint/ban-types
export type CFC<T = {}> = FC<T & { children?: ReactNode }>
