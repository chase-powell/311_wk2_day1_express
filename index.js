
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 4000
app.use(bodyParser.json())
const { users } = require('./state')

/* BEGIN - create routes here */
app.get('/', (req,res) => {
  res.send('welcome')
})
app.get('/users', (req,res) => {
  res.json(users)
})
app.get('/users/:id', (req,res) => {
  res.send(users.filter(user => user._id == req.params.id))
})
//Post request*****
app.post('/users', (req,res) => {
  const counter = users.length+1
  const newUser = {
      "_id": counter,
      "name": req.body.name,
      "occupation": req.body.occupation,
      "avatar": req.body.avatar 
  }
  users.push(newUser)
  res.json(users)
})
//Put request****
app.put('/users/:id', (req,res) => {
  const editUser = {
    "name": "Mason Cooper",
    "occupation": "Mechanic"
}
users.forEach(user => {
  if(user._id === parseInt(req.params.id)){user.name = editUser.name, 
  user.occupation = editUser.occupation}
})
  res.json(users)
})
//Delete request
app.delete('/users/:id', (req,res) => {
  users.shift()
  res.json({
    isActive: 'false',
    user: users.filter(user => user._id !== req.params.id)
  })

})

/* END - create routes here */

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))