import { NavLink } from 'react-router-dom';

import scss from './Logo.module.scss';

const Logo = () => {   
    return (
        <NavLink className={scss.logo} to="/" end>Event Planner</NavLink>
    );
}

export default Logo;