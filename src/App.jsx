import React, { useState, useEffect } from "react";
import { Button, Form, ListGroup, Modal } from "react-bootstrap"; // Importación de componentes de Bootstrap

function App() {

  const [tareas, setTareas] = useState([])
  const [nuevaTarea, setNuevaTarea] = useState({nombre: "", descripcion: "", prioritaria: false})
  const [mostrarModal, setMostrarModal] = useState(false)
  const [editandoTarea, setEditandoTarea] = useState(null)
  
  //Cargar tareas en el localStorage
  useEffect(() => {
    const tareasGuardadas = JSON.parse(localStorage.getItem("tareas"))
    if (tareasGuardadas) setTareas(tareasGuardadas)
  }, [])

  //Guardar tareas en localStorage
  useEffect(() => {
    localStorage.setItem("tareas", JSON.stringify(tareas))
  }, [tareas])

  //Añadir tarea
  const anadirTarea = () => {
    if(nuevaTarea.nombre.trim() === "") return;
    const tarea = {...nuevaTarea, id: Date.now(), completa: false}
    setTareas([...tareas, tarea])
    setNuevaTarea({nombre: "", descripcion: "", prioritaria: false})
  }

  //Eliminar Tarea
  const eliminarTarea = (id) => {
    setTareas(tareas.filter((tarea) => tarea.id !== id))
  }

  //Completar o No Completar tarea
  const toggleCompletarTarea = (id) => {
    setTareas(tareas.map(tarea => tarea.id === id ? {...tarea, completa: !tarea.completa } : tarea))
  }

  //Editar Tarea (modal)
  const editarTarea = (tarea) => {
    setEditandoTarea(tarea)
    setMostrarModal(true)
  }

  //Guardar edicion de tarea
  const guardarTareaEditada = () => {
    setTareas(tareas.map(tarea => tarea.id === editandoTarea.id ? editandoTarea : tarea))
    setMostrarModal(false)
  }

  //Ordenar las tareas: prioritaria pendiente, no prioritaria pendiente, completas
  const tarasOrdenadas = tareas.sort((a, b) => {
    if (a.completa !== b.completa) return a.completa ? 1 : -1
    if (a.prioritaria !== b.prioritaria) return a.prioritaria ? -1 : 1
    return 0
  })


  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Lista de Tareas</h2>

      {/* Formulario para añadir tareas */}
      <Form className="mb-4">
        <Form.Group controlId="nombreTarea">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nombre de la tarea"
            value={nuevaTarea.nombre}
            onChange={(e) => setNuevaTarea({ ...nuevaTarea, nombre: e.target.value })}
          />
        </Form.Group>

        <Form.Group controlId="descripcionTarea" className="mt-2">
          <Form.Label>Descripción</Form.Label>
          <Form.Control
            type="text"
            placeholder="Descripción de la tarea"
            value={nuevaTarea.descripcion}
            onChange={(e) => setNuevaTarea({ ...nuevaTarea, descripcion: e.target.value })}
          />
        </Form.Group>

        <Form.Group controlId="prioridadTarea" className="mt-2">
          <Form.Check
            type="checkbox"
            label="Prioritaria"
            checked={nuevaTarea.prioritaria}
            onChange={(e) => setNuevaTarea({ ...nuevaTarea, prioritaria: e.target.checked })}
          />
        </Form.Group>

        <Button className="mt-3" variant="primary" onClick={anadirTarea}>Añadir Tarea</Button>
      </Form>

      {/* Listado de tareas */}
      <ListGroup>
        {tarasOrdenadas.map((tarea) => (
          <ListGroup.Item
            key={tarea.id}
            className={`d-flex justify-content-between align-items-center ${tarea.completa ? "text-decoration-line-through" : ""}`}
          >
            <div>
              <strong>{tarea.nombre}</strong> - {tarea.descripcion}{" "}
              {tarea.prioritaria && <span className="badge bg-warning text-dark">Prioritaria</span>}
            </div>
            <div>
              <Button variant="success" className="me-2" onClick={() => toggleCompletarTarea(tarea.id)}>
                {tarea.completa ? "Descompletar" : "Completar"}
              </Button>
              <Button variant="warning" className="me-2" onClick={() => editarTarea(tarea)}>
                Editar
              </Button>
              <Button variant="danger" onClick={() => eliminarTarea(tarea.id)}>
                Eliminar
              </Button>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>

      {/* Modal para editar tarea */}
      <Modal show={mostrarModal} onHide={() => setMostrarModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Tarea</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="editarNombreTarea">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                value={editandoTarea?.nombre || ""}
                onChange={(e) => setEditandoTarea({ ...editandoTarea, nombre: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="editarDescripcionTarea" className="mt-2">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                type="text"
                value={editandoTarea?.descripcion || ""}
                onChange={(e) => setEditandoTarea({ ...editandoTarea, descripcion: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="editandoPrioridadTarea" className="mt-2">
              <Form.Check
                type="checkbox"
                label="Prioritaria"
                checked={editandoTarea?.prioritaria || false}
                onChange={(e) => setEditandoTarea({ ...editandoTarea, prioritaria: e.target.checked })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setMostrarModal(false)}>Cancelar</Button>
          <Button variant="primary" onClick={guardarTareaEditada}>Guardar Cambios</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default App
