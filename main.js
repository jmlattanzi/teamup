const { app, BrowserWindow } = require('electron')

let win // keep the window in the global scope

const createWindow = () => {
	win = new BrowserWindow({ width: 1024, height: 720 })

	win.loadURL('http://localhost:3000/')

	win.on('closed', () => {
		win = null
	})
}

app.on('ready', createWindow) // create the window when the app is loaded
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

app.on('activate', () => {
	if (win === null) {
		createWindow()
	}
})
