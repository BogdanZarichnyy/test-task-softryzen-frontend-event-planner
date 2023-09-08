import Logo from '../logo/Logo';
import SelectLanguage from '../selectLanguage/SelectLanguage';
import SearchForm from '../searchForm/SearchForm';

import scss from './Header.module.scss';

const Header = () => {   
    return (
        <header className={scss.header}>
            <div className='container'>
                <nav className={scss.wrraper}>

                    <Logo />

                    <SelectLanguage />

                    <SearchForm />
        
                </nav>
            </div>
        </header>
    );
};

export default Header;