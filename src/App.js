import { Container } from 'react-bootstrap';
import './App.css';
import Header from './component/Header';
import TableUsers from './component/TableUsers';

function App() {
  return (
    <div className="App">
      <h1>LapVQ</h1>
      <Header/>
      <Container>
        <TableUsers/>
      </Container>
    </div>
  );
}

export default App;
