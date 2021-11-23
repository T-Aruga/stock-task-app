package database

import (
	"github.com/T-Aruga/stock-task-app/backend/domain"
)

type TaskRepository struct {
	SQLHandler
}

func (repo *TaskRepository) Store(t domain.Task) (task domain.Task, err error) {
	if err = repo.Create(&t).Error; err != nil {
		return
	}
	task = t
	return
}

func (repo *TaskRepository) FindByID(id string) (task domain.Task, err error) {
	if err = repo.Find(&task, id).Error; err != nil {
		return
	}
	return
}

func (repo *TaskRepository) FindAll() (tasks []domain.Task, err error) {
	if err = repo.Find(&tasks).Error; err != nil {
		return
	}
	return
}
