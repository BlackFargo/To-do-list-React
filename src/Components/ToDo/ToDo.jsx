import React from 'react'
import s from './ToDo.module.scss'
import GlobalSvgSelector from '../../assets/Global/GlobalSvgSelector'

export default function ToDo({
	tasks,
	deleteTask,
	editTask,
	saveTask,
	edit,
	setEdit,
	moveUp,
	moveDown,
	isDoneToggle
}) {
	return (
		<>
			<ul className={s.list}>
				{tasks.map((task, index) => {
					return (
						<li key={task.id} id={task.id} className={s.list__item} >
							{edit && edit.id === task.id ? (
								<>
									<input
										value={edit.text}
										type='text'
										onChange={e => setEdit({ ...edit, text: e.target.value })}
										className={s.save_input}
									/>
									<button onClick={saveTask} className={s.save}>
										Save
									</button>
									<button
										onClick={() => deleteTask(task.id, index)}
										className={s.delete}
									>
										X
									</button>
								</>
							) : (
								<>
									<span className={`${s.list__item_text} ${(task.isDone ? s.done : '')}`}  onClick={() => isDoneToggle(task.id)}>{task.text}</span>
									<div className={s.actions}>
										<button
											onClick={() => editTask(task.id, task.text)}
											className={s.edit}
										>
											Edit
										</button>
										<button onClick={() => moveUp(index)} className={s.icon}>
											👍
										</button>
										<button onClick={() => moveDown(index)} className={s.icon}>👇</button>
										<button
											onClick={() => deleteTask(task.id, index)}
											className={s.delete}
										>
											X
										</button>
									</div>
								</>
							)}
						</li>
					)
				})}
			</ul>
		</>
	)
}
