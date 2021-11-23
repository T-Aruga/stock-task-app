package database

import "gorm.io/gorm"

type SQLHandler interface {
	Create(obj interface{}) *gorm.DB
	Find(obj interface{}, where ...interface{}) *gorm.DB
}
