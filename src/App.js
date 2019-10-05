import React from 'react';
import Loop from './Loop';
import './list.css'
import EditForm from './EditForm'

const fixed= ["月曜日","火曜日","水曜日","木曜日","金曜日"]

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      lists:[],
      input:"",
      value:"",
      days:"",
      editing:false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeDays = this.handleChangeDays.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleChangeEditing = this.handleChangeEditing.bind(this);
  }

  render () {
    const {editing}=this.state
    return (
        <div>
          <h1>時間割</h1>
          <form>
            <select
                defaultValue="---"
                value={this.state.days}
                onChange={this.handleChangeDays}>
              <option>---</option>
              <option value="月曜日">月曜日</option>
              <option value="火曜日">火曜日</option>
              <option value="水曜日">水曜日</option>
              <option value="木曜日">木曜日</option>
              <option value="金曜日">金曜日</option>
            </select>

            <select
                defaultValue="---"
                value={this.state.value}
                onChange={this.handleChangeOrders}>
              <option>---</option>
              <option value="１限:">１限</option>
              <option value="２限:">２限</option>
              <option value="３限:">３限</option>
              <option value="４限:">４限</option>
              <option value="５限:">５限</option>
            </select>

            {editing ? (
                <EditForm
                    text={this.state.input}/>
            ):(
                <div>
                  <input
                      onChange={this.handleChange}
                      type="text"
                      value={this.state.input}
                  />

                  <button onClick={this.handleSubmit}>保存</button>
                  <button onClick={this.handleDelete}>削除</button>
                </div>
            )}
          </form>


          <div className="p-list">
            {fixed.map((l) =>(
                <div className="list" key={l.toString()}>
                  <p>{l}</p>
                  <p>
                    <Loop
                        onClick={this.handleChangeEditing}
                        lists={this.state.lists.filter(item => item.days === l)}
                    />
                  </p>
                </div>
            ))}
          </div>

        </div>
    );
  }

  handleChangeEditing () {
    this.setState({
      editing: !this.state.editing
    })
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
    e.preventDefault();
    if (!this.state.input) return;
    this.setState(
        {
          lists: [
            ...this.state.lists,
            {
              input: this.state.input,
              value: this.state.value,
              days: this.state.days
            }],
          input:"",
          days:"",
          value:""
        });
  };

}

export default App;
