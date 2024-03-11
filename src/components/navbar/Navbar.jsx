import React, { useState } from 'react'
import './Navbar.css'
import { ParticleCanvas } from './ParticleCanvas';

export const Navbar = (props) => {
    const [activeItem, setActiveItem] = useState(null);

    const handleMouseEnter = (item) => {
        setActiveItem(item);
    };

    const handleMouseLeave = () => {
        setActiveItem(null);
    };
  return (
    <nav className={'top navbar-animation'}>
      <ul className="nav-list">
        {['Home', 'About', 'Experiences', 'Games'].map((item, index) => (
          <li
            key={index}
            className={activeItem === item ? 'active' : ''}
            onMouseEnter={() => handleMouseEnter(item)}
            onMouseLeave={()=> handleMouseLeave()}
          >
            <a href={`${item.toLowerCase()}.html`}><span>{item}</span></a>
            {activeItem === item && <ParticleCanvas active="active" flip={'top'} />}
          </li>
        ))}
      </ul>
    </nav>
  )
}
