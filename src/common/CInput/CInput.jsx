import "./CInput.css"

export const CInput = ({ className,type, placeholder, name, disabled, value, onChangeFunction, onBlurFunction }) => {
    return (
        <input
            className={className}
            type={type}
            placeholder={placeholder}
            name={name}
            disabled={disabled}
            value={value}
            //emit, recibimos la funcion por props que esta en el padre
            onChange={onChangeFunction}
            onBlur={onBlurFunction}
        />
    )
}