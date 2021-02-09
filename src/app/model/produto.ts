export class Produto{
    id : string;
    nome : string;
    preco : string;
    marca : string;
    departamento : string;

    setData(id : any, data: any){
        this.id = id;
        this.nome = data.nome;
        this.preco = data.preco;
        this.marca = data.marca;
        this.departamento = data.departamento;
    }
}