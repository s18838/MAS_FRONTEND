import React from 'react';
import './Dish.css'
import { Link } from 'react-router-dom';

type DishType = {
    dish: number,
    close: () => {}
}

export default function Dish({dish, close}: DishType) {
	return (
        <>
            <section id="dish-section">
                <ul>
                    <li>
                        <div id="dish-image" style={{backgroundImage: `url("/images/dish${dish}.jpg")`}}></div>
                    </li>
                    <li>
                        <h3>Ratatouille</h3>
                        <ul className="dish-info-list">
                            <li>Weight: 210g</li>
                            <li>Ingridients: rise, meat, sos, soya</li>
                            <li>Country: Japan</li>
                            <li>Price: 10$</li>
                        </ul>
                    </li>
                </ul>

                <button id="dish-info-close-button" onClick={close}></button>
            </section>
        </>
	);
}
