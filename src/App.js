import "./App.css"
import RecordsContainer from "./components/RecordsContainer"
import NotesArea from "./components/NotesArea";

function App() {
  return(
    <div id="app">
      <div id="nav">
        <button id="earlier" type="button"></button>
        <p>*data*</p>
        <button id="next" type="button"></button>
      </div>
      <div id="left">
        <RecordsContainer />
        <NotesArea />
      </div>
      <div id="right">
        *statystyki*
      </div>
    </div>
  );
};

export default App;