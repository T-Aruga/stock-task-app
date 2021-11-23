package infrastructure

import (
	"fmt"
	"github.com/T-Aruga/stock-task-app/backend/interface/database"
	"gorm.io/gorm"
	"gorm.io/driver/mysql"
)

type SQLHandler struct {
	Conn *gorm.DB
}

func NewSQLHandler() database.SQLHandler {
	dataSourceName := fmt.Sprintf(
		"%s:%s@tcp(%s:%s)/%s?charset=utf8mb4&parseTime=true&loc=Local",
		"root",
		"password",
		"127.0.0.1",
		"3306",
		"taskapp",
	)

	conn, err := gorm.Open(mysql.Open(dataSourceName), &gorm.Config{})
	if err != nil {
		panic(err.Error)
	}
	sqlHandler := new(SQLHandler)
	sqlHandler.Conn = conn
	return sqlHandler
}

func (handler *SQLHandler) Create(obj interface{}) *gorm.DB {
	 return handler.Conn.Create(obj)
}

func (handler *SQLHandler) Find(obj interface{}, where ...interface{}) *gorm.DB {
	return handler.Conn.Find(obj, where...)
}
