import type React from "react"

export const UnicefLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 200 60" fill="currentColor" {...props}>
    <path
      d="M40 30c0-11-9-20-20-20S0 19 0 30s9 20 20 20 20-9 20-20z"
      className="text-blue-400"
      fill="currentColor"
      opacity="0.2"
    />
    <text x="50" y="40" fontFamily="sans-serif" fontWeight="bold" fontSize="32" fill="currentColor">
      unicef
    </text>
  </svg>
)

export const WHOIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 200 60" fill="currentColor" {...props}>
    <path
      d="M30 10l10 17h-20l10-17zm0 40l-10-17h20l-10 17z"
      className="text-blue-600"
      fill="currentColor"
      opacity="0.2"
    />
    <text x="50" y="40" fontFamily="sans-serif" fontWeight="bold" fontSize="32" fill="currentColor">
      OMS
    </text>
  </svg>
)

export const WorldBankLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 250 60" fill="currentColor" {...props}>
    <rect x="0" y="10" width="40" height="40" rx="4" className="text-blue-700" fill="currentColor" opacity="0.2" />
    <text x="55" y="25" fontFamily="sans-serif" fontWeight="bold" fontSize="18" fill="currentColor">
      THE WORLD BANK
    </text>
    <text x="55" y="45" fontFamily="sans-serif" fontSize="14" fill="currentColor">
      IBRD • IDA
    </text>
  </svg>
)

export const UnescoLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 200 60" fill="currentColor" {...props}>
    <path d="M10 10h30v40h-30z" className="text-blue-500" fill="currentColor" opacity="0.2" />
    <text x="50" y="40" fontFamily="sans-serif" fontWeight="bold" fontSize="32" fill="currentColor">
      UNESCO
    </text>
  </svg>
)

export const USAIDLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 200 60" fill="currentColor" {...props}>
    <circle cx="20" cy="30" r="15" className="text-blue-800" fill="currentColor" opacity="0.2" />
    <text x="50" y="40" fontFamily="sans-serif" fontWeight="bold" fontSize="32" fill="currentColor">
      USAID
    </text>
  </svg>
)

export const AfricanUnionLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 200 60" fill="currentColor" {...props}>
    <path
      d="M20 10c11 0 20 9 20 20s-9 20-20 20-20-9-20-20 9-20 20-20z"
      className="text-green-600"
      fill="currentColor"
      opacity="0.2"
    />
    <text x="50" y="30" fontFamily="sans-serif" fontWeight="bold" fontSize="16" fill="currentColor">
      UNION
    </text>
    <text x="50" y="48" fontFamily="sans-serif" fontWeight="bold" fontSize="16" fill="currentColor">
      AFRICAINE
    </text>
  </svg>
)
