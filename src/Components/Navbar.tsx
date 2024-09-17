import { CiSearch } from "react-icons/ci";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import {css} from '@linaria/core'
import { memo, useCallback, useRef, useState } from "react";
import { useAppContext } from "../Context/AppContext";

const container = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 6rem;

  @media (max-width:26.563rem){
    flex-direction: column;
    align-items: flex-start;
    margin-top: 4rem;
    }

    @media (max-width:20rem){
    flex-direction: column;
    align-items: flex-start;
    margin-top: 8rem;
    }
`;

const searchbar = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 0.5px solid grey;
  border-radius: 3px;
  padding: 0.2em 0.25em;
  width: 40%;
  background-color: white;
  color: black;

  @media (max-width:26.563rem){
    width: 100%;
    margin: 2rem 0rem;
    }
`

const darkSearchbar = css`
background-color: #0b0a3a;
color: white;
`

const search = css`
  border: none;
  padding: 0.5em;
  margin-left: 0.25em;  
  width: 90%;
  background-color: transparent;
  &:focus{
    outline: none;
  };
`

const darkSearch = css`
color: white;
`

const button = css`
  border: 0.5px solid grey;
  border-radius: 3px;
  padding: 0.5em;
  cursor: pointer;
  background-color: white;
  color: black;
`

const darkButton = css`
background-color: #0b0a3a;
color: white;
`
const filterRegion = css`
position: relative;
`

const regionsNromal = css`
display: none;
position: absolute;
background-color: aliceblue;
text-align: center;
padding: 0rem;
`
const regionsDisplay = css`
display: block;
`

const regionButton = css`
border: none;
background-color: transparent;
color: black;
margin: 0rem;
cursor: pointer;

&:hover{
  background-color: grey;
  font-size: 1rem;
  font-weight: bold;
}
`


function Navbar() {
  const {data, setData,originalData, isDark} = useAppContext()
  const inputRef = useRef<HTMLInputElement>(null)
  const [searchValue, setSearchValue] = useState('')
  const [display, setDisplay] = useState<boolean>(false)

  const handleIconClick = useCallback(()=>{
    if(inputRef.current){
      inputRef.current.focus()
    }
  }, [])

  const handleInputChange = useCallback( (e : React.ChangeEvent<HTMLInputElement>)=>{
    setSearchValue(e.target.value)
    setData(originalData)
  } ,[data])

  const handleKeyPress = useCallback( (e : React.KeyboardEvent<HTMLInputElement>)=>{
    if(e.key === 'Enter' && searchValue?.trim() !== '' ){
      const filteredData = data?.filter((country) => 
      country.name.common.toLowerCase().includes(searchValue?.toLowerCase()) )

      if(filteredData){
        setData(filteredData)
      }
    } 
  } , [searchValue, data, setData])

  const handleDropDown = useCallback( () => {
    setDisplay(!display)
  } ,[display])

  const handleAllClick = useCallback( ()=>{
    setDisplay(!display)
    setData(originalData)
  } ,[data])

  const handleRegionClick = useCallback((region:string) => {
    const filteredData = data?.filter((country) => country.region == region )
    filteredData && setData(filteredData)
    setDisplay(!display)
  }, [display, data])

  return (
    <div className= {container} >
        <div className={`${searchbar} ${isDark ? darkSearchbar : ''}`}>
          <div onClick={handleIconClick} style={{cursor:"pointer"}}>
          <CiSearch />
          </div>
           <input ref={inputRef} 
           value={searchValue} 
           onChange={handleInputChange} 
           onKeyPress={handleKeyPress} 
           className={` ${search} ${isDark ? darkSearch : ''} `} type="text" 
           placeholder="Search for a country..."
           />
        </div>
        <div className={filterRegion}>
            <button onClick={handleDropDown} className={`${button} ${isDark ? darkButton : ''}`}>Filter by Region <MdOutlineKeyboardArrowDown /> </button>
            <div className={` ${regionsNromal} ${display ? regionsDisplay : ''}`}>
              <button onClick={handleAllClick} className={regionButton}>ALL</button>
                  {
                    [...new Set(data?.map((country) => country.region))].map((region) => (
                      <ul key={region}>
                        <button className={regionButton} onClick={()=>handleRegionClick(region)}>{region}</button>
                      </ul>
                    ))
                  }
            </div>
        </div>
    </div>
  )
}

export default memo(Navbar)
