// Caja / layout de una card del bento grid.
// Si la card tiene un encabezado propio (labelledBy), se renderiza como <section>
// con nombre accesible; si no, como <div> genérico.
export const CardContainer = ({ id, col, row, bg, radius = 20, labelledBy, className = '', children }) => {
    const Tag = labelledBy ? 'section' : 'div'

    return (
        <Tag
            id={id}
            aria-labelledby={labelledBy}
            className={`bento-card overflow-hidden ${className}`}
            style={{
                '--col': col,
                '--row': row,
                '--card-bg': bg,
                borderRadius: radius,
            }}
        >
            {children}
        </Tag>
    )
}
