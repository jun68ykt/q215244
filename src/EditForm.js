import React from 'react';

class EditForm extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      text: props.text
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeDays = this.handleChangeDays.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleChangeEditing = this.handleChangeEditing.bind(this);
  }
  render(){
    return (
      <div>
        <input
          onChange={this.handleChange}
          type="text"
          value={this.state.text}
        />

        <button onClick={this.handleSubmit}>保存</button>
        <button onClick={this.handleDelete}>削除</button>
      </div>
    );
  }

  handleDelete () {
    this.setState({
      input: this.state.input,
      value: this.state.value,
      days: this.state.days})
  }

  handleChange = (event) => {
    this.setState({text:event.target.value})
  }
  handleChangeDays = (event) => {
    this.setState({days:event.target.value})
  }
  handleChangeOrders = (event) => {
    this.setState({value:event.target.value})
  }

  handleSubmit (e) {
    e.preventDefault();
    if (!this.state.text) return;
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
export default EditForm;
