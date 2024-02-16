import { useEffect, useState } from "react"
import IRestaurante from "../../../interfaces/IRestaurante"
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { Link } from "react-router-dom"
import { httpV2 } from "../../../http"
const AdminRestaurantes = () => {
    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])
    useEffect(()=> {
        httpV2.get<IRestaurante[]>('restaurantes/')
        //captura tudos os restaurantes
            .then(resp => setRestaurantes(resp.data))
    }, [setRestaurantes])
    const deletaRestaurante = (id: number) => {
        httpV2.delete<IRestaurante>(`restaurantes/${id}/`)
        //deleta um elemento tanto na api quanto no site com o filter
            .then(() => setRestaurantes(restaurantes.filter(item => item.id !== id)))
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