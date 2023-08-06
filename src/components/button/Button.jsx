import scss from './Button.module.scss';

const Button = ({ styles, text, onClick, type = 'button' }) => {
    return (
        <button className={[scss.button, styles].join(" ")} onClick={onClick} type={type}>
            {text}
        </button>
    )
}

export default Button;