package infrastructure

import (
	"github.com/T-Aruga/stock-task-app/backend/interface/controllers"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func Init() {
	e := echo.New()
	// Middleware
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	taskController := controllers.NewTaskController(NewSQLHandler())

	// Routes
	e.POST("/tasks", func(c echo.Context) error {
		return taskController.CreateTask(c)
	})

	e.GET("/tasks/:id", func(c echo.Context) error {
		return taskController.GetTask(c)
	})

	e.GET("/tasks", func(c echo.Context) error {
		return taskController.GetTasks(c)
	})

	e.Logger.Fatal(e.Start(":8080"))
}
