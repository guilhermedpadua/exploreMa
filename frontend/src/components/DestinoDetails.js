// src/components/DestinoDetails.js
import React, { useEffect, useState } from 'react';
import api from '../services/api';
import AtrativoList from './atrativoList';

const DestinoDetails = ({ match }) => {
  const [destino, setDestino] = useState(null);
  const destinoId = match.params.id;

  useEffect(() => {
    const fetchDestino = async () => {
      try {
        const response = await api.get(`/destinos/${destinoId}`);
        setDestino(response.data);
      } catch (error) {
        console.error('Erro ao buscar destino', error);
      }
    };

    fetchDestino();
  }, [destinoId]);

  if (!destino) return <div>Carregando...</div>;

  return (
    <div>
      <h1>{destino.nome}</h1>
      <p>{destino.descricao}</p>
      <p>Localização: {destino.localizacao}</p>
      <AtrativoList destinoId={destinoId} />
    </div>
  );
};

export default DestinoDetails;
