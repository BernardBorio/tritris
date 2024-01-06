import {useEffect, useState} from "react";
import Circle from '../../assets/circle.tsx';
import Cross from '../../assets/cross.tsx';
import './Board.scss';
import {ref, set} from "firebase/database";

export default function Board(props: any) {

	const [cellsContent, setCellsContent] = useState<string[][]>([...Array(9)].map(() => [...Array(9)].map(() => '')));
	const [turn, setTurn] = useState<'X' | 'O'>('X');
	const [cellsStatus, setCellsStatus] = useState<boolean[]>([...Array(9)].map(() => true));
	const [macroCellsContent, setMacroCellsContent] = useState<string[]>([...Array(9)].map(() => ''));
	const [cellToCheck, setCellToCheck] = useState<number>(0);
	const vertical = props.vertical ? 'vertical' : '';
	const [match, setMatch] = useState<any>({
		id: -1,
		red: '',
		blue: '',
		cellsContent: [...Array(9)].map(() => [...Array(9)].map(() => '')),
		cellsStatus: [...Array(9)].map(() => true),
		cellToCheck: cellToCheck,
		status: 'pending',
		turn: 'X'
	});
	const [update, setUpdate] = useState<boolean>(false);

	useEffect(() => {
		checkMicroTris(cellToCheck)
	}, [cellsContent]);

	useEffect(() => {
		console.log('matchId', props.matchId)
		setMatch(props.matches.filter((match: any) => match.id === props.matchId)[0])
		setCellsContent(match.cellsContent)
		setTurn(match.turn)
	}, []);


	useEffect(() => {
		let newMatch = {
			...props.matches.filter((match: any) => match.id === props.matchId)[0],
			cellsContent: cellsContent,
			cellsStatus: cellsStatus,
			turn: turn,
			cellToCheck: cellToCheck
		}
		let newMatches = props.matches.map((match: any) => {
			if (match.id === newMatch.id) {
				return newMatch
			}
			return match
		})
		set(ref(props.db, 'matches/'), newMatches)
	}, [update]);

	useEffect(() => {
		console.log('matchId', props.matchId)
		console.log('matches', props.matches)
		// console.log('match', props.matches.filter((match: any) => match.id === props.matchId)[0])
		setMatch({...props.matches.filter((match: any) => match.id === props.matchId)[0]})
	}, [props.matches])

	useEffect(() => {
		setCellsContent(match.cellsContent)
		setTurn(match.turn)
		setCellsStatus(match.cellsStatus)
		setCellToCheck(match.cellToCheck)
	}, [match]);

	// useEffect(() => {
	// 	for(let i=0; i<9; i++) {
	// 		checkMicroTris(i)
	// 	}
	// }, [cellsContent]);

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
			setCellsStatus([...cellsStatus].map(() => {
				return true;
			}))
		} else {
			setCellsStatus([...cellsStatus].map((_cell, index) => {
				return index === j;
			}))
		}
		setUpdate(!update)
	}

	function checkMicroTris(i: number) {
		console.log('cellsContent', cellsContent)
		if (cellsContent[i][0] === cellsContent[i][1] && cellsContent[i][0] === cellsContent[i][2] && cellsContent[i][0] !== '') {
			setMacroCellsContent([...macroCellsContent.map((c, index) => {
				if (index === i) {
					return cellsContent[i][0]
				}
				return c
			})])
			setCellsStatus([...cellsStatus.map(() => {
				return true
			})])
		}
		if (cellsContent[i][3] === cellsContent[i][4] && cellsContent[i][3] === cellsContent[i][5] && cellsContent[i][3] !== '') {
			setMacroCellsContent([...macroCellsContent.map((c, index) => {
				if (index === i) {
					return cellsContent[i][3]
				}
				return c
			})])
			setCellsStatus([...cellsStatus.map(() => {
				return true
			})])
		}
		if (cellsContent[i][6] === cellsContent[i][7] && cellsContent[i][6] === cellsContent[i][8] && cellsContent[i][6] !== '') {
			setMacroCellsContent([...macroCellsContent.map((c, index) => {
				if (index === i) {
					return cellsContent[i][6]
				}
				return c
			})])
			setCellsStatus([...cellsStatus.map(() => {
				return true
			})])
		}
		if (cellsContent[i][0] === cellsContent[i][3] && cellsContent[i][0] === cellsContent[i][6] && cellsContent[i][0] !== '') {
			setMacroCellsContent([...macroCellsContent.map((c, index) => {
				if (index === i) {
					return cellsContent[i][0]
				}
				return c
			})])
			setCellsStatus([...cellsStatus.map(() => {
				return true
			})])
		}
		if (cellsContent[i][1] === cellsContent[i][4] && cellsContent[i][1] === cellsContent[i][7] && cellsContent[i][1] !== '') {
			setMacroCellsContent([...macroCellsContent.map((c, index) => {
				if (index === i) {
					return cellsContent[i][1]
				}
				return c
			})])
			setCellsStatus([...cellsStatus.map(() => {
				return true
			})])
		}
		if (cellsContent[i][2] === cellsContent[i][5] && cellsContent[i][2] === cellsContent[i][8] && cellsContent[i][2] !== '') {
			setMacroCellsContent([...macroCellsContent.map((c, index) => {
				if (index === i) {
					return cellsContent[i][2]
				}
				return c
			})])
			setCellsStatus([...cellsStatus.map(() => {
				return true
			})])
		}
		if (cellsContent[i][0] === cellsContent[i][4] && cellsContent[i][0] === cellsContent[i][8] && cellsContent[i][0] !== '') {
			setMacroCellsContent([...macroCellsContent.map((c, index) => {
				if (index === i) {
					return cellsContent[i][0]
				}
				return c
			})])
			setCellsStatus([...cellsStatus.map(() => {
				return true
			})])
		}
		if (cellsContent[i][2] === cellsContent[i][4] && cellsContent[i][2] === cellsContent[i][6] && cellsContent[i][2] !== '') {
			setMacroCellsContent([...macroCellsContent.map((c, index) => {
				if (index === i) {
					return cellsContent[i][2]
				}
				return c
			})])
			setCellsStatus([...cellsStatus.map(() => {
				return true
			})])
		}
	}

	return (
		match !== undefined ?
			<div className={`boardContainer`}>
				{macroCellsContent.toString()}
				<div className={`info`}>
					<div className={"name red"}>
						<Cross fill={props.colors.red} width={"24px"} height={"24px"}/>
						<h2>{match.red}</h2>
					</div>
					<h2>ID Partita: {match.id}</h2>
					<div className={"name blue"}>
						<h2>{match.blue}</h2>
						<Circle stroke={props.colors.blue} width={"24px"} height={"24px"}/>
					</div>
				</div>
				<div className={`board ${vertical} ${match.red === '' || match.blue === '' ? 'disabled' : ''}`}>
					{[...Array(9)].map((_, i) => {
						return (
							<div className={`
								tile 
							 ${vertical}
								${cellsStatus[i] && (match.turn === props.player || props.player === 'S') ? '' : 'disabled'}
								${macroCellsContent[i] === '' ? '' : 'filled'}`
							} key={i}>
								{
									macroCellsContent[i] === '' ?
										<div className={`subTileContainer ${vertical}`}>
											{[...Array(9)].map((_, j) => {
												return (
													<div
														onClick={() => selectCell(i, j)}
														id={`${i}${j}`}
														className={
															`subTile 
													 ${vertical}
														${cellsContent[i][j] !== '' ? 'filled' : ''}
														${turn === 'X' ? 'red' : 'blue'}
														${cellsStatus[i] && (match.turn === props.player || props.player === 'S') ? '' : 'disabled'}`
														} key={j}>
														{
															cellsContent[i][j] === '' ? '' :
																cellsContent[i][j] === 'X' ?
																	<Cross fill={props.colors.red} width={"50%"} height={"50%"}/>
																	:
																	<Circle stroke={props.colors.blue} width={"calc(50% + 2px)"}
																					height={"calc(50% + 2px)"}/>
														}
													</div>
												)
											})}
										</div>
										:
										<div className={`tileWinner ${vertical}`}>
											{
												macroCellsContent[i] === 'X' ?
													<Cross fill={props.colors.red} width={"100%"} height={"100%"}/>
													:
													<Circle stroke={props.colors.blue} width={"calc(100% + 2px)"} height={"calc(100% + 2px)"}/>
											}
										</div>
								}
							</div>)
					})}
				</div>
			</div>
			: <></>
	)
}
