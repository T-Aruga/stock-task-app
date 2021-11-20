package database

import (
	"github.com/T-Aruga/stock-task-app/backend/domain"
)

type TaskRepository struct {
	SQLHandler
}

func (repo *TaskRepository) Save(task domain.Task) (id int, err error)  {
	result, err := repo.Execute(
		"INSERT INTO tasks (name, description, is_done) VALUES (?, ?, ?)", task.Name, task.Description, task.IsDone,
	)
	if err != nil {
		return
	}
	id64, err := result.LastInsertId()
	if err != nil {
		return
	}
	id = int(id64)
	return
}

func (repo *TaskRepository) FindByID(id int) (task domain.Task, err error)  {
	row, err := repo.Query("SELECT id, name, description, is_done FROM tasks WHERE id = ?", id)
	defer row.Close()
	if err != nil {
		return
	}
	var taskID int
	var name string
	var description string
	var isDone bool
	row.Next()
	err = row.Scan(&taskID, &name, &description, &isDone)
	if err != nil {
		return
	}
	task.ID = taskID
	task.Name = name
	task.Description = description
	task.IsDone = isDone
	return
}

func (repo *TaskRepository) FindAll() (tasks []domain.Task, err error) {
	rows, err := repo.Query("SELECT id, name, description, is_done FROM tasks")
	defer rows.Close()
	if err != nil {
		return
	}
	for rows.Next() {
		var id int
		var name string
		var description string
		var isDone bool
		if err := rows.Scan(&id, &name, &description, &isDone); err != nil {
			continue
		}
		task := domain.Task{
			ID:        id,
			Name:      name,
			Description: description,
			IsDone:    isDone,
		}
		tasks = append(tasks, task)
	}
	return
}
