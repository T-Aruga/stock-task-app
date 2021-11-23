package main

import (
	"fmt"
	"github.com/T-Aruga/stock-task-app/backend/domain"
	"gorm.io/gorm"
	"gorm.io/driver/mysql"
)

func seeds(db *gorm.DB) error {
	for i := 0; i < 10; i++ {
		var n = fmt.Sprint(i + 1)
		task := domain.Task{Name: fmt.Sprintf("test task%s", n), Description: fmt.Sprintf("this is test task No.%s", n), IsDone: false}
		if err := db.Create(&task).Error; err != nil {
			fmt.Printf("%+v", err)
		}
	}
	return nil
}

func openConnection() *gorm.DB {
	dataSourceName := fmt.Sprintf(
		"%s:%s@tcp(%s:%s)/%s?charset=utf8mb4&parseTime=true&loc=Local",
		"root",
		"password",
		"127.0.0.1",
		"3306",
		"taskapp",
	)
	db, err := gorm.Open(mysql.Open(dataSourceName), &gorm.Config{})
	if err != nil {
		fmt.Errorf("Couldn't establish database connection: %s", err)
	}
	return db
}

func main() {
	db := openConnection()
	if err := seeds(db); err != nil {
		fmt.Printf("%+v", err)
		return
	}
}
