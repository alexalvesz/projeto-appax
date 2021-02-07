import { Injectable } from '@angular/core';
import { from, observable, Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { Cliente } from '../model/cliente';

@Injectable()
export class ClienteService {
    atualizar(id: string, value: any) {
      throw new Error('Method not implemented.');
    }

    constructor(private firestore: AngularFirestore) {
    }

    cadastrar(cliente: any): Observable<any> {
        return from(new Observable(observe => {

            this.firestore.collection('cliente').add(cliente).then(response => {
                observe.next("Cadastrado com sucesso!");
            }, (err) => {
                observe.error("Erro ao cadastrar!");
            })

        }))
    }

    listaDeClientes(): Observable<any> {

        // Observable -> Aguardar resposta do servidor
        return from(new Observable(observe => { // converter para Observable

            // this.firestore.collection('cliente') -> Selecionar a coleção no Firestore
            // .snapshotChanges().subscribe -> Tentar buscar no servidor
            // response -> dados baixados do servidor, os clientes
            this.firestore.collection('cliente').snapshotChanges().subscribe(response => {
                // transformar response em array de clientes
                let lista: Cliente[] = [];

                //converter o response em obejtos clientes
                response.map(obj => {
                    // Dados do cliente
                    let data = obj.payload.doc.data();
                    let id = obj.payload.doc.id;


                    // Dados do cliente no objeto Cliente
                    let cliente: Cliente = new Cliente();
                    cliente.setData(id, data);// obj.payload.doc.data() -> Dados do cliente
                    lista.push(cliente); // adicionando o cliente na lista // push é adicionar
                })
                observe.next(lista);
            })

        }))
    }

    buscarPorId(id : any): Observable<any>{

        return from(new Observable(observe=>{ // Converte para Observable

            this.firestore.collection('cliente').doc(id).snapshotChanges().subscribe(response=>{

                let data = response.payload.data();

                let id = response.payload.id;

                // dados do cliente no objeto CLiente

                let cliente : Cliente = new Cliente();

                cliente.setData(id,data);

                observe.next(cliente);

            },err=>{

                observe.next(null);

            })

        }))
    }    
    }