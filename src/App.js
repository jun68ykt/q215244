import React from 'react'
import Loop from './Loop'
import './list.css'

const fixed = ["月曜日", "火曜日", "水曜日", "木曜日", "金曜日"]

const INITIAL_ID = 9000
const nextId = ((id) => (() => id ++))(INITIAL_ID)

class App extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      lessons: [],
      subject: "",
      value: "",
      days: "",
      selectedId: -1
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleChangeEditing = this.handleChangeEditing.bind(this)
  }

  render () {
    const { days, value, subject, selectedId, lessons } = this.state
    return (
      <div>
        <h1>時間割</h1>
        <form>
          <select
            value={days}
            onChange={this.handleChangeDays}
          >
            <option value="">---</option>
            <option value="月曜日">月曜日</option>
            <option value="火曜日">火曜日</option>
            <option value="水曜日">水曜日</option>
            <option value="木曜日">木曜日</option>
            <option value="金曜日">金曜日</option>
          </select>

          <select
            value={value}
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
          {fixed.map((l) =>(
            <div className="list" key={l}>
              <p>{l}</p>
              <div>
                <Loop
                  onClick={this.handleChangeEditing}
                  selectedId={selectedId}
                  lessons={lessons.filter(item => item.days === l)}
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
      this.setState({ selectedId: -1, days: "", value: "", subject: "" })
    } else {
      const { days, value, subject } = lessons.find(e => e.id === itemId)
      this.setState({ selectedId: itemId, days, value, subject })
    }
  }

  handleDelete () {
    this.setState({
      subject: this.state.subject,
      value: this.state.value,
      days: this.state.days})
  }

  handleChange = (event) => {
    this.setState({subject:event.target.value})
  }

  handleChangeDays = (event) => {
    this.setState({days:event.target.value})
  }

  handleChangeOrders = (event) => {
    this.setState({value:event.target.value})
  }

  handleSubmit (e) {
    e.preventDefault()
    const { lessons, subject, value, days, selectedId } = this.state
    if (!subject) return

    let nextLessons;
    if (selectedId >= INITIAL_ID) {
      nextLessons = lessons.map(e =>
        e.id === selectedId ? { id: e.id, subject, value, days } : e
      )
    } else {
      nextLessons = [ ...lessons, { id: nextId(), subject, value, days } ]
    }

    this.setState( { lessons: nextLessons, subject: "", days: "", value: "", selectedId: -1 })
  }
}

export default App
