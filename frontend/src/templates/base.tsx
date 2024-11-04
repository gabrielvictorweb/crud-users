import type React from 'react'

type Props = {
    children: React.ReactNode
    background?: string
}

export const BaseTemplate: React.FC<Props> = ({
    children,
    background = 'bg-man-with-phone',
}) => (
    <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="flex w-full p-4 min-h-[100vh] flex-1 flex-col justify-center">
            {children}
        </div>

        <div
            className={`hidden md:block min-h-[100vh] h-[100%] md:flex-1 ${background} bg-cover`}
        />
    </div>
)
