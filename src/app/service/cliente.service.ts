import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { Cliente } from '../model/cliente';

@Injectable()
export class ClienteService {

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
                response.map(obj => {
                    // será repetido para cada registro, cada registro do Firestore se chama obj
                    let cliente: Cliente = new Cliente();
                    let id = obj.payload.doc.id;
                    let data = obj.payload.doc.data();
                    cliente.setData(id,data);// obj.payload.doc.data() -> Dados do cliente
                    lista.push(cliente); // adicionando o cliente na lista // push é adicionar
                });
                observe.next(lista);
            })

        }))


 }

}