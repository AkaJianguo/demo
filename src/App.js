import './App.css';
import Table from "./test/table.tsx";
import Tree from "./tree/index";
import Edit from './contentEditable/index';
import Tes from './contentEditable/tes';


function App() {
  return (
    <div className="App">
     <Table></Table>
     <Tree></Tree>
     <Edit></Edit>
     <Tes  style={{ color: 'red', fontSize: '16px' }}></Tes>
    </div>
  );
}

export default App;
