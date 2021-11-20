package controllers

import (
	"github.com/T-Aruga/stock-task-app/backend/domain"
	"github.com/T-Aruga/stock-task-app/backend/interface/database"
	"github.com/T-Aruga/stock-task-app/backend/usecase"
	"strconv"
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

func (controller *TaskController) Create(c Context) (err error) {
	t := domain.Task{}
	c.Bind(&t)
	task, err := controller.Interactor.AddTask(t)
	if err != nil {
		return c.JSON(500, err.Error())
	}
	return c.JSON(200, task)
}

func (controller *TaskController) Index(c Context) (err error) {
	tasks, err := controller.Interactor.GetAllTasks()
	if err != nil {
		return c.JSON(500, err.Error())
	}
	return c.JSON(200, tasks)
}

func (controller *TaskController) Show(c Context) (err error) {
	id, _ := strconv.Atoi(c.Param("id"))
	task, err := controller.Interactor.GetTask(id)
	if err != nil {
		return c.JSON(500, err.Error())
	}
	return c.JSON(200, task)
}
