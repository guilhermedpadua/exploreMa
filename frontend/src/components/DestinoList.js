import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Mapa from "./Mapa";
import Destino from '../models/destino';
import './DestinoList.css'; 

const DestinoList = () => {
  const [destinos, setDestinos] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredDestinos, setFilteredDestinos] = useState([]);
  const [selectedDestino, setSelectedDestino] = useState(null);

  useEffect(() => {
    const fetchDestinos = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/destinos');
        const destinosData = response.data.map(data =>
          new Destino(data.id, data.nome, data.descricao, data.latitude, data.longitude, data.localizacao)
        );
        setDestinos(destinosData);
        setFilteredDestinos(destinosData); 
      } catch (error) {
        console.error('Erro ao buscar destinos', error);
      }
    };

    fetchDestinos();
  }, []);

  const handleSearch = () => {
    const filtered = destinos.filter(destino =>
      destino.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
      destino.localizacao.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredDestinos(filtered);
  };

  const handleDestinoClick = (destino) => {
    setSelectedDestino(destino);
  };

  return (
    <div className="destino-list-container">
      {selectedDestino ? (
        <div className="map-container">
          <button className="back-button" onClick={() => setSelectedDestino(null)}>Voltar</button>
          <Mapa destino={selectedDestino} />
        </div>
      ) : (
        <div className="destino-list">
          <h1>Explore ~]ç]Maranhão</h1>
          <div className="search-container">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por nome ou região"
            />
            <button onClick={handleSearch}>Buscar</button>
          </div>
          <ul>
            {filteredDestinos.map(destino => (
              <li key={destino.id} onClick={() => handleDestinoClick(destino)}>
                <h2>{destino.nome}</h2>
                <p>{destino.descricao}</p>
                <p>Localização: {destino.localizacao}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DestinoList;
