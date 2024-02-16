import IRestaurante from '../../../interfaces/IRestaurante';
import Prato from '../Prato';
import estilos from './Restaurante.module.scss';
import { useEffect, useState } from 'react';
import IPrato from '../../../interfaces/IPrato';
import { httpV1 } from '../../../http';

interface RestauranteProps {
  restaurante: IRestaurante
}

const Restaurante = ({ restaurante }: RestauranteProps) => {
  const [pratos, setPratos] = useState<IPrato[]>([])
  useEffect(()=> {
    httpV1.get(`restaurantes/${restaurante.id}/pratos/`)
      .then(resp => {
        setPratos(resp.data)
      }) 
    }, [restaurante.id])
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