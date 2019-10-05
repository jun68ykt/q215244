import React from 'react'
import Loop from './Loop'
import './list.css'

const WEEK_DAYS = [ "月", "火", "水", "木", "金" ]

const INITIAL_ID = 9000
const nextId = ((id) => (() => id ++))(INITIAL_ID)

class App extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      lessons: [],
      subject: "",
      period: "",
      dayOfWeek: -1,  // 0: "月曜日", 1: "火曜日" ･･･ 4: "金曜日"
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
            onChange={this.handleChangeDayOfWeek}
          >
            <option value={-1}>---</option>
            {WEEK_DAYS.map((day, index) =>
                <option key={day} value={index}>{day}曜日</option>
              )}
          </select>

          <select
            value={period}
            onChange={this.handleChangeOrders}>
            <option value="">---</option>
            <option value="１限:">１限</option>
            <option value="２限:">２限</option>
            <option value="３限:">３限</option>
            <option value="４限:">４限</option>
            <option value="５限:">５限</option>
          </select>
          <div>
            <input
              onChange={this.handleChange}
              type="text"
              value={subject}
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
                <Loop
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
      this.setState({ selectedId: -1, dayOfWeek: -1, period: "", subject: "" })
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
    this.setState({subject:event.target.value})
  }

  handleChangeDayOfWeek = (event) => {
    this.setState({ dayOfWeek: +event.target.value })
  }

  handleChangeOrders = (event) => {
    this.setState({period:event.target.value})
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

    this.setState( { lessons: nextLessons, subject: "", dayOfWeek: -1, period: "", selectedId: -1 })
  }
}

export default App
