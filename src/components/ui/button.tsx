'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer',
  {
    variants: {
      variant: {
        default: 'bg-green-500 text-white shadow-lg shadow-green-500/25 hover:bg-green-600 hover:shadow-green-500/40 active:scale-95',
        outline: 'border-2 border-green-500 text-green-500 bg-transparent hover:bg-green-500 hover:text-white active:scale-95',
        ghost: 'text-green-400 hover:bg-white/10 active:scale-95',
        secondary: 'bg-white text-gray-900 shadow-lg hover:bg-gray-50 active:scale-95',
        dark: 'bg-gray-900 text-white hover:bg-gray-800 active:scale-95',
      },
      size: {
        sm: 'h-9 px-4 text-sm',
        default: 'h-11 px-6 text-sm',
        lg: 'h-13 px-8 text-base',
        xl: 'h-14 px-10 text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
