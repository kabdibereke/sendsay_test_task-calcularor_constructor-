import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import Main from "./pages/Main"
import { SortContextProvider } from "./context/context"

function App() {

  return (
    <div className="container">
      	<DndProvider backend={HTML5Backend}>
          <SortContextProvider>
          <Main/>
          </SortContextProvider>
				</DndProvider>
    
    </div>
  )
}

export default App
