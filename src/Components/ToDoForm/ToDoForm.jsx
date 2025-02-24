import React from 'react'
import s from './ToDoForm.module.scss'

export default function ToDoForm({ setTask, addTask, task }) {
	const formHandler = e => {
		e.preventDefault()
		addTask()
	}

	return (
		<div>
			<form onSubmit={formHandler} className={s.form}>
				<h1 className={s.title}>Set tasks</h1>
				<div className={s.actions}>
					<input
						className={s.input}
						placeholder='What is the task today?'
						onChange={e => setTask(e.target.value)}
						value={task}
					/>
					<button className={s.addBtn}>Add task</button>
				</div>
			</form>
		</div>
	)
}
