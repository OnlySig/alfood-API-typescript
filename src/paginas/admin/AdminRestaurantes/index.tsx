import { useEffect, useState } from "react"
import IRestaurante from "../../../interfaces/IRestaurante"
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import axios from "axios"
import { Link } from "react-router-dom"
const AdminRestaurantes = () => {
    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])
    useEffect(()=> {
        axios.get<IRestaurante[]>('http://localhost:8000/api/v2/restaurantes/')
            .then(resp => setRestaurantes(resp.data))
    }, [])
    const deletaRestaurante = (id: number) => {
        axios.delete<IRestaurante>(`http://localhost:8000/api/v2/restaurantes/${id}/`)
            .then(() => {
                setRestaurantes(restaurantes.filter(item => item.id !== id))
            })
    }
    return(
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Nome
                        </TableCell>
                        <TableCell>
                            Editar
                        </TableCell>
                        <TableCell>
                            Deletar
                        </TableCell>
                        <TableCell>
                            <Link to={'/admin/restaurantes/novo'}><Button variant="contained" color='success'>Novo</Button></Link>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {restaurantes.map(restaurante => 
                        <TableRow key={restaurante.id}>
                            <TableCell>
                                {restaurante.nome}
                            </TableCell>
                            <TableCell>
                                [<Link to={`/admin/restaurantes/${restaurante.id}`}>editar</Link>]
                            </TableCell>
                            <TableCell>
                                <Button variant="outlined" color="error" onClick={() => deletaRestaurante(restaurante.id)}>
                                    Deletar
                                </Button>
                            </TableCell>
                        </TableRow>
                    )}    
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default AdminRestaurantes