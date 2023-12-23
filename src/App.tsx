import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.scss';
import Board from "./components/Board";
import {getDatabase, ref, set, onValue} from "firebase/database";

function App(props: any) {

	const [screenSize, setScreenSize] = useState(getCurrentDimension());
	const firebase = props.app
	function getCurrentDimension() {
		return {
			width: window.innerWidth,
			height: window.innerHeight
		}
	}

	const db = getDatabase(firebase);

	const data = ref(db, 'matches');
	onValue(data, (snapshot) => {
		console.log(snapshot.val());
	})

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
			<Board vertical={screenSize.width < screenSize.height}/>
		</div>

	);
}

export default App;
