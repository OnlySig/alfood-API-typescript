import { useEffect, useState } from 'react';
import IRestaurante from '../../interfaces/IRestaurante';
import style from './ListaRestaurantes.module.scss';
import Restaurante from './Restaurante';
import axios from 'axios';
import { IPaginacao } from '../../interfaces/IPaginacao';
import { Button, TextField } from '@mui/material';
import { CiSearch as BotaoPesquisar } from "react-icons/ci";

const ListaRestaurantes = () => {
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])
  const [proximaPagina, setProximaPagina] = useState('')
  const [previousPagina, setPreviousPagina] = useState('')
  const [searchRestaurante, setSearchRestaurante] = useState<React.SetStateAction<string>>('')
  
  useEffect(()=> {
    axios.get<IPaginacao<IRestaurante>>('http://localhost:8000/api/v1/restaurantes/')
      .then(resp => {
        setRestaurantes(resp.data.results)
        setProximaPagina(resp.data.next)
        setPreviousPagina(resp.data.previous)
      })
  }, [])

  const nextPage = () => {
    axios.get<IPaginacao<IRestaurante>>(proximaPagina)
      .then(resp => {
        setRestaurantes([...restaurantes, ...resp.data.results])
        setPreviousPagina(resp.data.previous)
        setProximaPagina(resp.data.next)
      })
  }

  const previousPage = () => {
    axios.get<IPaginacao<IRestaurante>>(previousPagina)
      .then(resp => {
        setRestaurantes(resp.data.results)
        setPreviousPagina(resp.data.previous)
        setProximaPagina(resp.data.next)
      })
  }

  const pesquisar = () => {
    setRestaurantes(restaurantes.filter(item => item.nome === searchRestaurante))
  }

  return (
    <section className={style.ListaRestaurantes}>
      <div className={style.wrapper__lista}>
        <h1>Os restaurantes mais <em>bacanas</em>!</h1>
        <div className={style.search__lista}>
          <TextField id="outlined-basic" label="Pesquisar" variant="outlined" value={searchRestaurante} onChange={e => setSearchRestaurante(e.target.value)}/>
          <BotaoPesquisar size="24px" onClick={pesquisar}/>
        </div>
      </div>

      {restaurantes?.map(item => <Restaurante restaurante={{...item}} key={item.id} />)}
      {proximaPagina && previousPagina ? <div><Button variant="contained" onClick={previousPage}>Pagina Anterior</Button> <Button variant="contained" onClick={nextPage}>Proxima Pagina</Button></div> : proximaPagina ? <Button variant="contained" onClick={nextPage}>Proxima Pagina</Button> : <Button variant="contained" onClick={previousPage}>Pagina Anterior</Button>}
    </section>
  )
}

export default ListaRestaurantes