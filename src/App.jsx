import { useState, useEffect } from 'react'
import './App.css'

//test

// Hardcoded for Part 1. Real editable segments come in Part 2.
const SEGMENTS = [
  { id: '1', label: 'Email',      value: 'john@example.com' },
  { id: '2', label: 'Phone',      value: '555-123-4567' },
  { id: '3', label: 'GitHub URL', value: 'https://github.com/yourname' },
  { id: '4', label: 'LinkedIn',   value: 'https://linkedin.com/in/yourname' },
]

function App() {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex(i => (i + 1) % SEGMENTS.length)
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex(i => (i - 1 + SEGMENTS.length) % SEGMENTS.length)
      } else if (e.key === 'Enter') {
        e.preventDefault()
        const segment = SEGMENTS[selectedIndex]
        navigator.clipboard.writeText(segment.value)
        setCopied(true)
        setTimeout(() => window.close(), 500)
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [selectedIndex])

  return (
    <div className="deck">
      <h1>Snippet Deck</h1>
      {copied && <div className="copied">Copied!</div>}
      <ul className="segment-list">
        {SEGMENTS.map((seg, i) => (
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
      <div className="hint">↑↓ to move · Enter to copy</div>
    </div>
  )
}

export default App