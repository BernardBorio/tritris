import React, {useEffect, useState} from 'react';
import './App.scss';
import Board from "./components/Board/Board";
import {getDatabase, onValue, ref, set} from "firebase/database";
import StartScreen from "./components/StartScreen/StartScreen";

function App(props: any) {
	const firebase = props.app
	const db = getDatabase(firebase);

	const [screenSize, setScreenSize] = useState(getCurrentDimension());
	const [match, setMatch] = useState<number>(-1);
	const [matches, setMatches] = useState<any[]>([]);
	const [newId, setNewId] = useState<number>(0);
	function getCurrentDimension() {
		return {
			width: window.innerWidth,
			height: window.innerHeight
		}
	}

	const colors = {
		red: "#a21b1b",
		blue: "#001CBE"
	}

	const data = ref(db, 'matches');

	useEffect(() => {
		onValue(data, (snapshot) => {
			let data = snapshot.val();
			if (data!== null) {
				let maxId = 0;
				data.forEach((match: any, index: number) => {
					if (match.id > maxId) {
						maxId = match.id;
					}
				})
				setNewId(maxId + 1);
			}
			else {
				data = [];
			}
			setMatches(data);
			console.log(snapshot.val());
		})
	},[])

	useEffect(() => {
		const updateDimension = () => {
			setScreenSize(getCurrentDimension())
		}
		window.addEventListener('resize', updateDimension);
		return (() => {
			window.removeEventListener('resize', updateDimension);
		})
	}, [screenSize])

	return (
		<div className={"container"}>
			{
				match === -1 ?
					<StartScreen
						matches={matches}
						colors={colors}
						newId={newId}
						setMatches={setMatches}
						setMatch={setMatch}
						db={db}
					/>:
					<Board
						colors={colors}
						vertical={screenSize.width < screenSize.height}
						db={db}
					/>
			}
		</div>

	);
}

export default App;
