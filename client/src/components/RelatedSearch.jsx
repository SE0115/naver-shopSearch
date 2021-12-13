import React from 'react'
import styled from 'styled-components'

const RelatedUl = styled.ul`
    list-style: none;
    box-sizing: border-box;
    border: 2px solid #dedede;
    /* width: 50%; */
    padding: 0;
    margin: 0;
    
    li {
        padding: 1rem;
        cursor: pointer;
        background: #fff;
        &:hover {
            background: #f3f3f3;
        }
    }   
    li + li {
        border-top: 1px solid #dedede;
    }
`

function RelatedSearch({ relatedSearch, getRelated, visible }) {
    const onClick = (event) => {
        getRelated(event.target.textContent)
    }
    return (
        <>
            { visible && relatedSearch.length !== 0 
            ? <RelatedUl>
            { relatedSearch.map((x, idx) => (
                <li key={idx} onClick={onClick}>{x}</li>
            ))}
        </RelatedUl>
        : null }
        </>
    )
}

RelatedSearch.defaultProps = {
    relatedSearch: []
}

export default RelatedSearch