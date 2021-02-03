export class Cliente{

    id : string;
    cidade: string;
    cpf: string;
    email: string;
    endereco: string;
    estado: string;
    nome: string;
    numero: string;
    telefone: string;

    setData(id : any, data : any){
        this.id = id;
        this.cidade = data.cidade;
        this.cpf = data.cpf;
        this.email = data.email;
        this.endereco = data.endereco;
        this.nome = data.nome;
        this.numero = data.numero;
        this.telefone = data.telefone;
        this.estado = data.estado;
    }

}