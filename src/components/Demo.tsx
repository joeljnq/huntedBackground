import transformedDemo from '../assets/images/transformedDemo.webp'
import originalDemo from '../assets/images/originalDemo.webp'
import { ComparisonSlider } from "./ComparisonSlider";
export const Demo = () => {
    return(
        <div className='container bg-gradient-to-b max-w-full from-black to-gray-900/90 min-h-screen '> 

        <ComparisonSlider bottomImage={{src:originalDemo, alt:'original'}} topImage={{src:transformedDemo,alt:'transformed'}} />
        </div>
    )
} 