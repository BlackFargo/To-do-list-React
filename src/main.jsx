import { React, useEffect, useState } from 'react'
import * as ReactDOMClient from 'react-dom/client'
import 'reset-css'
import './variables.scss'
import './index.scss'

import ToDoForm from './Components/ToDoForm/ToDoForm'
import ToDo from './Components/ToDo/ToDo'

export default function Main() {
	const [task, setTask] = useState('')
	const [tasks, setTasks] = useState([])
	const [edit, setEdit] = useState(null)

	const moveUp = index => {
		if (index !== 0) {
			setTasks(prev => {
				const updatedTasks = [...prev]

				;[updatedTasks[index], updatedTasks[index - 1]] = [
					updatedTasks[index - 1],
					updatedTasks[index],
				]
				return updatedTasks
			})
		}
	}

	const moveDown = index => {
		if (index !== tasks.length - 1) {
			setTasks(prev => {
				const updatedTasks = [...prev]

				;[updatedTasks[index], updatedTasks[index + 1]] = [
					updatedTasks[index + 1],
					updatedTasks[index],
				]
				return updatedTasks
			})
		}
	}

	useEffect(() => {
		const savedItems = localStorage.getItem('tasks')
		setTasks(JSON.parse(savedItems))
	}, [])

	useEffect(() => {
		const itemsToSave = tasks
		localStorage.setItem('tasks', JSON.stringify(itemsToSave))
	}, [tasks])

	const editTask = (id, text) => {
		setEdit({ id, text })
	}

	const saveTask = () => {
		setTasks(prev =>
			prev.map(task =>
				task.id === edit.id ? { ...task, text: edit.text } : task
			)
		)
		setEdit(null)
	}

	const addTask = () => {
		if (task.length) {
			const newTask = {
				id: Date.now(),
				text: task,
				isDone: false
			}
			setTasks(prev => [...prev, newTask])

			setTask('')
		} else {
			return
		}


	}
 	const deleteTask = (id, index) => {
		setTasks(prev => prev.filter(task => task.id !== id))
	}

	const isDoneToggle = (id) => {
  setTasks(prev => 
    prev.map(task => 
      task.id === id ? {...task, isDone: !task.isDone} : task
    )
  );
}


	return (
		<div className='container'>
			<ToDoForm setTask={setTask} addTask={addTask} task={task} />
			<ToDo
				tasks={tasks}
				deleteTask={deleteTask}
				saveTask={saveTask}
				editTask={editTask}
				edit={edit}
				setEdit={setEdit}
				moveDown={moveDown}
				moveUp={moveUp}
				isDoneToggle={isDoneToggle}
			/>
		</div>
	)
}
const root = ReactDOMClient.createRoot(document.getElementById('root'))
root.render(<Main />)
