import { useState, useEffect, useRef } from 'react'
import './App.css'
import { fetchData } from './fetchData'

export default function App() {
  const [people, setPeople] = useState([])
  const [isAscending, setIsAscending] = useState(true)
  const [query, setQuery] = useState('');

  // empty array does exist
  // empty string doesn't exist
  //*************** IMPORTANT  since title is a string a.title wont work. instead use a[title]************/
  const sortTable = (title) => {
    let data = []
    if (isAscending === true) {
      data = [...people].sort((a, b) => (a[title] < b[title] ? -1 : 1));
    } else {
      data = [...people].sort((a, b) => (a[title] > b[title] ? -1 : 1));

    }
    setPeople(data)
    setIsAscending((prevState) => !prevState)
  }

  const searchPeople = (people, query) => {
    return people.filter((person) => { return Object.keys(people[0]).some((key) => person[key].toLowerCase().includes(query)) }
    )
  }

  useEffect(() => {
    fetchData().then((results) => {
      results.forEach(({ picture, name: { title, first, last }, location: { city, country, state, street } }) => {
        setPeople((prevState) => [...prevState, {
          picture: `${picture.medium}`,
          name: `${first} ${last}`,
          country: `${country}`,
          city: `${city}`,
          state: `${state}`,
          streetNumber: `${street.number}`,
          streetName: `${street.name}`
        }]);
      });
    });
  }, [])

  return (
    <div className="text-xl" >
      <input type="text" className=' pr-10 text-gray-700 border-black bg-white bg-clip-padding border-2 border-solid w-96'
        id="fname"
        name="fname"
        placeholder=''
        onChange={(e) => setQuery(e.target.value.toLowerCase())}
      />
      {query !== '' && <button className=' text-red-500' onClick={() => setQuery('')}>BACK</button>}
      <table className='mt-10'>
        <tr>
          {people.length !== 0 ?
            Object.keys(people[0]).map((p, index) => <th key={index} onClick={() => sortTable(p)}>{p}</th>) : ''}
        </tr>
        {people.length !== 0 ?
          searchPeople(people, query).map((p, index) => <tr onClick={() => setQuery(p.name.toLowerCase())} className={`hover:bg-pink-200 cursor-pointer ${index % 2 === 0 ? 'bg-blue-50' : 'bg-blue-100'}`} key={index}>
            {Object.entries(p).map((a, i) =>
              <td>
                {Object.keys(p)[i] === 'picture' ? <img className='' src={Object.values(p)[i]} /> : Object.values(p)[i]}
              </td>)}
          </tr>) : ''}
      </table>
    </div >
  )
}


