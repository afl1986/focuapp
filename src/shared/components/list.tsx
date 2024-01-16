import { cn } from '../lib'
import { type CFC } from '../types/component'

export const Ul: CFC<React.ButtonHTMLAttributes<HTMLUListElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <ul
      {...props}
      className={cn(
        'my-6 ml-4 list-disc [&>li]:mt-2 marker:text-sky-400',
        className,
      )}
    >
      {children}
    </ul>
  )
}

export const Li: CFC<React.ButtonHTMLAttributes<HTMLLIElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <li {...props} className={cn(className)}>
      {children}
    </li>
  )
}
