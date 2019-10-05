import React from 'react'
import utils from './utils'

const LessonsList = ({ lessons, selectedId, onClick }) => (
  <div>
    {lessons.map(lesson =>(
      <div key={lesson.id}>
        <div
          onClick={() => { onClick(lesson.id) }}
          className={lesson.id === selectedId ? 'selected' : ''}
        >
          {utils.zenkaku(lesson.period)}限：{lesson.subject}
        </div>
      </div>
    ))}
  </div>
)

export default LessonsList
