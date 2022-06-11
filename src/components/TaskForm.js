import { Grid, Typography, Card, CardContent, TextField, Button, CircularProgress } from '@mui/material'
import React, { useState, useEffect } from 'react'
import {useNavigate} from 'react-router-dom'

export default function TaskForm() {

    const [task, setTask] = useState({title: '', description: ''})
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault()

        setLoading(true)

        const res = await fetch('http://localhost:4000/tasks', {
            method: 'POST',
            body: JSON.stringify(task),
            headers: {'Content-Type': 'application/json'}
        })
        const data = await res.json()
        
        setLoading(false)

        navigate('/')
    }

    const handleChange = (event) => {
        setTask({...task, [event.target.name]: event.target.value})
    }

  return (
    <Grid container style={{direction:'colum', alignItems:'center', justifyContent:'center'}}>
        <Grid  item xs={3}>
            <Card sx={{mt:5}} style={{backgroundColor:'#1e272e', padding:'1rem'}}>
                <Typography variant='5' color='white' style={{textAling:'center'}}>
                    Create Task
                </Typography>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <TextField 
                            variant='filled'
                            label='Write your title'
                            sx={{
                                display: 'block',
                                margin: '0.5rem 0'
                            }}
                            name='title'
                            onChange={handleChange}
                            inputProps={{style: {color: 'white'}}}
                            InputLabelProps={{style: {color: 'white'}}}
                        />
                        <TextField 
                            variant='filled'
                            label='Write your description'
                            multiline
                            rows={4}
                            sx={{
                                display: 'block',
                                margin: '0.5rem 0'
                            }}

                            name='description'
                            onChange={handleChange}
                            inputProps={{style: {color: 'white'}}}
                            InputLabelProps={{style: {color: 'white'}}}
                        />

                        <Button variant='contained' color='primary' type='submit' disabled={!task.title || !task.description}>
                            {loading ? (<CircularProgress color='inherit' size={24} />) : ('Create')}
                        </Button>

                    </form>
                </CardContent>
            </Card>
        </Grid>
    </Grid>
  )
}
