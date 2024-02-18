import { useEffect, useState } from 'react';
import IRestaurante from '../../interfaces/IRestaurante';
import style from './ListaRestaurantes.module.scss';
import Restaurante from './Restaurante';
import axios, { AxiosRequestConfig } from 'axios';
import { IPaginacao } from '../../interfaces/IPaginacao';
import { Button, MenuItem, Select, TextField } from '@mui/material';

const ListaRestaurantes = () => {
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])
  const [proximaPagina, setProximaPagina] = useState('')
  const [previousPagina, setPreviousPagina] = useState('')
  const [searchRestaurante, setSearchRestaurante] = useState<string>('')
  const [ordenador, setOrdenador] = useState('')
  
  const selector = [{
    id: 'letra',
    label: 'ordem alfabética'
  }, {
    id: 'numero',
    label: 'ordem numérica'
  }]

  const carregarDados = (url: string, opcoes: AxiosRequestConfig = {}) => {
    axios.get<IPaginacao<IRestaurante>>(url, opcoes)
      .then(resp => {
        setRestaurantes(resp.data.results)
        setProximaPagina(resp.data.next)
        setPreviousPagina(resp.data.previous)
      })
  }

  const pesquisar = (restaurante: string) => {
    const regex = new RegExp(searchRestaurante, 'i')
    return regex.test(restaurante)
  }

  useEffect(()=> {
    carregarDados('http://localhost:8000/api/v1/restaurantes/')
  }, [])

  useEffect(() => {
    //a logica ta bem zuada, mas ta funcionando, graças a Deus!
    if(ordenador === 'letra') {
      const novaLista = restaurantes.sort((a, b) => a.nome > b.nome ? 1 : -1)
      setRestaurantes([...novaLista])
    } else if(ordenador === 'numero') {
      const novaLista = restaurantes.sort((a,b) => a.id < b.id ? 1 : -1)
      setRestaurantes([...novaLista])
    }
    if(searchRestaurante){
      setRestaurantes(restaurantes.filter(item => pesquisar(item.nome)))
    }
    if(searchRestaurante.length <= 0) {
      carregarDados('http://localhost:8000/api/v1/restaurantes/')
    }

  },[searchRestaurante, ordenador])
  return (
    <section className={style.ListaRestaurantes}>
      <div className={style.wrapper__lista}>
        <h1>Os restaurantes mais <em>bacanas</em>!</h1>
          <div className={style.filtros}>
            <TextField id="outlined-basic" label="Pesquisar" variant="outlined" value={searchRestaurante} onChange={e => setSearchRestaurante(e.target.value)}/>
            <Select value={ordenador} onChange={e => setOrdenador(e.target.value)}>
              {selector.map(opcao => 
                <MenuItem key={opcao.id} value={opcao.id}>
                  <em>{opcao.label}</em>
                </MenuItem>)}
            </Select>
          </div>
      </div>
      {restaurantes.length > 0 ? restaurantes?.map(item => <Restaurante restaurante={{...item}} key={item.id} />) : <h1>Não existe nada aqui!</h1>}
      <div className={style.button__container}>
        {restaurantes.length > 0 ? <Button variant="contained" onClick={()=>carregarDados(previousPagina)} disabled={!previousPagina}>Pagina Anterior</Button> : ''}
        {restaurantes.length > 0 ? <Button variant="contained" onClick={()=>carregarDados(proximaPagina)} disabled={!proximaPagina}>Proxima Pagina</Button> : ''}
      </div>
    </section>
  )
}

export default ListaRestaurantes