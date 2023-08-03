import scss from './Button.module.scss';

const Button = ({ styles, text, onClick }) => {
    return (
        <button className={[scss.button, styles].join(" ")} onClick={onClick}>
            {text}
        </button>
    )
}

export default Button;