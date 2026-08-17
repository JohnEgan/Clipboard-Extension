import { useState } from 'react'

function CategoryBlock({ category, segments, onAdd, onRemove, onCopy }){
    
    const [label, setLabel] = useState('');
    const [value, setValue] = useState('');

    function handleAdd(){
        onAdd(category, label, value);
        setLabel('');
        setValue('');
    }

    return(
        <li>
        <div className='category-header'>{category}</div>
        <ul>
            
            {segments.map(seg => (
            <li 
                key={seg.id} 
                className="segment" 
                onClick={() => {
                navigator.clipboard.writeText(seg.value)
                onCopy()
                setTimeout(() => window.close(), 500)
              }}>
                <span className="label">{seg.label}</span>
                <span className="preview">{seg.value}</span>
                <button onClick={(e) => { e.stopPropagation(); onRemove(seg.id) }}>Delete</button>
            </li>
            
            ))}
            
        </ul>
        <input value={label} onChange={e => setLabel(e.target.value)} placeholder="Label" />
        <textarea value={value} onChange={e => setValue(e.target.value)} placeholder="Paste Text Here" />
        <button onClick={handleAdd}>Add To List</button>
        </li>
    )
}

export default CategoryBlock;