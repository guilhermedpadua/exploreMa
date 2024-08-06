import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import AtrativoList from './AtrativoList';
import Modal from 'react-modal';
import './Mapa.css';

Modal.setAppElement('#root');

const Mapa = ({ destino }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  if (!destino || destino.latitude === undefined || destino.longitude === undefined) {
    return <div>Não há dados suficientes para exibir o mapa.</div>;
  }

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      <MapContainer center={[destino.latitude, destino.longitude]} zoom={12} style={{ height: "500px", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={[destino.latitude, destino.longitude]} eventHandlers={{ click: openModal }}>
        </Marker>
      </MapContainer>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Detalhes do Destino"
        className="modal"
        overlayClassName="overlay"
      >
        <button onClick={closeModal} className="close-button">X</button>
        <h2>{destino.nome}</h2>
        <p>{destino.descricao}</p>
        <AtrativoList destinoId={destino.id} />
      </Modal>
    </div>
  );
};

export default Mapa;
