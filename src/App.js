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
      lists: [],
      input: "",
      value: "",
      days: "",
      selectedId: -1
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleChangeEditing = this.handleChangeEditing.bind(this)
  }

  render () {
    const { days, value, input, selectedId, lists } = this.state
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
              value={input}
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
                  lists={lists.filter(item => item.days === l)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  handleChangeEditing (itemId) {
    const { lists, selectedId } = this.state
    if (selectedId === itemId) {
      this.setState({ selectedId: -1, days: "", value: "", input: "" })
    } else {
      const { days, value, input } = lists.find(e => e.id === itemId)
      this.setState({ selectedId: itemId, days, value, input })
    }
  }

  handleDelete () {
    this.setState({
      input: this.state.input,
      value: this.state.value,
      days: this.state.days})
  }

  handleChange = (event) => {
    this.setState({input:event.target.value})
  }

  handleChangeDays = (event) => {
    this.setState({days:event.target.value})
  }

  handleChangeOrders = (event) => {
    this.setState({value:event.target.value})
  }

  handleSubmit (e) {
    e.preventDefault()
    const { lists, input, value, days, selectedId } = this.state
    if (!input) return

    let nextLists;
    if (selectedId >= INITIAL_ID) {
      nextLists = lists.map(e =>
        e.id === selectedId ? { id: e.id, input, value, days } : e
      )
    } else {
      nextLists = [ ...lists, { id: nextId(), input, value, days } ]
    }

    this.setState( { lists: nextLists, input: "", days: "", value: "", selectedId: -1 })
  }
}

export default App
