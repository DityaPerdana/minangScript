import { useState } from 'react'
import './App.css'
import MinangCompiler from './components/MinangCompiler'

function App() {
  return (
    <div className="App">
      <header className="app-header">
        <h1>🏔️ MinangScript Web Compiler</h1>
        <p>Compile MinangScript code to JavaScript in your browser</p>
        <p className="philosophy">Philosophy: Alam Takambang Jadi Guru (Nature is Our Teacher)</p>
      </header>
      <main>
        <MinangCompiler />
      </main>
    </div>
  )
}

export default App
