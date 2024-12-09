
import React, { useEffect, useState } from 'react'
import Search from '../search'

export default function Wheather() {
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const [wheaterData, setWheaterData] = useState(null);

    async function fetchWheatherData(param) {
        setLoading(true);
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${param}&appid=e746af6e6b5b9aee4bca9dbf8fe32ddf`);

            const data = await response.json();

            if (data) {
                setWheaterData(data)
                setLoading(false)
            }

            console.log(data)
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }


    function submitSearch() {
        fetchWheatherData(search)
    }

    function getCurrentDate() {
        return new Date().toLocaleDateString('en-us', {
            weekday: 'long',
            month: "long",
            day: 'numeric',
            year: 'numeric'
        })
    }

    useEffect(() => {
        fetchWheatherData('kano')
    }, [])

    console.log(wheaterData)

    return (
        <div>
            <Search search={search} setSearch={setSearch} submitSearch={submitSearch} />
            {
                loading ? <div className='loading'>Loading...</div> :
                    <div>
                        <div className='city-name'>
                            <h2>{wheaterData?.name}, <span>{wheaterData?.sys.country}</span></h2>
                        </div>
                        <div className='date'>
                            <span>{getCurrentDate()}</span>
                        </div>
                        <div className='temp'>{wheaterData?.main.temp}</div>
                        <p className='description'>
                            {
                                wheaterData && wheaterData.weather && wheaterData.weather[0] ? wheaterData.weather[0].description : ''
                            }
                        </p>
                        <div className='wheather-info'>
                            <div className='column'>
                                <div>
                                    <p className='wind'>{wheaterData?.wind?.speed}</p>
                                    <p>Wind Speed</p>
                                </div>
                            </div>
                            <div className='column'>
                                <div>
                                    <p className='humidity'>{wheaterData?.main?.humidity}</p>
                                    <p>Humidity</p>
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </div>
    )
}
