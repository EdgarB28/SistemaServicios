const ClienteForm = ({ form, errors, onChange, onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <input
        className={`form-control mb-1 ${errors.nombre ? "is-invalid" : ""}`}
        name="nombre"
        placeholder="Nombre"
        value={form.nombre}
        onChange={onChange}
      />
      {errors.nombre && <div className="invalid-feedback">{errors.nombre}</div>}

      <input
        className={`form-control mb-1 ${errors.apellidos ? "is-invalid" : ""}`}
        name="apellidos"
        placeholder="Apellidos"
        value={form.apellidos}
        onChange={onChange}
      />
      {errors.apellidos && <div className="invalid-feedback">{errors.apellidos}</div>}

      <input
        className={`form-control mb-1 ${errors.nroDocumento ? "is-invalid" : ""}`}
        name="nroDocumento"
        placeholder="Documento"
        value={form.nroDocumento}
        onChange={onChange}
      />
      {errors.nroDocumento && <div className="invalid-feedback">{errors.nroDocumento}</div>}

      <input
        className={`form-control mb-1 ${errors.correo ? "is-invalid" : ""}`}
        name="correo"
        placeholder="Correo"
        value={form.correo}
        onChange={onChange}
      />
      {errors.correo && <div className="invalid-feedback">{errors.correo}</div>}

      <input
        className={`form-control mb-1 ${errors.telefono ? "is-invalid" : ""}`}
        name="telefono"
        placeholder="Teléfono"
        value={form.telefono}
        onChange={onChange}
      />
      {errors.telefono && <div className="invalid-feedback">{errors.telefono}</div>}

      <button className="btn btn-success w-100" type="submit">
        Guardar
      </button>
    </form>
  );
};

export default ClienteForm;