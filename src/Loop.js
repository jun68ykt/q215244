import React from 'react'
import utils from './utils'

const Loop = ({ lessons, selectedId, onClick }) => (
  <div>
    {lessons.map((l) =>(
      <div key={l.id}>
        <div
          onClick={() => { onClick(l.id) }}
          className={l.id === selectedId ? 'selected' : ''}
        >
          {utils.zenkaku(l.period)}限：{l.subject}
        </div>
      </div>
    ))}
  </div>
)

export default Loop
