import { NavLink } from "react-router-dom";
import FormEvent from '../../components/formEvent/FormEvent';

import sprite from '../../images/sprite.svg';

import scss from './EventCreate.module.scss';

const EventCreate = () => {
    return(
        <header className={scss.eventCreate}>
            <div className='container'>
                <div className={scss.wrraper}>

                    <NavLink className={scss.linkBack} to="/">
                        <svg className={scss.linkBackIcon}>
                            <use id="arrow-left" href={`${sprite}#arrow-left`} />
                        </svg>
                        Back
                    </NavLink>

                    <h2 className={scss.title}>Create new event</h2>

                    <FormEvent />

                </div>
            </div>
        </header>
    );
}

export default EventCreate;