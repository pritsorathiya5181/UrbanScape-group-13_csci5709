import React from 'react'
import styled from 'styled-components'

const Title = styled.h1`
  color: white;
  margin-bottom: 20px;
`

const Button = styled.button`
  border: none;
  padding: 15px 25px;
  background-color: #0d47a1;
  color: white;
  cursor: pointer;
  font-weight: 600;
  border-radius: 5px;
`

const Text = styled.p`
  color: white;
  width: 50%;
  text-align: center;
  font-weight: bold;
`

const CategoryItem = ({ item }) => {
  return (
    <div
      style={{
        flex: 1,
        margin: '3px',
        heigth: '140px',
        position: 'relative',
      }}
    >
      <img
        src={item.image}
        alt=''
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Title>{item.name}</Title>
        <Text>{item.description}</Text>
        <Button>BOOK NOW</Button>
      </div>
    </div>
  )
}

export default CategoryItem
