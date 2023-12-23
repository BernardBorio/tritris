import React, {useState} from 'react';
import logo from './logo.svg';
import './App.scss';
import Board from "./components/Board";

function App() {

	const [cellsContent, setCellsContent] = useState<string[][]>([...Array(9)].map(() => [...Array(9)].map(() => '')));
	const [turn, setTurn] = useState<'X' | 'O'>('X');

	function selectCell(i: number, j: number) {
		setCellsContent([...cellsContent].map((row, rowIndex) => {
			return row.map((cell, cellIndex) => {
				if (rowIndex === i && cellIndex === j) {
					if (turn === 'X') {
						setTurn('O')
						return 'X'
					}
					if (turn === 'O') {
						setTurn('X')
						return 'O'
					}
				}
				return cell
			})
		}))
	}

	return (
		<div className={"container"}>
			<Board
				cellsContent={cellsContent}
				selectCell={selectCell}
				turn={turn}
			/>
		</div>

	);
}

export default App;
