import React, {useState} from 'react';
import './StartScreen.scss';
import {ReactComponent as Circle} from '../../assets/circle.svg';
import {ReactComponent as Cross} from '../../assets/cross.svg';
import {red} from "@mui/material/colors";
import {Form} from "react-bootstrap";
import {ref, set} from "firebase/database";

export default function StartScreen(props: any) {

	let colors = ["#ff0000", "#ff7f00", "#ffff00", "#00ff00", "#0000ff", "#4b0082", "#9400d3", "#00ff00", "#000000"];
	const [state, setState] = useState(-1);
	const [redName, setRedName] = useState("");
	const [blueName, setBlueName] = useState("");

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
			cellsContent: [...Array(9)].map(() => [...Array(9)].map(() => ''))
		}
		let newMatches = [...props.matches, newMatch]
		// props.setMatches([...props.matches, newMatch])

		set(ref(props.db, 'matches/'), newMatches)
		props.setMatch(newMatch.id)
		console.log(redName, blueName)
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
							<button className={`button blue filled`} onClick={()=>{setState(-1)}}>
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
					<></>
				:
				state === 2 ?
					<></>
				:
				<div>
					<div className={"button red"} onClick={()=>setState(0)}>
						<h2>Inizia una partita</h2>
					</div>
					<div className={"button blue"} onClick={()=>setState(1)}>
						<h2>Unisciti a una partita</h2>
					</div>
				</div>
			}
		</div>)
}
