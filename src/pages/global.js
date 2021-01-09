import React, { Component } from 'react';
import Viewer from './viewer'
import Form from './form'
import localforage from 'localforage'

class Global extends Component {
	constructor(props) {
		super(props)

		this.state = {
			displayViewer: true,
			displayForm: false,
			niceData: [],
			todoData: []
		}

		this.storageNames = {
			todo: 'todoData',
			nice: 'niceData'
		}

		this.pushNiceData = this.pushNiceData.bind(this);
		this.pushTodoData = this.pushTodoData.bind(this);
	}

	// --------------------------------------------
	// Initialize Data
	// --------------------------------------------

	// get database. if none exists, create it
	initDb = async () => {
		try {
			this.todoData = await localforage.getItem(this.storageNames.todo);
			this.niceData = await localforage.getItem(this.storageNames.nice);

			if (this.todoData === null || this.todoData === typeof 'undefined') {
				localforage.setItem(this.storageNames.todo, [])
				this.todoData = []
			}
			if (this.niceData === null || this.niceData === typeof 'undefined') {
				localforage.setItem(this.storageNames.nice, [])
				this.niceData = []
			}
			// if output is blank, they are empty arrays
			// console.log(this.todoData)
			// console.log(this.niceData)
		} catch (err) {
			console.log(err);
		}
	}

	initDataLoad = () => {
		// let todoLoadSuccess = false;
		// let niceLoadSuccess = false;

		localforage.getItem(this.storageNames.todo).then((data) => {
			this.setTodoData(data)
			// this.pickRandomTodo()
		}).catch(function (err) {
			console.log(err);
		});

		localforage.getItem(this.storageNames.nice).then((data) => {
			this.setNiceData(data)
			// this.pickRandomNice()
		}).catch(function (err) {
			console.log(err);
		});
	}

	init = () => {
		this.initDb()
	}

	// --------------------------------------------
	// Handle Data Update
	// --------------------------------------------

	setNiceData = (data) => {
		this.setState({ niceData: data })
	}
	setTodoData = (data) => {
		this.setState({ todoData: data })
	}

	pushNiceData = (data) => {
		this.setState({ niceData: [...this.state.niceData, data] })
		console.log(this.state.niceData)
		console.log(data)
	}
	pushTodoData = (data) => {
		this.setState({ todoData: [...this.state.todoData, data] })
		console.log(this.state.todoData)
		console.log(data)
	}

	// --------------------------------------------
	// Page Navigation
	// --------------------------------------------

	showViewer = () => {
		this.setState({ displayForm: false })
		this.setState({ displayViewer: true })
	}
	showForm = () => {
		this.setState({ displayViewer: false })
		this.setState({ displayForm: true })
	}

	// --------------------------------------------
	// Render Functions
	// --------------------------------------------

	componentDidMount() {
		this.init()
	}

	render() {
		let page;
		if (this.state.displayViewer) {
			page = <Viewer
				storageNames={this.storageNames}
				niceData={this.state.niceData}
				todoData={this.state.todoData}
			></Viewer>
		} else {
			page = <Form
				storageNames={this.storageNames}
				niceData={this.state.niceData}
				todoData={this.state.todoData}
				pushTodoData={this.setTodoData}
				pushNiceData={this.pushNiceData}
			></Form>
		}

		return (
			<div>
				<nav className='mb-4'>
					<button className='mr-2 px-4 py-2 rounded shadow text-white bg-green-600 hover:bg-green-700' onClick={this.showViewer}>Show List</button>
					<button className='mr-2 px-4 py-2 rounded shadow text-white bg-green-600 hover:bg-green-700' onClick={this.showForm}>Add to List</button>
				</nav>
				{page}
			</div>
		)
	}
}

export default Global;

