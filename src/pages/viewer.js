import React, { Component } from 'react';
// import localforage from 'localforage'

class Viewer extends Component {
	constructor(props) {
		super(props)

		this.state = {
			// todoData: [],
			// niceData: [],
			displayTodo: 'Nothing to do at the moment! Find something relaxing.',
			displayNice: 'You\'re on the right path to building healthy habits',
			// displayData: {
			// 	todo: { title: `Enjoy yourself`, priority: '0', date: '', index: -1 },
			// 	nice: { message: `You're on the right path to building healthy habits`, index: -1 },
			// }
		}

		this.todoData = this.props.todoData;
		this.niceData = this.props.niceData;
	}

	// --------------------------------------------
	// Initialize Data
	// --------------------------------------------

	// // get database. if none exists, create it
	// initDb = async () => {
	// 	try {
	// 		this.todoData = await localforage.getItem(this.props.storageNames.todo);
	// 		this.niceData = await localforage.getItem(this.props.storageNames.nice);

	// 		if (this.todoData === null || this.todoData === typeof 'undefined') {
	// 			localforage.setItem(this.props.storageNames.todo, [])
	// 			this.todoData = []
	// 		}
	// 		if (this.niceData === null || this.niceData === typeof 'undefined') {
	// 			localforage.setItem(this.props.storageNames.nice, [])
	// 			this.niceData = []
	// 		}
	// 		// if output is blank, they are empty arrays
	// 		// console.log(this.todoData)
	// 		// console.log(this.niceData)
	// 	} catch (err) {
	// 		console.log(err);
	// 	}

	// }

	// initDataLoad = () => {
	// 	// let todoLoadSuccess = false;
	// 	// let niceLoadSuccess = false;

	// 	localforage.getItem(this.props.storageNames.todo).then((data) => {
	// 		this.props.setTodoData(data)
	// 		this.pickRandomTodo()
	// 		// todoLoadSuccess = true;
	// 		// todoLoadSuccess && niceLoadSuccess && displayData(pickRandomData())
	// 	}).catch(function (err) {
	// 		console.log(err);
	// 	});

	// 	localforage.getItem(this.props.storageNames.nice).then((data) => {
	// 		this.props.setNiceData(data)
	// 		this.pickRandomNice()
	// 		// niceLoadSuccess = true;
	// 		// todoLoadSuccess && niceLoadSuccess && displayData(pickRandomData())
	// 	}).catch(function (err) {
	// 		console.log(err);
	// 	});
	// }

	// --------------------------------------------
	// Controllers
	// --------------------------------------------

	// displayData = (data) => {
	// 	this.setState({ displayTodo: data.todo })
	// 	this.setState({ displayNice: data.nice })
	// }

	updateTodo = (todo) => {
		this.setState({ displayTodo: todo })
	}

	updateNice = (nice) => {
		this.setState({ displayNice: nice })
	}

	pickRandomTodo = () => {
		let todo;
		// let todoExists = false;

		// if there is real data...
		if (this.todoData.length > 0) {
			// todoExists = true;
			todo = this.getRandomItemInArray(this.todoData)
			this.setState({ displayTodo: todo })
			return true;
		}

		// if there is no real data, keep what's on screen
		// display warning of no data
		console.log('no todos in memory')
		// if (!todoExists) {
		// }
	}

	pickRandomNice = () => {
		let nice;
		// let niceExists = false;

		// if there is real data...
		if (this.niceData.length > 0) {
			// niceExists = true;
			nice = this.getRandomItemInArray(this.niceData)
			this.setState({ displayNice: nice })
			return true;
		}

		// if there is no real data, keep what's on screen
		// display warning of no data
		console.log('no affirmations in memory')
		// if (!niceExists) {
		// }
	}

	// --------------------------------------------
	// Handlers
	// --------------------------------------------


	// --------------------------------------------
	// Utilities
	// --------------------------------------------

	getRandomItemInArray = (arr) => {
		const i = Math.floor(Math.random() * arr.length)
		return arr[i]

		// const i = Math.floor(Math.random() * arr.length)
		// 	if (i === this.currentData.todo.index) {
		// 		return this.getRandomItemInArray(arr)
		// 	}
		// 	if (i === this.currentData.nice.index) {
		// 		return this.getRandomItemInArray(arr, 'nice')
		// 	}
		// return {
		// 	item: arr[i],
		// 	index: i
		// };
	}

	// ------------------------------------------------------

	componentDidMount() {
		// this.initDataLoad()
		this.pickRandomNice()
		this.pickRandomTodo()
	}

	render() {
		return (
			<div>
				<div className='p-4 bg-gray-100 rounded'>
					<h2>Task</h2>
					<p className='text-lg'>{this.state.displayTodo}</p>
				</div>
				<hr className="my-2"></hr>
				<div className='p-4 bg-gray-100 rounded'>
					<h2>Affirmation</h2>
					<p className='text-lg'>{this.state.displayNice}!</p>
				</div>
			</div>
		)
	}
}

export default Viewer;

