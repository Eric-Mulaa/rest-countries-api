import { memo } from 'react'
import { useAppContext } from '../Context/AppContext'
import {css} from '@linaria/core'
import {styled} from '@linaria/react'



const detailsContainer = css`
`

const leftSection = css``

const image = css``

const rightSection = css``

const rightSectionTop = css``

const rightTopRight = css``

const rightTopLeft = css``

const rightSectionBottom = css``

const Sentence = styled.p`

`

const Button = styled.button`
cursor: pointer;
margin-left: 1rem;
background-color: #bacaf7;
border: 0.063rem solid;
`


function Detailed() {

    const {detailed, borderCountryNames, handleBorderCountry} = useAppContext()

  return (
    <div>
        {
            detailed && 
            <div className={detailsContainer}>
                <div className={leftSection}>
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
        }
    </div>
  )
}
 
export default memo(Detailed)