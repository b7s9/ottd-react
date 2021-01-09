import React, { Component } from 'react';
import localforage from 'localforage';

class Form extends Component {
	constructor(props) {
		super(props)

		this.state = {
			todoMsg: '',
			niceMsg: '',
			statusMessage: '',
			statusDanger: false
		}

		this.todoData = this.props.todoData;
		this.niceData = this.props.niceData;
	}

	// writeData = () => {
	// 	return new Promise((resolve, reject) => {
	// 		let todoWriteSuccess = false;
	// 		let niceWriteSuccess = false;

	// 		let nice = this.state.niceMsg
	// 		let todo = this.state.todoMsg

	// 		this.props.pushTodoData(todo)

	// 		localforage.setItem(this.props.storageNames.todo, this.todoData).then((todoData) => {				
	// 			todoWriteSuccess = true;
	// 			niceWriteSuccess && todoWriteSuccess && resolve('Saved!')
	// 		}).catch(function (err) {
	// 			// This code runs if there were any errors
	// 			reject(err)
	// 		});

	// 		this.props.pushNiceData(nice)

	// 		localforage.setItem(this.props.storageNames.nice, this.niceData).then((niceData) => {
	// 			niceWriteSuccess = true;
	// 			niceWriteSuccess && todoWriteSuccess && resolve('Saved!')
	// 		}).catch(function (err) {
	// 			// This code runs if there were any errors
	// 			reject(err)
	// 		});
	// 	})
	// }

	writeNiceData = () => {
		return new Promise((resolve, reject) => {
			console.log(this.state.niceMsg)
			this.props.pushNiceData(this.state.niceMsg)

			localforage.setItem(this.props.storageNames.nice, this.niceData).then((niceData) => {
				resolve('Saved affirmation')
			}).catch(function (err) {
				// This code runs if there were any errors
				reject(err)
			});
		})
	}

	writeTodoData = () => {
		return new Promise((resolve, reject) => {
			let todo = this.state.todoMsg
			console.log(todo)


			this.props.pushTodoData(todo)

			localforage.setItem(this.props.storageNames.todo, this.todoData).then((todoData) => {
				resolve('Saved task')
			}).catch(function (err) {
				// This code runs if there were any errors
				reject(err)
			});
		})
	}


	// --------------------------------------------
	// Handlers
	// --------------------------------------------

	handleTodoChange = (e) => {
		this.setState({ todoMsg: e.target.value })
	}
	handleNiceChange = (e) => {
		this.setState({ niceMsg: e.target.value })
	}

	resetForm = () => {
		this.setState({ niceMsg: '' })
		this.setState({ todoMsg: '' })
	}

	handleSubmit = (e) => {
		this.writeNiceData().then(this.writeTodoData()).then(message => {

			this.resetForm()

			this.setState({ statusMessage: message })

			setTimeout(() => {
				this.setState({ statusMessage: '' })
			}, 6000);
		}).catch(message => {
			console.log(message)
			this.setState({ statusMessage: message })
			// statusBox.hidden = false
		})
	}


	render() {
		return (
			<div>
				<h2>Add </h2>
				<div className="formcontrol">
					<label htmlFor="todo-title">What do you need to do?</label>
					<br />
					<textarea
						className='bg-gray-100'
						name="todo-title"
						id="todo-title"
						rows="3"
						autoComplete="off"
						minLength="1"
						required
						value={this.state.todoMsg}
						onChange={this.handleTodoChange}
					></textarea>
				</div>
				<p>Insert prompt list here</p>
				<button>Refresh prompt</button>
				<div className="formcontrol">
					<label htmlFor="nice-comment">Say something nice to yourself, first!</label><br />
					<textarea
						className='bg-gray-100'
						name="nice-comment"
						id="nice-comment"
						rows="3"
						autoComplete="off"
						minLength="1"
						required
						value={this.state.niceMsg}
						onChange={this.handleNiceChange}
					></textarea>
				</div>
				<button
					className='my-4 px-4 py-2 rounded shadow text-white bg-green-600 hover:bg-green-700'
					onClick={this.handleSubmit}
				>
					Submit
				</button>
				<span
					className={'my-4' + this.state.statusDanger ? 'text-red' : 'text-green'}
					id="status-message"
					role="status"
				>
					{this.state.statusMessage}
				</span>

			</div>
		)
	}
}

export default Form;

