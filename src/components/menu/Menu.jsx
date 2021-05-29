import React, { useState } from 'react';
import './Menu.css'
import { Link, useLocation } from 'react-router-dom';
import Dish from './dish/Dish';

export default function Menu() {
    const { state } = useLocation();
    const [dish, setDish] = useState(state ? state.dish : null);

	return (
        <>
            <section id="menu-section">
                <h1>MENU</h1>
                <ul>
                    {
                        ["Ratatouille", "Samosa", "Jalebi", "Phindi", "Bharwa",
                         "Panipuri", "Malasa", "Kulche", "Katsu", "Navi"].map((value, index) => (
                            <li key={index}>
                                <div className="dish-image" onClick={_ => setDish(index)}
                                    style={{backgroundImage: `url("/images/dish${index}.jpg")`}}>

                                </div>
                                <p onClick={_ => setDish(index)}>{value}</p>
                            </li>
                        ))
                    }
                </ul>
            </section>
            { dish !== null && <Dish dish={dish} close={_ => setDish(null)}/> }
        </>
	);
}
