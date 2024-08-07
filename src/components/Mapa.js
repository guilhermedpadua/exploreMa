import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import AtrativoList from './AtrativoList';
import Modal from 'react-modal';
import './Mapa.css';

Modal.setAppElement('#root');

const customIcon = L.icon({
  iconUrl: 'URL_DO_ICONE_PERSONALIZADO', 
  iconSize: [25, 41], 
  iconAnchor: [12, 41], 
  popupAnchor: [1, -34], 
  shadowSize: [41, 41] 
});

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
      <div className="info-message">
        Clique no marcador no mapa para ver os atrativos deste destino.
      </div>
      <MapContainer center={[destino.latitude, destino.longitude]} zoom={12} style={{ height: "500px", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker 
          position={[destino.latitude, destino.longitude]} 
          icon={customIcon}
          eventHandlers={{
            click: openModal
          }}
        />
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
