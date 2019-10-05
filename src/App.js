import React from 'react'
import LessonsList from './LessonsList'
import utils from './utils'
import './list.css'

const WEEK_DAYS = [ "月", "火", "水", "木", "金" ]
const MAX_PERIOD = 5
const INITIAL_ID = 9000
const nextId = ((id) => (() => id ++))(INITIAL_ID)

class App extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      lessons: [],
      subject: "",
      period: 0, // 1: １限, 2: ２限, ･･･ 5: ５限
      dayOfWeek: -1, // 0: "月曜日", 1: "火曜日" ･･･ 4: "金曜日"
      selectedId: -1
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleChangeEditing = this.handleChangeEditing.bind(this)
  }

  render () {
    const { dayOfWeek, period, subject, selectedId, lessons } = this.state
    return (
      <div>
        <h1>時間割</h1>
        <form>
          <select
            name="dayOfWeek"
            value={dayOfWeek}
            onChange={this.handleChange}
          >
            <option value={-1}>---</option>
            {WEEK_DAYS.map((day, index) =>
                <option key={day} value={index}>{day}曜日</option>
              )}
          </select>

          <select
            name="period"
            value={period}
            onChange={this.handleChange}
          >
            <option value={0}>---</option>
            {[...Array(MAX_PERIOD)].map((_, index) =>
              <option key={index} value={index+1}>{utils.zenkaku(index+1)}限</option>
              )}
          </select>
          <div>
            <input
              type="text"
              name="subject"
              value={subject}
              onChange={this.handleChange}
            />

            <button onClick={this.handleSubmit}>保存</button>
            <button onClick={this.handleDelete}>削除</button>
          </div>
        </form>
        <div className="p-list">
          {WEEK_DAYS.map((day, index) =>(
            <div className="list" key={day}>
              <p>{day}曜日</p>
              <div>
                <LessonsList
                  onClick={this.handleChangeEditing}
                  selectedId={selectedId}
                  lessons={lessons.filter(item => item.dayOfWeek === index)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  handleChangeEditing (itemId) {
    const { lessons, selectedId } = this.state
    if (selectedId === itemId) {
      this.setState({ selectedId: -1, dayOfWeek: -1, period: 0, subject: "" })
    } else {
      const { dayOfWeek, period, subject } = lessons.find(e => e.id === itemId)
      this.setState({ selectedId: itemId, dayOfWeek, period, subject })
    }
  }

  handleDelete () {
    this.setState({
      subject: this.state.subject,
      period: this.state.period,
      dayOfWeek: this.state.dayOfWeek})
  }

  handleChange = (event) => {
    const { name, value } = event.target
    this.setState({
      [name]: ['dayOfWeek', 'period'].includes(name) ? +value : value
    })
  }

  handleSubmit (e) {
    e.preventDefault()
    const { lessons, subject, period, dayOfWeek, selectedId } = this.state
    if (!subject) return

    let nextLessons;
    if (selectedId >= INITIAL_ID) {
      nextLessons = lessons.map(e =>
        e.id === selectedId ? { id: e.id, subject, period, dayOfWeek } : e
      )
    } else {
      nextLessons = [ ...lessons, { id: nextId(), subject, period, dayOfWeek } ]
    }

    this.setState( { lessons: nextLessons, subject: "", dayOfWeek: -1, period: 0, selectedId: -1 })
  }
}

export default App
