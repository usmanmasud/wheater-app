

export default function Search({ search, setSearch, submitSearch }) {
    return (
        <div className="search-engine">
            <input type="text" className="city-search" placeholder="Enter City Name" name="search" value={search} onChange={(e) => setSearch(e.target.value)} />
            <button onClick={submitSearch}>Search</button>
        </div>
    )
}
