import axios from 'axios'

export async function search(conditions) {
  const { search_word, display_num, sort } = conditions
  console.log(`${search_word}&display=${display_num}&sort=${sort}`)
  const { data } = await axios({
    url: `search/${search_word}&display=${display_num}&sort=${sort}`,
    method: 'POST',
  })

  return data
}

export async function autoComplete(input) {
  const { data } = await axios({
    url: `auto/${input}`,
    method: 'POST',
  })

  return data
}
