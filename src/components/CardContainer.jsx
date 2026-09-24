
// Caja / layout de una card del bento grid.
    export const CardContainer = ({ id, col, row, bg, radius = 20, className = '', children }) => {
    return (
        <section
            id={id}
            className={`bento-card overflow-hidden ${className}`}
            style={{
                '--col': col,
                '--row': row,
                '--card-bg': bg,
                borderRadius: radius,
            }}
        >
            {children}
        </section>
    )
}
