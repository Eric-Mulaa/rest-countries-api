import Navbar from "./Components/Navbar" 
import {css} from '@linaria/core'
import Top from "./Components/Top"
import { AppContext } from "./Context/AppContext"
import { useCallback, useEffect, useState } from "react"
import Data from "./Components/Type"
import Countries from "./Components/Countries"
import Detailed from "./Components/Detailed"

const appContainer = css`
  height: 100vh;
  padding: 0rem 4rem;
  :global(){
    body{
      margin: 0;
      min-height: 100vh;
      font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
      line-height: 1.5;
      font-weight: 400;
    }
  }
`


export default function App() {

  const[data, setData] = useState<Data[] | null>(null)
  const[originalData, setOrignalData] = useState<Data[] | null>(null)
  const[detailed, setDetailed] = useState <Data | null>(null)
  const[borderCountryNames, setBorderCountryNames] = useState<string[] | null>(null)
  const[isDark, setIsDark] = useState<boolean>(false)

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setOrignalData(data)
        console.log('api called') 

      });
  }, []);

  const handleCountryClick = useCallback(
    (index:number) => {
      if(!data){
        setDetailed(null)
      } else{
        const detailedData = data[index]
        setDetailed(detailedData)
      }
      console.log(detailed)

    }
    ,[data])


    useEffect(() => {
      if (detailed && data) {
        const borders = detailed.borders;
        const borderCountries =
          data.filter((country) => borders && borders.includes(country.cca3)).map((country) => 
            country.name.common) || null;
        setBorderCountryNames(borderCountries);
      }
    }, [detailed, data]);

    const handleBorderCountry = useCallback( (index:number)=> {
      const countryName = borderCountryNames && borderCountryNames[index]
      const newDetailedData = data?.find((country) => country.name.common == countryName)
      setDetailed(newDetailedData || null )
      
    } ,[borderCountryNames])

    const handleBackClick = useCallback( ()=>{
      setDetailed(null)
    } ,[])

    const toggleTheme = useCallback( ()=>{
      setIsDark(!isDark)
    } ,[isDark])

    useEffect(() => {
      document.body.style.backgroundColor = isDark ? '#14084d' : '#d4d3d3';
    }, [isDark]);


  return (
    <AppContext.Provider value={{data,setData,originalData, isDark, detailed, borderCountryNames, handleCountryClick, handleBorderCountry, handleBackClick, toggleTheme}} >
    <div className={appContainer}>
      <Top />
      <Navbar />
      <Countries />
      <Detailed />
    </div>
    </AppContext.Provider>
  )
}
