import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { from, Observable } from "rxjs";
import { Produto } from "../model/produto";

@Injectable()
export class ProdutoService{

    constructor(private firestore : AngularFirestore){}

    cadastrar(produto: any) : Observable<any>{ // Função cadastro
        return from(new Observable(observe=>{ // Converte para Observable

            //codigo -> Inicia o cadastro
            this.firestore.collection('produto').add(produto).then(response=>{
                observe.next("Cadastrado com sucesso");
            }).catch(err=>{
                console.log(err);
                observe.next("Erro ao cadastrar");
            })
            // fim codigo
        }))
    }
// cadastro(produto : any) : Observable<any>{ // Função cadastro
//         return from(new Observable(observe=>{ // Converte para Observable

//             //codigo -> Inicia o cadastro
//             this.firestore.collection('produto').add(produto).then(response=>{
//                 observe.next("Cadastrado com sucesso");
//             }).catch(err=>{
//                 console.log(err);
//                 observe.next("Erro ao cadastrar");
//             })
//             // fim codigo
//         }))
//     }

    listaDeProdutos(): Observable<any>{

        return from(new Observable(observe=>{ // Converte para Observable
            
            this.firestore.collection('produto').snapshotChanges().subscribe(response=>{ 
                
                let lista : Produto[] = []; // iniciar uma lista vazia  

                // converter o response em objetos produto
                response.map(obj=>{ 
                    // dados do produto
                    let data = obj.payload.doc.data();
                    let id = obj.payload.doc.id;

                    // dados do produto no objeto produto
                    let produto : Produto = new Produto();
                    produto.setData(id,data);
                    lista.push(produto); // adicionando o produto na lista

                })

                observe.next(lista);
            })


        }))  
    }

    buscarPorId(id : any): Observable<any>{
        return from(new Observable(observe=>{ // Converte para Observable

            this.firestore.collection('produto').doc(id).snapshotChanges().subscribe(response=>{
                
                let data = response.payload.data();
                let id = response.payload.id;

                // dados do produto no objeto produto
                let produto : Produto = new Produto();
                produto.setData(id,data);

                observe.next(produto);
            },err=>{
                observe.next(null);
            })

        }))
    }


    atualizar(id : any, dados : any): Observable<any>{
        return from(new Observable(observe=>{ // Converte para Observable
       
            this.firestore.collection('produto').doc(id).set(dados).then(response=>{
                observe.next("Atualizado com sucesso");
            },err=>{
                observe.next("Erro ao atualizar");
            })
                    
        }))

    }

    excluir(id : any): Observable<any>{
        return from(new Observable(observe=>{ // Converte para Observable

            this.firestore.collection('produto').doc(id).delete().then(response=>{
                observe.next("Excluído com sucesso");
            },err=>{
                observe.next("Erro ao atualizar");
            })
        })) 
    }
}