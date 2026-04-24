const ProductoForm = ({ form, errors, onChange, onSubmit }) => {
    return (
        <form onSubmit={onSubmit}>
            <input
                className={`form-control mb-1 ${errors.descripcion ? "is-invalid" : ""}`}
                name="descripcion"
                placeholder="Descripcion"
                value={form.descripcion}
                onChange={onChange}
            />
           {errors.descripcion && <div className="invalid-feedback">{errors.descripcion}</div>}

            <input
                className={`form-control mb-1 ${errors.cantidad ? "is-invalid" : ""}`}
                name="cantidad"
                placeholder="Cantidad"
                value={form.cantidad}
                onChange={onChange}
            />
            {errors.cantidad && <div className="invalid-feedback">{errors.cantidad}</div>}

            <input
                className={`form-control mb-1 ${errors.precio ? "is-invalid" : ""}`}
                name="precio"
                placeholder="Precio"
                value={form.precio}
                onChange={onChange}
            />
            {errors.precio && <div className="invalid-feedback">{errors.precio}</div>}



            <button className="btn btn-success w-100" type="submit">
                Guardar
            </button>
        </form>


    )
};

export default ProductoForm;