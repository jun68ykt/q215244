import React from 'react'
import { zenkaku } from '../utils'

const LessonsList = ({ lessons, selectedId, onSelect }) => (
  <div>
    {lessons.map(lesson => (
      <div key={lesson.id}>
        <div
          onClick={() => { onSelect(lesson) }}
          className={lesson.id === selectedId ? 'selected' : ''}
        >
          {zenkaku(lesson.period)}限：{lesson.subject}
        </div>
      </div>
    ))}
  </div>
)

export default LessonsList
