import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import { useNavigate, useParams } from "react-router-dom"
import { httpV2 } from "../../../http"
import { useEffect, useState } from "react"
import IRestaurante from "../../../interfaces/IRestaurante"
import ITag from "../../../interfaces/ITag"

const FormPrato = () => {
    const {id} = useParams()
    const [restaurante, setRestaurante] = useState<IRestaurante[]>([])
    const [tags, setTags] = useState<ITag[]>([])
    const [tagData, setTagData] = useState('')
    const [nomePrato, setNomePrato] = useState('')
    const [descricao, setDescricao] = useState('')
    const [seletor, setSeletor] = useState('')
    const [imagem, setImagem] = useState<File | null >(null)

    const nav = useNavigate()
    const limpar = () => {
        setNomePrato('')
        setDescricao('')
        setTagData('')
        setSeletor('')
        setImagem(null)
    }
    useEffect(()=> {
        httpV2.get('restaurantes/')
            .then(resp => {
                setRestaurante(resp.data)
                limpar()
            })

        httpV2.get('tags/')
            .then(resp => setTags(resp.data.tags))
        if(id) {
            httpV2.get(`pratos/${id}/`)
                .then(resp => {
                    setNomePrato(resp.data.nome)
                    setDescricao(resp.data.descricao)
                    setTagData(resp.data.tag)
                    setSeletor(resp.data.restaurante)
                    setImagem(resp.data.imagem)
                })
        }
    }, [id])
    const voltar = () => {
        nav(-1)
    }
    const submitar = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('nome', nomePrato)
        formData.append('descricao', descricao)
        formData.append('tag', tagData)
        formData.append('restaurante', seletor)
        if(imagem)formData.append('imagem', imagem)
        let url = 'pratos/'
        let method = 'POST'
        if(id){
            url = `${id}/`
            method = 'PUT'
        }
        httpV2.request({
            url,
            method,
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data: formData
        })
        .then(() => alert(`Prato ${nomePrato} criado com sucesso!`))
        .catch(erro=>console.log(erro))
        voltar()
    }
    const selectArquivo = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files?.length){
            setImagem(e.target.files[0])
        } else {
            setImagem(null)
        }
    }
    const url = JSON.stringify(imagem) 
    return (
        <>
            <Box>
                <Button variant="outlined" onClick={voltar}>{'< voltar'}</Button>
                <Typography component="h1" variant="h6">Formulário de Prato</Typography>
                <Box component="form" onSubmit={submitar}>
                    <TextField  label="Nome do Prato" variant="standard" value={nomePrato} onChange={e => setNomePrato(e.target.value)} fullWidth margin="dense"/>
                    <TextField  label="Descrição" variant="standard" value={descricao} onChange={e => setDescricao(e.target.value)} fullWidth margin="dense"/>
                    <FormControl fullWidth margin="dense">
                        <InputLabel id="demo-simple-select-label">Categoria</InputLabel>
                        <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Categoria" value={tagData} onChange={e=>setTagData(e.target.value)}>
                            {tags?.map(item => 
                                <MenuItem key={item.id} value={item.value}>{item.value}</MenuItem>    
                            )}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth margin="dense">
                        <InputLabel id="demo-simple-select-label">Restaurante</InputLabel>
                        <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Restaurante" value={seletor} onChange={e=>setSeletor(e.target.value)}>
                            {restaurante?.map(item => 
                                <MenuItem key={item.id} value={item.id}>{item.nome}</MenuItem>    
                            )}
                        </Select>
                    </FormControl>
                    <input type="file" name="" id="" onChange={selectArquivo} />
                    <img src={imagem ? JSON.parse(url) : ''} alt="" />
                    <Button type="submit" variant="contained">Salvar</Button>
                </Box>
            </Box>
        </>
    )
}

export default FormPrato