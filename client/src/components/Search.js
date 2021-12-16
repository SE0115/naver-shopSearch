import React, { useEffect, useState } from 'react'
import { search, autoComplete } from '../utils/search'
import ProductList from './ProductList'
import RelatedSearch from './RelatedSearch'
import styled from 'styled-components'

const SearchBox = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: 90%;
  margin: 1rem auto;
  
  input[name="search_word"] {
    box-sizing: border-box;
    font-size: 18px;
    /* width: 50%; */
    flex: 1;
    width: 100%;
    height: 3rem;
    padding: 0 1rem;
  }
  
  ul {
    position: absolute;
    top: 3rem ;
    left: 0;
    right: 4.5rem;
  }
  
  button {
    font-size: 18px;
    min-width: 4rem;
    margin-left: .5rem;
  }
`
const ConditionBox = styled.div`
  display: flex;
  flex-direction: column;
  border: 2px solid #dedede;
  width: 90%;
  box-sizing: border-box;
  margin: 0 auto;
  padding: 1rem;

  div + div {
    margin-top: 1rem;
  }
  span {
    display: inline-block;
    width: 10rem;
    text-align: center;
  }
  input {
    margin-right: 5px;
  }
  label + label {
    margin-left: 1rem;
  }
`

function Search() {
  const [conditions, setConditions] = useState({
    search_word: '',
    display_num: 10,
    sort: 'sim',
  })
  const [products, setProducts] = useState([])
  const [relatedSearch, setRelatedSearch] = useState([])
  const [relatedBox, setRelatedBox] = useState(false)

  const onChange = async (event) => {
    const { name, value } = event.target

    setConditions({
      ...conditions,
      [name]: value,
    })

  }

  useEffect(() => {
    const { search_word } = conditions
    if (search_word !== '') {
      autoComplete(conditions.search_word).then((res) => {
        setRelatedSearch(res)
      })
    } else {
      setRelatedSearch([])
    }
  }, [conditions])

  const onSearch = () => {
    search(conditions).then((res) => {
      console.log('결과값: ', res.items)
      setProducts(res.items)
    })
  }

  const getRelated = (related) => {
    setConditions({
      ...conditions,
      'search_word': related
    })
  }

  const onFocus = () => { setRelatedBox(true) }  
  // const onBlur = () => { 
  //   setTimeout(() => {
  //     setRelatedBox(false)
  //   }, 200); 
  // }  

  return (
    <>
      <SearchBox>
        <input
          name="search_word"
          placeholder="검색어를 입력하세요."
          onChange={onChange}
          value={conditions.search_word}
          onFocus={onFocus} 
          // onBlur={onBlur}
        / >
        <button onClick={onSearch}>검색</button>
        <RelatedSearch relatedSearch={relatedSearch} getRelated={getRelated} visible={relatedBox} />
      </SearchBox>
      <ConditionBox>
        <div>
          <span>상품 출력 개수</span>
          <label>
            <input
              type="range"
              onChange={onChange}
              name="display_num"
              value={conditions.display_num}
              min="10"
              max="100"
            />
            {conditions.display_num}
          </label>
        </div>
        <div>
          <span>정렬 방법</span>
          <label>
            <input type="radio" onChange={onChange} name="sort" value="sim" />
            유사도순
          </label>
          <label>
            <input type="radio" onChange={onChange} name="sort" value="date" />
            날짜순
          </label>
          <label>
            <input type="radio" onChange={onChange} name="sort" value="asc" />
            가격↑
          </label>
          <label>
            <input type="radio" onChange={onChange} name="sort" value="dsc" />
            가격↓
          </label>
        </div>
      </ConditionBox>
      <ProductList products={products} />
    </>
  )
}

export default Search
