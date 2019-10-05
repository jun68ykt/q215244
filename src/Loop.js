import React from 'react'

const Loop = ({ lessons, selectedId, onClick }) => (
  <div>
    {lessons.map((l) =>(
      <div key={l.id}>
        <div
          onClick={() => { onClick(l.id) }}
          className={l.id === selectedId ? 'selected' : ''}
        >
          {l.period}{l.subject}
        </div>
      </div>
    ))}
  </div>
)

export default Loop
