import React from 'react';
import './App.css';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
} from 'react-router-dom';
import Header from './components/header/Header';
import Home from './components/home/Home';
import SignIn from './components/account/SignIn';
import CreateAccount from './components/account/CreateAccount';
import Menu from './components/menu/Menu';
import Reservetion from './components/reservation/Reservation';
import RoomReservation from './components/reservation/room/RoomReservation';
import RoomReservationSaved from './components/reservation/room/saved/RoomReservationSaved';
import NotImplemented from './components/not-implemented/NotImplemented';

export default function App() {
	return (
		<Router>
			<Header />
			<Switch>
				<Route path="/not-implemented">
					<NotImplemented />
				</Route>
				<Route path="/menu">
					<Menu />
				</Route>
				<Route path="/reservation/room/saved">
					<RoomReservationSaved />
				</Route>
				<Route path="/reservation/room">
					<RoomReservation />
				</Route>
				<Route path="/reservation">
					<Reservetion />
				</Route>
				<Route path="/authorize">
					<SignIn />
				</Route>
				<Route path="/register">
					<CreateAccount />
				</Route>
				<Route path="/">
					<Home />
				</Route>
			</Switch>
		</Router>
	);
}
