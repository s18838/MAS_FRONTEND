import React, { useState, useEffect } from 'react';
import './Home.css'
import { useHistory } from 'react-router-dom';
import { News } from '../../_lib/types';
import { homeService } from '../../_services/home.service';
import SyncLoader from 'react-spinners/SyncLoader';

export default function Home() {

    const history = useHistory();

    const [news, setNews] = useState<News[]>([]);
    const [loading, setLoading] = useState(true);

    const handleClick = (dishId: number) => {
        history.push("/menu", { dishId });
    }

    useEffect(() => {
        homeService.getNews()
            .then(data => {
                setLoading(false);
                setNews(data);
            });
    }, [])

	return (
		<section id="home-section">
            <h1>WELCOME</h1>
            {
                loading && (
                    <div className="loader">
                        <SyncLoader loading={true} size={25} margin={20}/>
                    </div>
                )
            }
            <ul>
                {
                    news.map((data, index) => (
                        <li key={index} className="home-block">
                            <div className="home-block-image" onClick={_ => handleClick(data.dishId)}
                                style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), 
                                    url("${data.image}")`}}>
                                <h3>{data.title}</h3>
                            </div>
                        </li>
                    ))
                }
            </ul>
        </section>
	);
}
