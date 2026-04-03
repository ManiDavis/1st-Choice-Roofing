import Link from 'next/link'
import { cn } from '@/lib/utils'

type ButtonVariant = 'primary' | 'secondary' | 'gold' | 'ghost' | 'outline'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps {
  label: string
  href?: string
  onClick?: () => void
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  fullWidth?: boolean
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-brand-red hover:bg-brand-red-dark text-white border-transparent',
  secondary: 'bg-transparent border-white text-white hover:bg-white hover:text-brand-navy',
  gold: 'bg-brand-gold hover:bg-brand-gold-dark text-brand-navy border-transparent font-bold',
  ghost: 'bg-white/10 hover:bg-white/20 text-white border-white/30',
  outline: 'bg-transparent border-brand-red text-brand-red hover:bg-brand-red hover:text-white',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
}

export function Button({
  label,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  className,
  type = 'button',
  disabled,
  fullWidth,
}: ButtonProps) {
  const classes = cn(
    'inline-flex items-center justify-center rounded-md border-2 font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-red focus:ring-offset-2',
    variantClasses[variant],
    sizeClasses[size],
    fullWidth && 'w-full',
    disabled && 'opacity-50 cursor-not-allowed',
    className
  )

  if (href) {
    const isExternal = href.startsWith('http') || href.startsWith('tel:') || href.startsWith('mailto:')
    if (isExternal) {
      return (
        <a href={href} className={classes} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}>
          {label}
        </a>
      )
    }
    return (
      <Link href={href} className={classes}>
        {label}
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} className={classes} disabled={disabled}>
      {label}
    </button>
  )
}
