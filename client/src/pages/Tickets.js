import React, {useState, useEffect} from 'react'
import {Button, Form} from "react-bootstrap"
import '../style/main.css'
import {
    fetchOneStation, fetchOneTrain,
    fetchOneTrainStation,
    fetchStation,
    fetchTrainsByStations
} from "../http/ticketsAPI"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import Train from "../components/Train"

const Tickets = () => {
    const [stations, setStations] = useState([])
    const [startStation, setStartStation] = useState(null)
    const [endStation, setEndStation] = useState(null)
    const [selectedDate, setSelectedDate] = useState(null)
    const [trainStation, setTrainStation] = useState(null)

    useEffect(() => {
        fetchStation().then(data => setStations(data))
    }, [])

    async function search() {
        let newTrainStation = []
        const routes = await fetchTrainsByStations(startStation, endStation)
        for (const route of routes) {
            const [train, startStation, endStation, startTime, endTime] = await Promise.all([
                fetchOneTrain(route.trainId),
                fetchOneStation(route.startStationId),
                fetchOneStation(route.endStationId),
                fetchOneTrainStation(route.trainId, route.startStationId),
                fetchOneTrainStation(route.trainId, route.endStationId)
            ])
            if (dateComparison(startTime.departure, selectedDate)) {
                newTrainStation.push({
                    train: train.name,
                    startStation: startStation.name,
                    endStation: endStation.name,
                    startTime: startTime.departure,
                    endTime: endTime.departure
                })
            }
        }
        setTrainStation(newTrainStation)
    }

    function dateComparison(date1, date2) {
        const newDate1 = new Date(date1)
        const newDate2 = new Date(date2)

        return newDate1.getFullYear() === newDate2.getFullYear() &&
            newDate1.getMonth() === newDate2.getMonth() &&
            newDate1.getDate() === newDate2.getDate()

    }

    return (
        <div>
            <div className="form">
                <div className="setStation">
                    <div>Звідки</div>
                    <Form.Select defaultValue="0" onChange={event => setStartStation(event.target.value)}>
                        <option value="0" disabled hidden></option>
                        {stations.map(station =>
                            <option
                                key={station.id}
                                value={station.id}
                            >{station.name}</option>
                        )}
                    </Form.Select>
                </div>
                <div className="setStation">
                    <div>Куди</div>
                    <Form.Select defaultValue="0" onChange={event => setEndStation(event.target.value)}>
                        <option value="0" disabled hidden></option>
                        {stations.map(station =>
                            <option
                                key={station.id}
                                value={station.id}
                            >{station.name}</option>
                        )}
                    </Form.Select>
                </div>
                <div className="dataPicker">
                    <div>Дата</div>
                    <DatePicker
                        dateFormat="yyyy-MM-dd"
                        selected={selectedDate}
                        onChange={date => setSelectedDate(date)}
                    />
                </div>
                <Button
                    variant="primary button"
                    onClick={search}
                >Знайти</Button>
            </div>
            <div className="result">
                {trainStation && (trainStation.length > 0 ? trainStation.map((train, i) =>
                    <Train
                        key={i}
                        item={train}
                    />
                ) : <h2 className="mt-3 text-center">Нічого не знайдено</h2>)}
            </div>
        </div>
    );
};

export default Tickets;