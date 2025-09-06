package handlers

import (
	"github.com/a-h/templ"
	"NTG/web/templates/home"
)

func Home() {
	templ.Handler(home.Home()))
}
