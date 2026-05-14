import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-green-100 text-green-700',
        secondary: 'bg-gray-100 text-gray-700',
        outline: 'border border-green-500 text-green-600',
        white: 'bg-white/15 text-white border border-white/25 backdrop-blur-sm',
        dark: 'bg-white/10 text-green-400 border border-green-500/30',
      },
    },
    defaultVariants: { variant: 'default' },
  }
)

interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
