import { useState, useEffect } from 'react'

function CopyMode({categories, segments}) {

    const [catIndex, setCatIndex] = useState(0);
    const [segIndex, setSegIndex] = useState(0)

    const currentCat = categories[catIndex];
    const currentSegs = segments.filter(seg => seg.category === currentCat);
    useEffect(() => {
        function handleKey(e){
            //TODO: s || arrowkey?
            if(e.key === 's') {
                e.preventDefault();
                //go through this later 
                setSegIndex(i => (i + 1) % currentSegs.length);
            } else if(e.key === 'w') {
                e.preventDefault();
                setSegIndex(i => (i - 1 + currentSegs.length) % currentSegs.length);
            //TODO: shit+tab for backwards?
            } else if(e.key === 'Tab'){
                e.preventDefault();
                setCatIndex(i => (i + 1) % categories.length);
                //currentCat = categories[catIndex]
                //currentSegs = segments.filter(seg => seg.category === currentCat);
                setSegIndex(0);
            }else if(e.key === 'Enter'){
                e.preventDefault();
                navigator.clipboard.writeText(currentSegs[segIndex].value)
            }
            
        }
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey)
    }, [catIndex, categories, segments, segIndex])

    return(
        <div>
            <h1>copy mode</h1>   
            <h1>{currentCat}</h1>
            <h1>{currentSegs[segIndex].value}</h1>
        </div>
    )
}

export default CopyMode

