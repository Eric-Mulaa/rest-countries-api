import { IoMoonOutline } from "react-icons/io5"; 
import {css} from '@linaria/core'
import { memo } from "react";
import { useAppContext } from "../Context/AppContext";

const topContainer = css`
  display: flex;
  position: fixed;
  flex-wrap: nowrap;
  z-index: 100;
  top: 0;
  left: 0;
  right: 0;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid grey;
  background-color: white;
  padding-left: 4rem;

  @media (max-width:26.563rem){
    padding-left: 1rem;
    }

    @media (max-width: 20rem){
    padding-left: 0rem;
    flex-direction: column;
    flex-direction:column-reverse;
    }
`

const darkTopContainer = css`
  background-color: #0b0a3a; 
  color: white; 
`

const topRight = css`
  display: flex;
  align-items: center;
  padding-right: 4rem;
  cursor: pointer;

  @media (max-width:26.563rem){
    padding-right: 1rem;
    }

    @media (max-width: 20rem){
    padding-right: 0rem;
    }
`
const icon = css`
color: black;
`
const darkIcon = css`
color: white;
`

function Top() {
  const{toggleTheme, isDark}=useAppContext()
  return (
    <div className={`${topContainer} ${isDark ? darkTopContainer : ''}`}>
        <h2>Where in the world?</h2>
        <div className={topRight} onClick={toggleTheme}>
            <div className={` ${icon} ${isDark ? darkIcon : ''} `}><IoMoonOutline /></div>
            <h5>Dark Mode</h5>
        </div>
    </div>
  )
}

export default memo(Top)
