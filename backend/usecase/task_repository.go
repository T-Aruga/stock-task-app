// Package usecase contains clean arch usecase code
package usecase

import "github.com/T-Aruga/stock-task-app/backend/domain"

type TaskRepository interface {
	Save(task domain.Task) (int, error)
	FindByID(id int) (domain.Task, error)
	FindAll() ([]domain.Task, error)
}
