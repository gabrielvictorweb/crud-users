import { OrbitProgress } from 'react-loading-indicators'

export const Loading = () => (
    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
        <OrbitProgress color="#0077B5" size="medium" text="" textColor="" />
    </div>
)
