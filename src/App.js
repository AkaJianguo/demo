// import './App.css';
import Table from './test/table.tsx';
import Tree from './tree/index';
import Edit from './contentEditable/index';
import Tes from './contentEditable/tes';
import TextEditor from './edit/index';
import InputEdit from './InputEdit/metering';


function App() {
	return (
		<div className="App">
			<Table></Table>
			<Tree></Tree>
			<Edit></Edit>
			<Tes style={{ color: 'red', fontSize: '16px' }}></Tes>
			<TextEditor></TextEditor>
			————————————————————————————————
			<InputEdit></InputEdit>
		</div>
	);
}

export default App;
