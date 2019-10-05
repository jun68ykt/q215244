import React from 'react'

const Loop = ({ lists, selectedId, onClick }) => (
  <div>
    {lists.map((l) =>(
      <div key={l.id}>
        <div
          onClick={() => { onClick(l.id) }}
          className={l.id === selectedId ? 'selected' : ''}
        >
          {l.value}{l.input}
        </div>
      </div>
    ))}
  </div>
)

export default Loop
