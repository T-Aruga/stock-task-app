// Package domain contains clean arch domain code
package domain

type Task struct {
	ID          int
	Name        string
	Description string
	IsDone      bool
}
