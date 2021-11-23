package controllers

import (
	"github.com/T-Aruga/stock-task-app/backend/domain"
	"github.com/T-Aruga/stock-task-app/backend/interface/database"
	"github.com/T-Aruga/stock-task-app/backend/usecase"
)

type TaskController struct {
	Interactor usecase.TaskInteractor
}

func NewTaskController(sqlHandler database.SQLHandler) *TaskController {
	return &TaskController{
		Interactor: usecase.TaskInteractor{
			TaskRepository: &database.TaskRepository{
				SQLHandler: sqlHandler,
			},
		},
	}
}

func (controller *TaskController) CreateTask(c Context) (err error) {
	t := domain.Task{}
	c.Bind(&t)
	task, err := controller.Interactor.AddTask(t)
	if err != nil {
		return c.JSON(500, NewError(err))
	}
	return c.JSON(200, task)
}

func (controller *TaskController) GetTasks(c Context) (err error) {
	tasks, err := controller.Interactor.GetAllTasks()
	if err != nil {
		return c.JSON(500, NewError(err))
	}
	return c.JSON(200, tasks)
}

func (controller *TaskController) GetTask(c Context) (err error) {
	task, err := controller.Interactor.GetTaskByID(c.Param("id"))
	if err != nil {
		return c.JSON(500, NewError(err))
	}
	return c.JSON(200, task)
}
