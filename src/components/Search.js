import React, { useContext, useState, useRef, useEffect } from 'react'
import { CountriesContext } from '../context/CountriesContext'


const Search = () => {
    const [displayDropdown, setDisplayDropdown] = useState(false)
    const [displayAutocomplete, setDisplayAutocomplete] = useState(false)
    const [matches, setMatches] = useState([])
    const [input, setInput] = useState('')
    const [focus, setFocus] = useState()
    const [length, setLength] = useState()
    const [isMouseOver, setIsMouseOver] = useState(false)

    const ulRef = useRef()
    const inputRef = useRef()

    const { serverCountries, fetchData, countries } = useContext(CountriesContext)


    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const handleClickOutside = e => {
        if (ulRef.current && !ulRef.current.contains(e.target) && !inputRef.current.contains(e.target)) {
            setDisplayDropdown(false)
            setDisplayAutocomplete(false)
            setInput('')
        }
    }

    const handleInputClick = () => {
        setDisplayDropdown(!displayDropdown)
        displayAutocomplete && setDisplayDropdown(false)
        setFocus(undefined)
    }

    const checkDuplicatesAndFetch = country => {
        if (countries.findIndex(ctry => ctry.country === country) === -1) {
            fetchData(country)
            setDisplayAutocomplete(false)
            setDisplayDropdown(false)
            setInput('')
            setMatches([])
            setFocus(undefined)
            setIsMouseOver(false)
        } else {
            alert('Already in the list')
        }
    }

    const handleChange = e => {
        setFocus(undefined)

        if (e.target.value) {
            setInput(e.target.value)
            setDisplayDropdown(false)

            let matches = serverCountries.filter(ctry => ctry.name.toLowerCase().startsWith(e.target.value.toLowerCase()))

            if (matches.length) {
                setDisplayAutocomplete(true)
                setMatches(matches)
            } else {
                setDisplayAutocomplete(false)
                setMatches([])
            }
        } else {
            setDisplayAutocomplete(false)
            setInput('')
            setMatches([])
        }
    }

    const moveToNextEl = pos => {
        setFocus(pos)
        ulRef.current.children[pos].scrollIntoView({ behavior: 'auto', block: 'center' })
    }

    const handleKeyPress = e => {
        matches.length > 0 ? setLength(matches.length) : setLength(serverCountries.length)

        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            !displayDropdown && !displayAutocomplete && setDisplayDropdown(true)

            if (focus === undefined && e.key === 'ArrowUp') {
                setFocus(length - 1)
            } else if (focus === undefined && e.key === 'ArrowDown') {
                setFocus(0)
            } else {
                if (focus === 0) {
                    e.key === 'ArrowUp' ? moveToNextEl(length - 1) : moveToNextEl(focus + 1)
                } else if (focus === length - 1) {
                    e.key === 'ArrowUp' ? moveToNextEl(focus - 1) : moveToNextEl(0)
                } else {
                    e.key === 'ArrowUp' ? moveToNextEl(focus - 1) : moveToNextEl(focus + 1)
                }
            }
        }

        if (e.key === 'Enter') {
            ulRef.current && focus !== undefined && checkDuplicatesAndFetch(ulRef.current.children[focus].innerText)
        }
    }

    const handleMouseOver = () => {
        setIsMouseOver(true)
        setFocus(undefined)
    }
    

    const display = arr => {
        return (
            <ul ref={ulRef} className={displayAutocomplete ? 'search-results' : 'search-results max-height'}>
                {arr.map((ctry, idx) =>
                    <li
                        key={idx}
                        onClick={e => checkDuplicatesAndFetch(e.target.innerText)}
                        onMouseOver={handleMouseOver}
                        onMouseOut={() => setIsMouseOver(false)}
                        className={idx === focus && !isMouseOver ? 'selected' : null}
                    >
                        {ctry.name}
                    </li>)
                }
            </ul>
        )
    }

    return (
        <div className='search-input'>
            <input
                ref={inputRef}
                type="search"
                placeholder='Select country'
                autoComplete="off"
                value={input}
                onChange={handleChange}
                onClick={handleInputClick}
                onKeyDown={handleKeyPress}
            />
            {displayDropdown && display(serverCountries)}
            {displayAutocomplete && display(matches)}
        </div>
    )
}

export default Search
