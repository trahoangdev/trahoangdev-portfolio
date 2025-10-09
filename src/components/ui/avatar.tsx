import * as React from "react"
import { cn } from "@/lib/utils"

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string
  alt?: string
  size?: "sm" | "md" | "lg" | "xl" | "2xl"
  fallback?: string
  className?: string
}

const sizeClasses = {
  sm: "w-8 h-8",
  md: "w-12 h-12", 
  lg: "w-16 h-16",
  xl: "w-24 h-24",
  "2xl": "w-32 h-32"
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ src, alt = "Avatar", size = "2xl", fallback, className, ...props }, ref) => {
    const [imageError, setImageError] = React.useState(false)
    
    const handleImageError = () => {
      setImageError(true)
    }

    return (
      <div className="relative inline-block">
        <div
          ref={ref}
          className={cn(
            "relative inline-flex items-center justify-center rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold shadow-lg",
            "transition-all duration-300 ease-in-out",
            "hover:shadow-xl hover:shadow-blue-500/25",
            sizeClasses[size],
            className
          )}
          {...props}
        >
          {src && !imageError ? (
            <img
              src={src}
              alt={alt}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              onError={handleImageError}
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full">
              {fallback ? (
                <span className="text-sm font-bold">
                  {fallback}
                </span>
              ) : (
                <svg
                  className="w-1/2 h-1/2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>
          )}
        </div>
        
        {/* Online Status Indicator - Responsive sizing */}
        <div className="absolute -bottom-0.5 -right-0.5 sm:-bottom-1 sm:-right-1">
          <div className="relative">
            {/* Outer pulsing ring */}
            <div className="absolute inset-0 w-3 h-3 sm:w-4 sm:h-4 bg-green-400 rounded-full animate-ping opacity-75"></div>
            {/* Inner solid dot */}
            <div className="relative w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full border border-white shadow-sm"></div>
          </div>
        </div>
        
        {/* Subtle glow effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-400/20 to-blue-400/20 blur-xl opacity-0 hover:opacity-100 transition-opacity duration-500 -z-10"></div>
      </div>
    )
  }
)

Avatar.displayName = "Avatar"

export { Avatar }