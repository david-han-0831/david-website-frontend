import type { DetailedHTMLProps, HTMLAttributes } from 'react'

type ModelViewerAttributes = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
    src?: string
    alt?: string
    ar?: boolean
    'ar-modes'?: string
    'ar-scale'?: string
    'camera-controls'?: boolean
    'auto-rotate'?: boolean
    'shadow-intensity'?: string
    'camera-orbit'?: string
    'interaction-prompt'?: string
    exposure?: string
}

declare module 'react' {
    namespace JSX {
        interface IntrinsicElements {
            'model-viewer': ModelViewerAttributes
        }
    }
}
