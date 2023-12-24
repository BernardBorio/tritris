import React, {useState} from 'react';
import './StartScreen.scss';
import {ReactComponent as Circle} from '../../assets/circle.svg';
import {ReactComponent as Cross} from '../../assets/cross.svg';
import {red} from "@mui/material/colors";
import {Form} from "react-bootstrap";
import {ref, set} from "firebase/database";

export default function StartScreen(props: any) {

	const [state, setState] = useState(-1);
	const [redName, setRedName] = useState("");
	const [blueName, setBlueName] = useState("");
	const [matchId, setMatchId] = useState(-1);
	const [match, setMatch] = useState<any>();
	const [newRedName, setNewRedName] = useState("");
	const [newBlueName, setNewBlueName] = useState("");

	function updateRed(e: any) {
		setRedName(e.target.value)
	}

	function updateBlue(e: any) {
		setBlueName(e.target.value)
	}

	function handleSubmit(e: any) {
		e.preventDefault();
		let newMatch = {
			id: props.newId,
			red: redName,
			blue: blueName,
			cellsContent: [...Array(9)].map(() => [...Array(9)].map(() => '')),
			status: redName === '' || blueName === '' ? 'pending' : 'full',
			turn: 'X'
		}
		let newMatches = [...props.matches, newMatch]
		// props.setMatches([...props.matches, newMatch])

		set(ref(props.db, 'matches/'), newMatches)
		props.setMatch(newMatch)
		console.log(redName, blueName)
	}

	function joinMatch() {
		if (props.matches.filter((match: any) => match.id === matchId && match.status === 'pending').length === 0) {
			alert("Partita non trovata")
			return
		}
		let matchToJoin = props.matches.filter((match: any) => match.id === matchId)[0]
		setMatch(matchToJoin)
		setNewRedName(matchToJoin.red)
		setNewBlueName(matchToJoin.blue)
		setState(2)
	}

	function startMatch() {
		let newMatch = {
			id: match.id,
			red: newRedName,
			blue: newBlueName,
			cellsContent: [...Array(9)].map(() => [...Array(9)].map(() => '')),
			status: 'full',
			turn: 'X'
		}
		let newMatches = props.matches.map((match: any) => {
			if (match.id === newMatch.id) {
				return newMatch
			}
			return match
		})
		set(ref(props.db, 'matches/'), newMatches)
		props.setMatch(newMatch)
	}

	return (
		<div className={"startScreen"}>
			<h1 className={"title"}>Super<span>Tris</span></h1>
			{
				state === 0 ?
					<Form className={"startMatch"} onSubmit={handleSubmit}>
						<p style={{"marginBottom": "2rem"}}>Inserisci entrambi i nomi per giocare in locale, oppure inserisci un
							solo nome, premi invio e invita qualcuno a giocare con te</p>
						<div className={"inputContainer"}>
							<Cross fill={props.colors.red} height={"24px"} width={"24px"}/>
							<input
								name={"redName"}
								type={"text"}
								className={"textInput red"}
								placeholder={"Giocatore rosso"}
								key={"redName"}
								value={redName}
								onChange={updateRed}
							/>
							<Cross fill={props.colors.red} height={"24px"} width={"24px"}/>
						</div>
						<div className={"inputContainer"}>
							<Circle stroke={props.colors.blue} height={"24px"} width={"24px"}/>
							<input
								name={"blueName"}
								type={"text"}
								className={"textInput blue"}
								placeholder={"Giocatore blu"}
								key={"blueName"}
								value={blueName}
								onChange={updateBlue}
							/>
							<Circle stroke={props.colors.blue} height={"24px"} width={"24px"}/>
						</div>
						<div className={"buttonsContainer"}>
							<button className={`button blue filled`} onClick={() => {
								setState(-1)
							}}>
								<h2>Indietro</h2>
							</button>
							<button type={"submit"}
											className={`button red filled ${redName === '' && blueName === '' ? 'disabled' : ''}`}>
								<h2>Inizia</h2>
							</button>
						</div>
					</Form>
					:
					state === 1 ?
						<div className={"joinMatch"}>
							<div className={"inputContainer"}>
								<input
									type={"number"}
									className={"textInput blue"}
									placeholder={"Inserisci il codice della partita"}
									onChange={(e) => {
										let s = e.target.value
										if (s === '') {
											setMatchId(-1)
											return
										}
										setMatchId(parseInt(e.target.value))
									}}/>
							</div>
							<div className={"buttonsContainer"}>
								<button className={`button blue filled`} onClick={() => {
									setState(-1)
								}}>
									<h2>Indietro</h2>
								</button>
								<button className={`button red filled ${matchId < 0 ? 'disabled' : ''}`} onClick={joinMatch}>
									<h2>Unisciti</h2>
								</button>
							</div>
						</div>
						:
						state === 2 ?
							<div className={"joinMatch"}>
								{
									match.red === '' ?
										<div className={"inputContainer"}>
											<Cross fill={props.colors.red} height={"24px"} width={"24px"}/>
											<input
												type={"text"}
												className={"textInput red"}
												value={newRedName}
												placeholder={"Inserisci il tuo nome"}
												onChange={(e) => {
													setNewRedName(e.target.value)
												}}
											/>
											<Cross fill={props.colors.red} height={"24px"} width={"24px"}/>
										</div>
										:
										<div className={"inputContainer"}>
											<Circle stroke={props.colors.blue} height={"24px"} width={"24px"}/>
											<input
												type={"text"}
												className={"textInput blue"}
												placeholder={"Inserisci il tuo nome"}
												value={newBlueName}
												onChange={(e) => {
													setNewBlueName(e.target.value)
												}}
											/>
											<Circle stroke={props.colors.blue} height={"24px"} width={"24px"}/>
										</div>

								}
								<div className={"buttonsContainer"}>
									<button className={`button blue filled`} onClick={() => {
										setState(1)
									}}>
										<h2>Indietro</h2>
									</button>
									<button className={`button red filled ${newRedName === '' && newBlueName === '' ? 'disabled' : ''}`} onClick={startMatch}>
										<h2>Inizia</h2>
									</button>
								</div>
							</div>
							:
							<div>
								<div className={"button red"} onClick={() => setState(0)}>
									<h2>Inizia una partita</h2>
								</div>
								<div className={`button blue`} onClick={() => setState(1)}>
									<h2>Unisciti a una partita</h2>
								</div>
							</div>
			}
		</div>
	)
}
