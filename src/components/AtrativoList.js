import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Atrativo from '../models/Atrativo'; 

const AtrativoList = ({ destinoId }) => {
  const [atrativos, setAtrativos] = useState([]);

  useEffect(() => {
    const fetchAtrativos = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/destinos/${destinoId}/atrativos`);
        console.log("data atativos: ", response.data);
        const atrativosData = response.data.map(data =>
          new Atrativo(data.id, data.nome, data.tipo, data.descricao, data.dicas)
        );
        setAtrativos(atrativosData);
      } catch (error) {
        console.error('Erro ao buscar atrativos', error);
      }
    };

    fetchAtrativos();
  }, [destinoId]);

  return (
    <div>
      <h2>Atrações</h2>
      <ul>
        {atrativos.map(atrativo => (
          <li key={atrativo.id}>
            <h3>{atrativo.nome}</h3>
            <p>Tipo: {atrativo.tipo}</p>
            <p>{atrativo.descricao}</p>
            <p>Dicas: {atrativo.dicas}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AtrativoList;
