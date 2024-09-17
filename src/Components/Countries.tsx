import { memo } from "react"
import { useAppContext } from "../Context/AppContext"
import {css} from '@linaria/core'
import {styled} from '@linaria/react'

const countriesContainer=css`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;

  @media (max-width:26.563rem){
    flex-direction: column;
    align-items: center;
  }
`

const country = css`
  width: 22%;
  height: 20rem;
  margin-top: 4rem;
  border: 1px solid grey;
  border-radius: 0.5rem;
  background-color: white;

  cursor: pointer;

  @media (max-width:48rem){
    width: 30%;
    margin-top: 2rem;
  }

  @media (max-width:26.563rem){
    width: 94%;
  }
`

const darkCountry = css`
background-color: #0b0a3a;
color: white;
`

const imageContainer = css`
  height: 50%;
`

const image = css`
 width: 100%;
 height: 100%;
 object-fit: cover;
 object-position: center;
 border-top-left-radius: 0.5rem;
 border-top-right-radius: 0.5rem;
`

const Sentence = styled.p`
  margin: 0rem;
`

const H4 = styled.h4`
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
`

const countriesLower = css`
  padding-left: 2rem;
`

function Countries() {

  const {data, isDark, handleCountryClick} = useAppContext()

  return (
    <div className={countriesContainer}>
      { data &&
        data.map((item, index) => (
          <div key={item.name.common} className={`${country} ${isDark ? darkCountry : ''}`} onClick={()=>handleCountryClick(index)} >
            <div className={imageContainer}>
              <img className={image} src={item.flags.png} alt="" />
            </div>
            <div className={countriesLower}>
              <H4> {item.name.common} </H4>
              <Sentence><b>Population:</b> {item.population} </Sentence>
              <Sentence><b>Region:</b> {item.region} </Sentence>
              <Sentence><b>Capital:</b> {item.capital} </Sentence>
            </div>
          </div>
        ))
      }
    </div>
  )
}


export default memo(Countries)