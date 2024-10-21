import transformedDemo from '../assets/images/transformedDemo.webp'
import originalDemo from '../assets/images/originalDemo.webp'
import { ComparisonSlider } from "./ComparisonSlider";
export const Demo = () => {
    return(
        <ComparisonSlider bottomImage={{src:originalDemo, alt:'original'}} topImage={{src:transformedDemo,alt:'transformed'}} />
    )
} 