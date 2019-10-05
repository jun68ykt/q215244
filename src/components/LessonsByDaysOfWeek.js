import React from 'react'
import LessonsList from './LessonsList'
import { WEEK_DAYS } from '../utils'

const LessonsByDaysOfWeek = ({ lessons, selectedId, handleSelect }) => (
  <div className="p-list">
    {WEEK_DAYS.map((day, index) =>(
      <div className="list" key={day}>
        <p>{day}曜日</p>
        <div>
          <LessonsList
            onSelect={handleSelect}
            selectedId={selectedId}
            lessons={
              lessons
                .filter(item => item.dayOfWeek === index)
                .sort((l1, l2) => l1.period - l2.period)
            }
          />
        </div>
      </div>
    ))}
  </div>
)

export default LessonsByDaysOfWeek
