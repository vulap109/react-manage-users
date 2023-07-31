import { Container } from 'react-bootstrap';
import './App.css';
import TableUsers from './component/TableUsers';

function App() {
  return (
    <div className="App">
      <Container>
        <TableUsers />
      </Container>
    </div>
  );
}

export default App;
