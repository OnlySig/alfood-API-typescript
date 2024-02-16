import { Box, Button, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import IRestaurante from "../../../interfaces/IRestaurante"
import { httpV2 } from "../../../http"
import styles from './styles.module.scss'

const FormAddRestaurante = () => {
    const nav = useNavigate()
    const { id } = useParams()
    const [nomeRestaurante, setNomeRestaurante] = useState('') 
    useEffect(()=>{
        if (id) {
            //captura o nome do restaurante se existir ID
            httpV2.get<IRestaurante>(`restaurantes/${id}/`)
                .then(resp => {
                    setNomeRestaurante(resp.data.nome)
                })
                .catch(erro => {
                    if(erro.response.status) {
                        nav(-1)
                    }
                })

        }
    },[id, nav])
    const voltar = () => {
        nav(-1)
    }
    const aoSubmitar = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(id){
            //edita nome do restaurante
            httpV2.put(`restaurantes/${id}/`, {
                nome: nomeRestaurante
            })

        } else {
            //cria restaurante
            httpV2.post('restaurantes/', {
                nome: nomeRestaurante
            })
        }
        voltar()
    }
    return(
        <Box className={styles.containerCard}>
            <Button variant="outlined" className={styles.voltar} color="secondary" onClick={voltar}>{'< voltar'}</Button>
            <Typography component="h1" variant="h6">Formulário de Restaurantes</Typography>
            <Box component='form' onSubmit={aoSubmitar} className="">
                <TextField id="standard-basic" label="Nome do Restaurante" variant="standard" value={nomeRestaurante} onChange={e => setNomeRestaurante(e.target.value)} fullWidth required/>
                <Button type="submit" variant="outlined" fullWidth>Salvar</Button>
            </Box>
        </Box>
    )
}

export default FormAddRestaurante