// Package usecase contains clean arch usecase code
package usecase

import "github.com/T-Aruga/stock-task-app/backend/domain"

type TaskRepository interface {
	Store(task domain.Task) (domain.Task, error)
	FindByID(id string) (domain.Task, error)
	FindAll() ([]domain.Task, error)
}
