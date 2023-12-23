import React from "react";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import {ReactComponent as Circle} from '../assets/circle.svg';
import {ReactComponent as Cross} from '../assets/cross.svg';

export default function Board(props: any) {
	return (
		<div className={"board"}>
			{[...Array(9)].map((_, i) => {
				return (
					<div className={"tile"} key={i}>
						<div className={`subTileContainer`}>
							{[...Array(9)].map((_, j) => {
								return (
									<div
										onClick={() => props.selectCell(i, j)}
										id={`${i}${j}`}
										className={
											`subTile 
											${props.cellsContent[i][j] !== '' ? 'disabled' : ''}
											${props.turn === 'X' ? 'red' : 'blue'}`
										} key={j}>
										{
											props.cellsContent[i][j] === '' ? '' :
												props.cellsContent[i][j] === 'X' ?
													<Cross fill={"#a21b1b"} width={"50%"} height={"50%"}/>
													:
													<Circle stroke={"#001CBE"} width={"calc(50% + 2px)"} height={"calc(50% + 2px)"}/>
										}
									</div>
								)
							})}
						</div>
					</div>)
			})}
		</div>
	)
}
