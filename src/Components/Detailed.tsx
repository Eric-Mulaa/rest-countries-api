import { memo } from 'react'
import { useAppContext } from '../Context/AppContext'
import {css} from '@linaria/core'
import {styled} from '@linaria/react'
import { FaArrowLeftLong } from "react-icons/fa6";


const cover = css`
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100%;
z-index: 50;
display: flex;
justify-content: center;
align-items: center;
background-color: #d4d3d3;
`

const darkCover = css`
background-color: #14084d;
color: white;
`

const detailsContainer = css`
display: flex;
justify-content: space-between;
width: 90%;
`

const leftSection = css`
width: 30%;
`

const BackButton = styled.button`
cursor: pointer;
background-color: #bacaf7;
border: 0.063rem solid;
border-radius:0.5rem;
padding: 0.5rem;
margin-bottom: 1rem;
font-weight: 600;
`

const image = css``

const rightSection = css`
width: 50%;
`

const rightSectionTop = css`
display: flex;
`

const rightTopRight = css`
`

const rightTopLeft = css`
margin-top: 4rem;
`

const rightSectionBottom = css`
width: 100%;
margin-top: 2rem;
`

const Sentence = styled.p`
margin: 0rem;
`

const Button = styled.button`
cursor: pointer;
margin-left: 1rem;
background-color: #bacaf7;
border: 0.063rem solid;
border-radius: 0.5rem;
font-weight: 600;
`


function Detailed() {

    const {detailed,isDark, borderCountryNames, handleBorderCountry, handleBackClick} = useAppContext()

  return (
    <div>
        {
            detailed && 
            <div className={` ${cover} ${isDark ? darkCover : ''}`}>
            <div className={detailsContainer}>
                <div className={leftSection}>
                  <BackButton onClick={handleBackClick}> <FaArrowLeftLong /> Back</BackButton>
                  <img className={image} src={detailed.flags.png} alt="" />
                </div>
                <div className={rightSection}>
                  <div className={rightSectionTop}>
                   <div className={rightTopRight}>
                     <h3> {detailed.name.common} </h3>
                     <Sentence> <b>Navite Name:</b> { Object.entries(detailed.name.nativeName).map(([key, natv]) =>  <span key={key}> {natv.common} </span> )} </Sentence>
                     <Sentence> <b>Population:</b> {detailed.population} </Sentence>
                     <Sentence> <b>Region:</b> {detailed.region} </Sentence>
                     {detailed.subregion && <Sentence> <b>Sub-Region:</b> {detailed.subregion} </Sentence>}
                     <Sentence> <b>Capital:</b> {detailed.capital.map((city)=> <span key={city}> {city} </span> )} </Sentence>
                    </div>
                    <div className={rightTopLeft}>
                     <Sentence> <b>Top Level Domain:</b> {detailed.tld[0]} </Sentence>
                     <Sentence> <b>Currencies:</b> { Object.entries(detailed.currencies).map(([key, cur]) => <span key={key}> {cur.name} </span> )} </Sentence>
                     <Sentence> <b>Languages:</b> { Object.entries(detailed.languages).map(([key,lang]) => <span key={key}> {lang} </span> )} </Sentence>
                    </div>
                  </div>
                  <div className={rightSectionBottom}>
                  <span> <b>Border Countries:</b> </span>
                  {
                    borderCountryNames && 
                    borderCountryNames.map((brd, index) => 
                      <Button onClick={()=>handleBorderCountry(index)} key={brd}> {brd} </Button>
                    )
                  }
                  </div>
                </div>
            </div>
            </div>
        }
    </div>
  )
}
 
export default memo(Detailed)