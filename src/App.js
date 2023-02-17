import "./App.css"
import RecordsContainer from "./components/RecordsContainer"
import NotesArea from "./components/NotesArea"
import Stats from "./components/Stats"
import NavigationBar from "./components/NavigationBar"

function App(){
  return(
    <div id="app">
      <div id="nav">
        <NavigationBar />
      </div>
      <div id="left">
        <RecordsContainer />
        <NotesArea />
      </div>
      <div id="right">
        <Stats />
      </div>
    </div>
  )
}

export default App