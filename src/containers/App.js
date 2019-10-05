import React from 'react'
import { LessonForm, LessonsList } from '../components'
import { nextId, INITIAL_ID, WEEK_DAYS } from '../utils'
import '../css/list.css'

const initialForm = {
  id: 0, // 有効なidの値はINITIAL_ID以上
  subject: "",
  period: 0, // 1: １限, 2: ２限, ･･･ 5: ５限
  dayOfWeek: -1, // 0: "月曜日", 1: "火曜日" ･･･ 4: "金曜日"
}

class App extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      lessons: [],
      form: { ...initialForm }
    }
  }

  handleSave = () => {
    const { lessons, form } = this.state
    if (!form.subject) return

    const nextLessons = form.id >= INITIAL_ID
      ? lessons.map(e => e.id === form.id ? { ...form } : e)
      : [ ...lessons, { ...form, id: nextId() } ]

    this.setState( { lessons: nextLessons, form: { ...initialForm } })
  }

  handleChange = event => {
    const { name, value } = event.target
    const form = {
      ...this.state.form,
      [name]: ['dayOfWeek', 'period'].includes(name) ? +value : value
    }
    this.setState({ form })
  }

  handleSelect = itemId => {
    const { lessons, form } = this.state
    if (form.id === itemId) {
      this.setState({ form: { ...initialForm } })
    } else {
      const lesson = lessons.find(e => e.id === itemId)
      if (lesson) {
        this.setState({ form: { ...lesson } })
      }
    }
  }

  handleDelete = () => {
    // TODO: 後で作成
  }

  render () {
    const { lessons, form } = this.state

    return (
      <div>
        <h1>時間割</h1>
        <LessonForm
          {...form}
          handleChange={this.handleChange}
          handleSave={this.handleSave}
          handleDelete={this.handleDelete}
        />
        <div className="p-list">
          {WEEK_DAYS.map((day, index) =>(
            <div className="list" key={day}>
              <p>{day}曜日</p>
              <div>
                <LessonsList
                  onItemSelect={this.handleSelect}
                  selectedId={form.id}
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
      </div>
    );
  }
}

export default App
