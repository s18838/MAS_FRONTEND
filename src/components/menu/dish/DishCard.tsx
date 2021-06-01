import React from 'react';
import './DishCard.css';
import { Link } from 'react-router-dom';
import { Dish } from '../../../lib/types';

type DishCardType = {
    dish: Dish,
    close: () => void
}

export default function DishCard({ dish, close }: DishCardType) {
	return (
        <>
            <section id="dish-section">
                <ul>
                    <li>
                        <div id="dish-image" style={{backgroundImage: `url("${dish.image}")`}}></div>
                    </li>
                    <li>
                        <h3>{dish.name}</h3>
                        <ul className="dish-info-list">
                            <li>Weight: {dish.weight}g</li>
                            <li>Ingridients: {dish.ingredients}</li>
                            <li>Country: {dish.country}</li>
                            <li>Cooking time: {dish.cookingTime} minut</li>
                            <li>Price: {dish.price}$</li>
                        </ul>
                    </li>
                </ul>

                <button id="dish-info-close-button" onClick={close}></button>
            </section>
        </>
	);
}
