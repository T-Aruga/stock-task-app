// Package usecase contains clean arch usecase code
package usecase

import (
	"github.com/T-Aruga/stock-task-app/backend/domain"
)

type TaskInteractor struct {
	TaskRepository TaskRepository
}

func (interactor *TaskInteractor) AddTask(task domain.Task) (domain.Task, error) {
	id, err := interactor.TaskRepository.Save(task)
	if err != nil {
		return task, err
	}
	foundTask, err := interactor.TaskRepository.FindByID(id)
	if err != nil {
		return foundTask, err
	}
	return foundTask, nil
}

func (interactor *TaskInteractor) GetTask(id int) (domain.Task, error) {
	task, err := interactor.TaskRepository.FindByID(id)
	if err != nil {
		return task, err
	}
	return task, nil
}

func (interactor *TaskInteractor) GetAllTasks() ([]domain.Task, error) {
	tasks, err := interactor.TaskRepository.FindAll()
	if err != nil {
		return tasks, err
	}
	return tasks, nil
}
