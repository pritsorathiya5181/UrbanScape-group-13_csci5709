// Author: Prit Ajaykumar Sorathiya - B00890175

import { ArrowLeftOutlined, ArrowRightOutlined } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled, { css } from 'styled-components'
import { SLIDE_ITEMS } from '../utils/constant'
import { mobile } from '../utils/scale'

const Container = styled.div`
  width: 100%;
  height: 95vh;
  display: flex;
  position: relative;
  overflow: hidden;
  ${mobile({ display: 'none' })}
`

const Arrow = styled.div`
  width: 50px;
  height: 50px;
  background-color: #bbdefb;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${(props) => props.direction === 'left' && '10px'};
  right: ${(props) => props.direction === 'right' && '10px'};
  margin: auto;
  cursor: pointer;
  opacity: 0.5;
  z-index: 2;
`

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transition: all 1.5s ease;
  transform: translateX(${(props) => props.slideIndex * -100}vw);
`

const Slide = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  background-color: #${(props) => props.bg};
`

const ImgContainer = styled.div`
  height: 100%;
  flex: 1;
`

const Image = styled.img`
  width: 65vw;
  height: 100%;
`

const InfoContainer = styled.div`
  flex: 1;
  padding: 50px;
`

const Title = styled.h1`
  font-size: 70px;
`

const Desc = styled.p`
  margin: 50px 0px;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 3px;
`

const Button = styled.button`
  padding: 10px;
  font-size: 20px;
  background-color: transparent;
  cursor: pointer;
`

const Slider = (props) => {
  let navigate = useNavigate()
  const [slideIndex, setSlideIndex] = useState(0)

  const handleClick = (direction) => {
    if (direction === 'left') {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2)
    } else {
      setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0)
    }
  }

  useEffect(() => {})

  // const timer = setTimeout(() => {
  //   setSlideIndex((slideIndex + 1) % 3)
  // }, 5000)

  return (
    <Container>
      {slideIndex > 0 && (
        <Arrow direction='left' onClick={() => handleClick('left')}>
          <ArrowLeftOutlined />
        </Arrow>
      )}
      <Wrapper slideIndex={slideIndex}>
        {props.sliderData?.length > 0 &&
          props?.sliderData[0].services?.map((item, index) => (
            <Slide bg={item.bg} key={index.toString()}>
              <ImgContainer>
                <Image src={item.img} />
              </ImgContainer>
              <InfoContainer>
                <Title>{item.serviceName}</Title>
                <Desc>{item.desc}</Desc>
                <Button onClick={() => navigate('./beautyservices')}>
                  BOOK NOW
                </Button>
              </InfoContainer>
            </Slide>
          ))}
      </Wrapper>
      {slideIndex < 2 && (
        <Arrow direction='right' onClick={() => handleClick('right')}>
          <ArrowRightOutlined />
        </Arrow>
      )}
    </Container>
  )
}

export default Slider
