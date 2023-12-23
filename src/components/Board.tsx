import React, {useEffect, useState} from "react";
import {ReactComponent as Circle} from '../assets/circle.svg';
import {ReactComponent as Cross} from '../assets/cross.svg';

export default function Board(props: any) {

	const [cellsContent, setCellsContent] = useState<string[][]>([...Array(9)].map(() => [...Array(9)].map(() => '')));
	const [turn, setTurn] = useState<'X' | 'O'>('X');
	const [cellsStatus, setCellsStatus] = useState<boolean[]>([...Array(9)].map(() => true));
	const [macroCellsContent, setMacroCellsContent] = useState<string[]>([...Array(9)].map(() => ''));
	const [cellToCheck, setCellToCheck] = useState<number>(0);

	useEffect(() => {
		checkMicroTris(cellToCheck)
	}, [cellsContent]);

	function selectCell(i: number, j: number) {
		setCellToCheck(i)
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
		console.log('selectCell', i, j)
		console.log('cellsContent', cellsContent)
		if (macroCellsContent[j] !== '') {
			setCellsStatus([...cellsStatus].map((cell, index) => {
				return true;
			}))
		}
		else {
			setCellsStatus([...cellsStatus].map((cell, index) => {
				return index === j;
			}))
		}
	}

	function checkMicroTris(i: number) {
		console.log('checkMicroTris', i)
		if (cellsContent[i][0] === cellsContent[i][1] && cellsContent[i][0] === cellsContent[i][2] && cellsContent[i][0] !== '') {
			setMacroCellsContent([...macroCellsContent.map((c, index) => {
				if (index === i) {
					return cellsContent[i][0]
				}
				return c
			})])
			setCellsStatus([...cellsStatus.map(()=>{return true})])
		}
		if (cellsContent[i][3] === cellsContent[i][4] && cellsContent[i][3] === cellsContent[i][5] && cellsContent[i][3] !== '') {
			setMacroCellsContent([...macroCellsContent.map((c, index) => {
				if (index === i) {
					return cellsContent[i][3]
				}
				return c
			})])
			setCellsStatus([...cellsStatus.map(()=>{return true})])
		}
		if (cellsContent[i][6] === cellsContent[i][7] && cellsContent[i][6] === cellsContent[i][8] && cellsContent[i][6] !== '') {
			setMacroCellsContent([...macroCellsContent.map((c, index) => {
				if (index === i) {
					return cellsContent[i][6]
				}
				return c
			})])
			setCellsStatus([...cellsStatus.map(()=>{return true})])
		}
		if (cellsContent[i][0] === cellsContent[i][3] && cellsContent[i][0] === cellsContent[i][6] && cellsContent[i][0] !== '') {
			setMacroCellsContent([...macroCellsContent.map((c, index) => {
				if (index === i) {
					return cellsContent[i][0]
				}
				return c
			})])
			setCellsStatus([...cellsStatus.map(()=>{return true})])
		}
		if (cellsContent[i][1] === cellsContent[i][4] && cellsContent[i][1] === cellsContent[i][7] && cellsContent[i][1] !== '') {
			setMacroCellsContent([...macroCellsContent.map((c, index) => {
				if (index === i) {
					return cellsContent[i][1]
				}
				return c
			})])
			setCellsStatus([...cellsStatus.map(()=>{return true})])
		}
		if (cellsContent[i][2] === cellsContent[i][5] && cellsContent[i][2] === cellsContent[i][8] && cellsContent[i][2] !== '') {
			setMacroCellsContent([...macroCellsContent.map((c, index) => {
				if (index === i) {
					return cellsContent[i][2]
				}
				return c
			})])
			setCellsStatus([...cellsStatus.map(()=>{return true})])
		}
		if (cellsContent[i][0] === cellsContent[i][4] && cellsContent[i][0] === cellsContent[i][8] && cellsContent[i][0] !== '') {
			setMacroCellsContent([...macroCellsContent.map((c, index) => {
				if (index === i) {
					return cellsContent[i][0]
				}
				return c
			})])
			setCellsStatus([...cellsStatus.map(()=>{return true})])
		}
		if (cellsContent[i][3] === cellsContent[i][4] && cellsContent[i][3] === cellsContent[i][6] && cellsContent[i][3] !== '') {
			setMacroCellsContent([...macroCellsContent.map((c, index) => {
				if (index === i) {
					return cellsContent[i][3]
				}
				return c
			})])
			setCellsStatus([...cellsStatus.map(()=>{return true})])
		}
	}

	return (
		<div className={"board"}>
			{[...Array(9)].map((_, i) => {
				return (
					<div className={`
							tile 
							${cellsStatus[i] ? '' : 'disabled'}
							${macroCellsContent[i] === '' ? '' : 'filled'}`
						} key={i}>
						{
							macroCellsContent[i] === '' ?
								<div className={`subTileContainer`}>
									{[...Array(9)].map((_, j) => {
										return (
											<div
												onClick={() => selectCell(i, j)}
												id={`${i}${j}`}
												className={
													`subTile 
													${cellsContent[i][j] !== '' ? 'filled' : ''}
													${turn === 'X' ? 'red' : 'blue'}
													${cellsStatus[i] ? '' : 'disabled'}`
												} key={j}>
												{
													cellsContent[i][j] === '' ? '' :
														cellsContent[i][j] === 'X' ?
															<Cross fill={"#a21b1b"} width={"50%"} height={"50%"}/>
															:
															<Circle stroke={"#001CBE"} width={"calc(50% + 2px)"} height={"calc(50% + 2px)"}/>
												}
											</div>
										)
									})}
								</div>
								:
								<div className={`tileWinner`}>
									{
										macroCellsContent[i] === 'X' ?
											<Cross fill={"#a21b1b"} width={"100%"} height={"100%"}/>
											:
											<Circle stroke={"#001CBE"} width={"calc(100% + 2px)"} height={"calc(100% + 2px)"}/>
									}
								</div>
						}
					</div>)
			})}
		</div>
	)
}
