import React from 'react';
import './Home.css'
import { Link, useHistory } from 'react-router-dom';

export default function Home() {

    const history = useHistory();

    const handleClick = (dish: number) => {
        history.push("/menu", { dish });
    }

	return (
		<section id="home-section">
            <h1>WELCOME</h1>
            <ul>
                <li className="home-block">
                    <div className="home-block-image" onClick={_ => handleClick(8)}
                        style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), 
                            url("/images/dish8.jpg")`}}>
                        <h3>New dish - Katsu</h3>
                    </div>
                </li>
                <li className="home-block">
                    <div className="home-block-image" onClick={_ => handleClick(9)}
                        style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), 
                            url("/images/dish9.jpg")`}}>
                        <h3>Popular dish - Navi</h3>
                    </div>
                </li>
            </ul>
        </section>
	);
}
