import './App.css'
import IssTracker from './components/IssTracker'
import 'leaflet/dist/leaflet.css'


function App() {
  return (
    <div className="App">
        <div className="Map-wrapper">
        <IssTracker/>
        </div>
    </div>
      );
    }
export default App
