import React, { useState } from 'react';
import style from './estilo.module.css';
import caixa from '../../assets/images/icons/caixa.png';
import capacete from '../../assets/images/icons/capacete.png';

export default function ModalConfirmar({ isOpen, onClose, pedido, entregador }) {

    if (!isOpen) return null;

    return (
        <div className={style.modalBackdrop}>

            <dialog className={style.modalConteiner} open>

                <h2 className={style.modalTitulo}>Atribuir Entrega</h2>
                <h3 className={`${style.modalTitulo} ${style.modalSubTitulo}`}>Deseja confirmar esta entrega?</h3>
                <div className={style.IDs}>
                    <div className={style.IDPedido}>
                        <img src={caixa} />
                        <p>ID pedido: #{pedido}</p>
                    </div>
                    <div className={style.IDEntregador}>
                        <img src={capacete} />
                        <p>ID entregador: #{entregador}</p>
                    </div>
                </div>
                <div className={style.modalBotoes}>
                    <button type="button" className={`${style.modalBotaoEnviar} ${style.cancelar}`} onClick={onClose}>CANCELAR</button>
                    <button type="submit" className={style.modalBotaoEnviar}>CONFIRMAR</button>
                </div>

            </dialog>
        </div>
    );
};