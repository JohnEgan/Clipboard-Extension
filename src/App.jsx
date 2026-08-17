import { useState, useEffect } from 'react'
import CategoryBlock from '../components/CategoryBlock'
import './App.css'

// Hardcoded nonsense 
/*
const SEGMENTS = [
  { id: '1', label: 'Email',      value: 'john@example.com' },
  { id: '2', label: 'Phone',      value: '555-123-4567' },
  { id: '3', label: 'GitHub URL', value: 'https://github.com/yourname' },
  { id: '4', label: 'LinkedIn',   value: 'https://linkedin.com/in/yourname' },
]
*/

function App() {

  const [displayState, setDisplayState] = useState("edit")

  const [segments, setSegments] = useState([])
  //const [userInputLabel, setUserInputLabel] = useState('')
  //const [userInputValue, setUserInputValue] = useState('')
  const [userInputCategory, setUserInputCategory] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [copied, setCopied] = useState(false)

  const [loaded, setLoaded] = useState(false);

 // const categoryNames = [...new Set(segments.map(s=>s.category))];

  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("");

  //takes in two values from the category now?
  function addUserTextInputToList(cat, label, value) {
      if(!label || !value){
        return;
      }

      const newSegment = {id: crypto.randomUUID(), label: label, value: value, category: cat}

      //TODO
      //this is a dunb way of saving these to fetch them to render
      //you cant easily traverse them 
      // use an array of objects for the category
      // {categoryName: "name", segmentArray: null}
      setSegments([...segments, newSegment])

  }

  function addCategoryToList(){
    if(!userInputCategory){
      return;
    }
    setCategories([...categories, userInputCategory])
  }

  function removeSegment(idToRemove){
    setSegments(prev => prev.filter(segment => segment.id !== idToRemove))
  }

  useEffect(() => {
    chrome.storage.local.get(['segments', 'categories']).then(result => {
      if(result.segments){
        setSegments(result.segments)
      }
      if(result.categories){
        setCategories(result.categories)
      }
      setLoaded(true)
    })
  }, [])

  useEffect(() => {
    if (!loaded) return
    chrome.storage.local.set({segments})
  }, [segments, loaded])

  useEffect(() => {
    if (!loaded) return
    chrome.storage.local.set({categories})
  }, [categories, loaded])

  /*
  TODO come back to this later 
  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex(i => (i + 1) % segments.length)
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex(i => (i - 1 + segments.length) % segments.length)
      } else if (e.key === 'Enter') {
        e.preventDefault()
        const segment = segments[selectedIndex]
        if (!segment) return
        navigator.clipboard.writeText(segment.value)
        setCopied(true)
        setTimeout(() => window.close(), 500)
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [selectedIndex, segments])
*/

  return (
    <div className="deck">
      {copied && <div className="copied">Copied!</div>}
      {
        categories.map(cat => (

          <CategoryBlock
            key = {cat}
            category = {cat}
            segments = {segments.filter(seg =>seg.category === cat)}
            onAdd={addUserTextInputToList}
            onRemove={removeSegment}
            onCopy={() => setCopied(true)}
          />

          
        ))
      }
      <div>
        <input
          value={userInputCategory}
          onChange={e => setUserInputCategory(e.target.value)}
          placeholder="Category"
        />
        <button onClick={addCategoryToList}>Add Category</button>
      </div>
    </div>
  )
}

export default App


/*

<h1>Copy Extension Thing</h1>
      {copied && <div className="copied">Copied!</div>}
      <ul className="segment-list">
        {categoryNames.map(cat => (
          <li key={cat}>
            <div className='category-header'>{cat}</div>
            <ul>
              {segments
              .filter(seg =>seg.category === cat)
              .map(seg => (
              <li 
                key={seg.id} 
                className="segment" 
                onClick={() => {
                navigator.clipboard.writeText(seg.value)
                setCopied(true)
                setTimeout(() => window.close(), 500)
              }}>
                <span className="label">{seg.label}</span>
                <span className="preview">{seg.value}</span>
                <button onClick={() => removeSegment(seg.id)}>Delete</button>
              </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      <div>
        <input
          value={userInputCategory}
          onChange={e => setUserInputCategory(e.target.value)}
          placeholder="Category"
        />
        <input
          value={userInputLabel}
          onChange={e => setUserInputLabel(e.target.value)}
          placeholder="Label"
        />
        <textarea
          value={userInputValue}
          onChange={e => setUserInputValue(e.target.value)}
          placeholder="Paste Text Here"
        />
        <button onClick={addUserTextInputToList}>Add To List</button>
      </div>
      <div className="hint">↑↓ to move · Enter to copy</div>

*/