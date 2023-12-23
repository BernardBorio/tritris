import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.scss';
import Board from "./components/Board";

function App() {

	const [screenSize, setScreenSize] = useState(getCurrentDimension());

	function getCurrentDimension() {
		return {
			width: window.innerWidth,
			height: window.innerHeight
		}
	}

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
