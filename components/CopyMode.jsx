import { useState, useEffect } from 'react'
import CategoryBlock from './CategoryBlock'

function CopyMode({categories, segments}) {

    const [catIndex, setCatIndex] = useState(0);
    const [segIndex, setSegIndex] = useState(0)

    useEffect(() => {
        function handleKey(e){
            if(e.key === 's') {
                e.preventDefault()
                //go through this later 
                setSelected(i => (i + 1) % items.length)
            } else if(e.key === 'w') {
                e.preventDefault()
                setSelected(i => (i - 1 + items.length) % items.length)
            }
        }
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey)
    }, [])

    return(
        <div>
            <h1>copy mode</h1>
            {
                categories.map(cat => (
                    <h1>{cat}</h1>
                ))
            }
        </div>
    )
}

export default CopyMode