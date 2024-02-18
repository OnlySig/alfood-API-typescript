import { AppBar, Box, Button, Container, Link, Toolbar, Typography } from "@mui/material"
import { Link as Linkar } from "react-router-dom" 
import styles from './style.module.scss'
import { useState } from "react"
const HeaderAdmin = () => {
    const [mobileButton, setMobileButton] = useState(false)
    const toggleMb = () => setMobileButton(!mobileButton)
    return(
        <>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar className={styles.mobile}>
                        <Typography variant="h6">Administração</Typography>
                        <button className={styles.mb} onClick={toggleMb}>X</button>
                        <Box className={`${styles.mobile__Container} ${mobileButton ? styles.dflex : ''}`} >
                            <Link component={Linkar} to={'/admin/restaurantes/'}>
                                <Button sx={{ my:2, color:'white' }}>Restaurantes</Button>
                            </Link>
                            <Link component={Linkar} to={'/admin/restaurantes/novo'}>
                                <Button sx={{ my:2, color:'white' }}>Novo restaurante</Button>
                            </Link>
                            <Link component={Linkar} to={'/admin/pratos'}>
                                <Button sx={{ my:2, color:'white' }}>Pratos</Button>
                            </Link>
                            <Link component={Linkar} to={'/admin/pratos/novo'}>
                                <Button sx={{ my:2, color:'white' }}>Novo Prato</Button>
                            </Link>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </>
    )
}
export default HeaderAdmin