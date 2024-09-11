import { CiSearch } from "react-icons/ci";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
//import './Navbar.css'
import {css} from '@linaria/core'
import { styled } from "@linaria/react";
import { memo, useCallback, useRef } from "react";

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
  background-color: transparent;
  border: 0.5px solid grey;
  border-radius: 3px;
  padding: 0.2em 0.25em;
  width: 40%;
  background-color: white;

  @media (max-width:26.563rem){
    width: 100%;
    margin: 2rem 0rem;
    }
`

const search = css`
  border: none;
  padding: 0.5em;
  margin-left: 0.25em;  
  width: 90%;
  &:focus{
    outline: none;
  };
`

const Button = styled.button`
  background-color: transparent;
  border: 0.5px solid grey;
  border-radius: 3px;
  padding: 0.5em;
  cursor: pointer;
  background-color: white;
`


function Navbar() {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleIconClick = useCallback(()=>{
    if(inputRef.current){
      inputRef.current.focus()
    }
  }, [])

  return (
    <div className= {container} >
        <div className={searchbar}>
          <div onClick={handleIconClick} style={{cursor:"pointer"}}>
          <CiSearch />
          </div>
           <input ref={inputRef} className={search} type="text" placeholder="Search for a country..."/>
        </div>
        <div>
            <Button>Filter by Country <MdOutlineKeyboardArrowDown /> </Button>
            <div>
                <ul></ul>
            </div>
        </div>
    </div>
  )
}

export default memo(Navbar)
