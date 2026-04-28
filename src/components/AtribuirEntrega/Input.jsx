import React, { useState } from "react";
import ModalConfirmar from "../ModalConfirmarEntrega/index";

export default function Input() {
  const [isModalConfirmarOpen, setIsModalConfirmarOpen] = useState(false);
  const [pedidoId, setPedidoId] = useState("");
  const [entregadorId, setEntregadorId] = useState("");

  function AbrirCaixa() {
    if (!pedidoId || !entregadorId) {
      return;
    }
    setIsModalConfirmarOpen(true);
  }

  return (
    <>
      <div className="Input">
        <form>
          <label className="Titulo-Form">ID do Pedido</label>
          <input
            className="ID-Pedido"
            id="IDPedido"
            type="text"
            placeholder="Insira o ID do Pedido"
            value={pedidoId}
            onChange={(event) => setPedidoId(event.target.value)}
          />

          <label className="Titulo-Form">ID do Entregador</label>
          <input
            className="ID-Entregador"
            id="IDEntregador"
            type="text"
            placeholder="Insira o ID do Entregador"
            value={entregadorId}
            onChange={(event) => setEntregadorId(event.target.value)}
          />

          <div className="Botao">
            <button type="button" onClick={() => AbrirCaixa()}>
              ENVIAR
            </button>
          </div>

          <ModalConfirmar
            isOpen={isModalConfirmarOpen}
            onClose={() => setIsModalConfirmarOpen(false)}
            pedido={pedidoId}
            entregador={entregadorId}
          />
        </form>
      </div>
    </>
  );
}
