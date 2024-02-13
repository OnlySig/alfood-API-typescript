import axios from 'axios';
import IRestaurante from '../../../interfaces/IRestaurante';
import Prato from '../Prato';
import estilos from './Restaurante.module.scss';
import { useEffect, useState } from 'react';
import IPrato from '../../../interfaces/IPrato';
import { IPaginacao } from '../../../interfaces/IPaginacao';

interface RestauranteProps {
  restaurante: IRestaurante
}

const Restaurante = ({ restaurante }: RestauranteProps) => {
  const [pratos, setPratos] = useState<IPrato[]>([])
  const [nextPg , setNextPg] = useState<IPaginacao<IPrato>>()
  useEffect(()=> {
    axios.get(`http://localhost:8000/api/v1/restaurantes/${restaurante.id}/pratos/`)
      .then(resp => {
        setPratos(resp.data)
        setNextPg(resp.data)
      }) 
    }, [restaurante.id])

  useEffect(()=>{
    if(nextPg?.next) {
      axios.get<IPaginacao<IPrato>>(nextPg.next)
        .then(resp => {
          setPratos([...pratos, ...resp.data.results])
          setNextPg(resp.data)
        })
    }
  }, [nextPg])
  //const pratosFiltrados = pratos.filter(prato => prato.restaurante === restaurante.id)
  return (
    <section className={estilos.Restaurante}>
      <div className={estilos.Titulo}>
        <h2>{restaurante.nome}</h2>
      </div>
      <div>
        {pratos?.map(item => <Prato prato={{...item}} key={item.id} />)}
      </div>
    </section>
  )
}

export default Restaurante