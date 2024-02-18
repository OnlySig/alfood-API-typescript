import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { useEffect, useState } from "react"
import { httpV2 } from "../../../http"
import { Link } from "react-router-dom"
import IPrato from "../../../interfaces/IPrato"

const AdminPratos = () => {
    const [pratos, setPratos] = useState<IPrato[]>([])
    useEffect(() => {
        httpV2.get<IPrato[]>('pratos/')
            .then(resp => setPratos(resp.data))
    },[setPratos])

    const deletar = (pratoRemovido: IPrato) => {
        httpV2.delete(`pratos/${pratoRemovido.id}/`)
            .then(() => setPratos(pratos.filter(prato => prato.id !== pratoRemovido.id)))
    }

    return(
        <>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                Nome do Prato
                            </TableCell>
                            <TableCell>
                                Editar
                            </TableCell>
                            <TableCell>
                                Deletar
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {pratos.map(item => 
                            <TableRow key={item.id}>
                                <TableCell>
                                    {item.nome}
                                </TableCell>
                                <TableCell>
                                    {<Link to={`${item.id}`}>editar</Link>}
                                </TableCell>
                                <TableCell>
                                    <Button variant="outlined" color="error" onClick={()=>deletar(item)}>deletar</Button>
                                </TableCell>
                            </TableRow>    
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default AdminPratos