import { useState, useEffect } from 'react'
import './App.css'

/*
Swap the hardcoded array for state. Change SEGMENTS from a const to a useState, starting empty: const [segments, setSegments] = useState([]).
Load on mount. Write a useEffect that reads chrome.storage.local.get('segments') and calls setSegments with what comes back. Handle the empty first-run case.

~~~
To add an item immutably: setSegments([...segments, newSegment]) — spread the old array, tack the new one on. React won't re-render if you .push() the existing array; it needs a new array reference.
Give each new segment an id: crypto.randomUUID().
Controlled input: <input value={label} onChange={e => setLabel(e.target.value)} /> with const [label, setLabel] = useState('') behind it.
No <form> tags — just a button with onClick. (Forms cause a page reload that breaks things in a popup.)
*/

// Hardcoded for Part 1. Real editable segments come in Part 2.
/*
const SEGMENTS = [
  { id: '1', label: 'Email',      value: 'john@example.com' },
  { id: '2', label: 'Phone',      value: '555-123-4567' },
  { id: '3', label: 'GitHub URL', value: 'https://github.com/yourname' },
  { id: '4', label: 'LinkedIn',   value: 'https://linkedin.com/in/yourname' },
]
*/


function App() {

  console.log('storage exists?', chrome.storage)
  chrome.storage.local.get('segments').then(r => console.log('READ:', r))

   const [segments, setSegments] = useState([])
  const [userInputLabel, setUserInputLabel] = useState('')
  const [userInputValue, setUserInputValue] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [copied, setCopied] = useState(false)

  function addUserTextInputToList() {
      if(!userInputLabel || !userInputValue){
        return;
      }

      const newSegment = {id: crypto.randomUUID(), label: userInputLabel, value: userInputValue}

      setSegments([...segments, newSegment])
      setUserInputLabel('');
      setUserInputValue('')

  }

  useEffect(() => {
    chrome.storage.local.get('segments').then(result => {
      if(result.segments){
        setSegments(result.segments)
      }
    })
  }, [])

  useEffect(() => {
    chrome.storage.local.set({segments})
  }, [segments])

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

  return (
    <div className="deck">
      <h1>Copy Extension Thing</h1>
      {copied && <div className="copied">Copied!</div>}
      <ul className="segment-list">
        {segments.map((seg, i) => (
          <li
            key={seg.id}
            className={i === selectedIndex ? 'segment selected' : 'segment'}
            onClick={() => setSelectedIndex(i)}
          >
            <span className="label">{seg.label}</span>
            <span className="preview">{seg.value}</span>
          </li>
        ))}
      </ul>
      <div>
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
    </div>
  )
}

export default App