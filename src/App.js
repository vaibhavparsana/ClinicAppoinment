import { BiCalendar, BiTrash } from 'react-icons/bi';
import Search from './components/Search';
import AddAppoinment from './components/AddAppoinment';
// import appoinmentList from "./data.json"
import AppoinmentInfo from './components/AppoinmentInfo';

import { useState, useEffect, useCallback } from 'react';

function App() {
  let [appoinmentList, setAppoinmentList] = useState([]);
  let [query, setQuery] = useState("");

  let [sortBy, setSortBy] = useState("petName");
  let [orderBy, setOrderBy] = useState("asc");

  const filteredAppoinments = appoinmentList.filter(item => {
    return (
      item.petName.toLowerCase().includes(query.toLowerCase()) ||
      item.ownerName.toLowerCase().includes(query.toLowerCase()) ||
      item.aptNotes.toLowerCase().includes(query.toLowerCase())
    )
  }).sort((a, b) => {
    let order = (orderBy === 'asc') ? 1 : -1;
    return (
      a[sortBy].toLowerCase() <
        b[sortBy].toLowerCase() ? -1 * order : 1 * order

    )
  })

  const fetchData = useCallback(() => {
    fetch('./data.json')
      .then(response => response.json())
      .then(data => {
        setAppoinmentList(data)
      });
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <div className="App container mx-auto mt-3 font-thin">
      <h1 className="text-5xl mb-3"><BiCalendar className="inline-block text-red-400 align-top
      " />Your Appoinments</h1>
      <AddAppoinment
        onSendAppoinment={myAppoinment => setAppoinmentList([...appoinmentList, myAppoinment])}
        lastId={appoinmentList.reduce((max, item) => Number(item.id) > max ? Number(item.id) : max, 0)} />
      <Search query={query}
        onQueryChange={myquery => setQuery(myquery)}
        orderBy={orderBy}
        onOrderByChange={myOrder => setOrderBy(myOrder)}
        sortBy={sortBy}
        onSortByChange={mySort => setSortBy(mySort)} />

      <ul className='divide-y divide-gray-200'>
        {
          filteredAppoinments.map(appoinment => (
            <AppoinmentInfo key={appoinment.id}
              appoinment={appoinment}
              onDeleteAppoinment={
                appoinmentId => setAppoinmentList(appoinmentList.filter(appoinment => appoinment.id != appoinmentId))
              } />
          ))
        }

      </ul>

    </div>
  );
}

export default App;
