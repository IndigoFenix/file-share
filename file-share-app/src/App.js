import './App.css';
import Main from './Main';
import FileUploader from './FileUploader';
import FileDownloader from './FileDownloader';

function App() {
  return (
    <div className="App">
      <FileUploader></FileUploader>
      <FileDownloader></FileDownloader>
    </div>
  );
}

export default App;
