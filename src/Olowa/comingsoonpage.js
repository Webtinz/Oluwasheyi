import React, { useEffect, useState } from 'react';
import './ComingSoonPage.css'; // Assurez-vous de copier le fichier CSS ou de l'ajuster selon vos besoins
import imglogo from '../assets/Frame 1000005869 (1).png';

const ComingSoonPage = () => {
    const [timer, setTimer] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        const targetDate = new Date("03/27/2025 10:00:00 AM").getTime();

        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate - now;

            if (distance <= 0) {
                clearInterval(interval);
                setTimer({
                    days: 0,
                    hours: 0,
                    minutes: 0,
                    seconds: 0
                });
            } else {
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);

                setTimer({ days, hours, minutes, seconds });
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className='coming-soon'>
            <div className="content-wrap">
                <div className="logo-box">
                    <img src={imglogo} alt="Logo" />
                </div>
                <div className="cta-box">
                    <h1>Nous serons <span className="highlight"> bientôt de retour !</span></h1>
                    <p>Nous profitons de cette période pour donner un coup de jeune à notre site web !</p>
                </div>

                <div className="countdown">
                    <p className="timer-cta">Nous lancerons notre site internet en</p>
                    <ul className="timer">
                        <li>
                            <div className="time-box">
                                <span className="time">{timer.days}</span>
                                <span className="time-txt">Jours</span>
                            </div>
                        </li>
                        <li>
                            <div className="time-box">
                                <span className="time">{timer.hours}</span>
                                <span className="time-txt">Heures</span>
                            </div>
                        </li>
                        <li>
                            <div className="time-box">
                                <span className="time">{timer.minutes}</span>
                                <span className="time-txt">Minutes</span>
                            </div>
                        </li>
                        <li>
                            <div className="time-box">
                                <span className="time">{timer.seconds}</span>
                                <span className="time-txt">Secondes</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

    );
};

export default ComingSoonPage;
