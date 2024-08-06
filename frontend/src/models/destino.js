class Destino {
    constructor(id, nome, descricao, latitude, longitude, localizacao) {
      this.id = id;
      this.nome = nome;
      this.descricao = descricao;
      this.latitude = parseFloat(latitude); 
      this.longitude = parseFloat(longitude); 
      this.localizacao = localizacao; 
    }
  }
  
  export default Destino;
  