package domain

import "time"

type Task struct {
	ID          int    `gorm:"primary_key" json:"id"`
	Name        string `json:"name"`
	Description string `json:"description"`
	IsDone      bool `json:"is_done"`
	CreatedAt   time.Time `json:"-"`
	UpdatedAt   time.Time `json:"-"`
}
