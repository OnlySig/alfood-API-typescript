import { Button, TextField } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import IRestaurante from "../../../interfaces/IRestaurante"

const FormAddRestaurante = () => {
    const { id } = useParams()
    const [nomeRestaurante, setNomeRestaurante] = useState('') 

    useEffect(()=>{
        if (id) {
            axios.get<IRestaurante>(`http://localhost:8000/api/v2/restaurantes/${id}/`)
                .then(resp => setNomeRestaurante(resp.data.nome))
        }
    },[id])

    const aoSubmitar = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(id){
            axios.put(`http://localhost:8000/api/v2/restaurantes/${id}/`, {
                nome: nomeRestaurante
            })
                .then(() => alert('restaurante atualizado com sucesso'))
        } else {
            axios.post('http://localhost:8000/api/v2/restaurantes/', {
                nome: nomeRestaurante
            })
                .then(() => alert('restaurante registrado com sucesso'))
        }
    }
    return(
        <form onSubmit={aoSubmitar}>
            <TextField id="standard-basic" label="Nome do Restaurante" variant="standard" value={nomeRestaurante} onChange={e => setNomeRestaurante(e.target.value)}/>
            <Button type="submit" variant="outlined">Salvar</Button>
        </form>
    )
}

export default FormAddRestaurante