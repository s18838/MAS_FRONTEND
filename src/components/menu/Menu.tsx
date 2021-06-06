import React, { useEffect, useState } from 'react';
import './Menu.css';
import { useLocation } from 'react-router-dom';
import DishCard from './dish/DishCard';
import { Dish } from '../../_lib/types';
import { menuService } from '../../_services/menu.service';
import SyncLoader from 'react-spinners/SyncLoader';

export default function Menu() {
    const { state } = useLocation<{ dishId: number }>();

    const [dish, setDish] = useState<Dish | null>(null);
    const [loading, setLoading] = useState(true);
    const [dishes, setDishes] = useState([] as Dish[])

    useEffect(() => {
        menuService.getMenu()
            .then(data => {
                setLoading(false);
                setDishes(data);
            });
    }, [])

    useEffect(() => {
        if (state && state.dishId && dishes.length > 0) {
            const dish: Dish | undefined = dishes.filter(e => e.id === state.dishId).pop();
            if (dish) {
                setDish(dish);
            }
        }
    }, [dishes, state])

	return (
        <>
            <section id="menu-section">
                <h1>MENU</h1>
                {
                    loading && (
                        <div className="loader">
                            <SyncLoader loading={true} size={25} margin={20}/>
                        </div>
                    )
                }
                <ul>
                    {
                        dishes.map((dish, index) => (
                            <li key={index}>
                                <div className="dish-image" onClick={_ => setDish(dish)}
                                    style={{backgroundImage: `url("${dish.image}")`}}>

                                </div>
                                <p onClick={_ => setDish(dish)}>{dish.name}</p>
                            </li>
                        ))
                    }
                </ul>
            </section>
            { dish !== null && <DishCard dish={dish} close={() => setDish(null)}/> }
        </>
	);
}
