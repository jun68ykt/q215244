import React from 'react'
import { zenkaku, WEEK_DAYS, MAX_PERIOD } from '../utils'

const LessonForm = ({
  dayOfWeek,
  period,
  subject,
  handleChange,
  handleSave,
  handleDelete
}) => (
  <div>
    <select
      name="dayOfWeek"
      value={dayOfWeek}
      onChange={handleChange}
    >
      <option value={-1}>---</option>
      {WEEK_DAYS.map((day, index) =>
        <option key={day} value={index}>{day}曜日</option>
      )}
    </select>
    <select
      name="period"
      value={period}
      onChange={handleChange}
    >
      <option value={0}>---</option>
      {[...Array(MAX_PERIOD)].map((_, index) =>
        <option key={index} value={index+1}>{zenkaku(index+1)}限</option>
      )}
    </select>
    <div>
      <input
        type="text"
        name="subject"
        value={subject}
        onChange={handleChange}
      />
      <button type="button" onClick={handleSave}>保存</button>
      <button type="button" onClick={handleDelete}>削除</button>
    </div>
  </div>
)

export default LessonForm
