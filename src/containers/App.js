import React from 'react'
import { Container, LessonForm, LessonsByDaysOfWeek, Title } from '../components'
import { nextId, INITIAL_ID } from '../utils'
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

  handleSelect = lesson => {
    this.setState(
      { form: { ...(this.state.form.id === lesson.id ? initialForm : lesson) } }
    )
  }

  handleDelete = () => {
    // TODO: 後で作成
  }

  render () {
    return (
      <Container>
        <Title text="時間割" />
        <LessonForm
          {...this.state.form}
          handleChange={this.handleChange}
          handleSave={this.handleSave}
          handleDelete={this.handleDelete}
        />
        <LessonsByDaysOfWeek
          lessons={this.state.lessons}
          selectedId={this.state.form.id}
          handleSelect={this.handleSelect}
        />
      </Container>
    );
  }
}

export default App
