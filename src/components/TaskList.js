import React, { Fragment, useEffect, useState } from 'react'
import {Card, CardContent, Typography, Button} from '@mui/material'

export default function TaskList() {

  const [tasks, setTasks] = useState([])


  const loadTasks = async () => {
    const response = await fetch('http://localhost:4000/tasks')
    const data = await response.json()
    setTasks(data)
  }

  const handleDelete = async (id) => { 
    try {
      const res = await fetch(`http://localhost:4000/tasks/${id}`, {
      method: "DELETE"
    })
    setTasks(tasks.filter(item => item.id !== id))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    loadTasks()
  }, [])


  return (
    <Fragment>
      <h1>Task List</h1>
      {
        tasks && tasks.map(({title, description, id}) => (
          <Card style={{
            marginBottom: ".7rem",
            backgroundColor: '#1e272e'
          }} key={id}>
          <CardContent style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{color: 'white'}}>
              <Typography>{title}</Typography>
              <Typography>{description}</Typography>
            </div>
            <div>
              <Button variant='contained' color='inherit' onClick={() => console.log('edit')}>
                Edit
              </Button>
              <Button variant='contained' color='warning' onClick={() => handleDelete(id)} style={{marginLeft: '.5rem'}}>
                Delete
              </Button>
            </div>
          </CardContent>
        </Card>
        ))
      }
    </Fragment>
  )
}
