import React, {useContext, useEffect, useState} from 'react'
import {
    createTrainStation,
    deleteTrainStation,
    fetchStation,
    fetchTrain,
    fetchTrainStation,
    updateTrainStation
} from "../http/ticketsAPI"
import {Button, Dropdown, Table} from "react-bootstrap"
import TrainStationModal from "../components/modals/TrainStation";
import {observer} from "mobx-react-lite";
import {Context} from "../index";

const Paths = observer(() => {
    const [stations, setStations] = useState([])
    const [trains, setTrains] = useState([])
    const [selectedTrain, setSelectedTrain] = useState(null)
    const [selectedStations, setSelectedStations] = useState([])

    const [showModal, setShowModal] = useState(false)
    const [formData, setFormData] = useState({trainId: 0, stationId: 0, arrival: '', departure: ''})
    const [isEditMode, setIsEditMode] = useState(false)

    const {user} = useContext(Context)

    useEffect(() => {
        fetchTrain().then(data => setTrains(data))
        fetchStation().then(data => setStations(data))
    }, [])

    function GetTime(date) {
        const newDate = new Date(date)
        if(isNaN(newDate.getTime()))
            return date
        else {
            const hours = newDate.getHours().toString().padStart(2, '0')
            const minutes = newDate.getMinutes().toString().padStart(2, '0')
            return `${hours}:${minutes}`
        }
    }

    const handleInputChange = (event) => {
        const {name, value} = event.target
        setFormData({...formData, [name]: value})
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (isEditMode) {
            let updatedStation = await updateTrainStation(selectedTrain.id, formData.stationId, formData)
            const station = stations.find(station => station.id === formData.stationId)
            updatedStation = {...updatedStation, name: station.name}

            setSelectedStations(prevStations => {
                const stationIndex = prevStations.findIndex((station) => station.stationId === formData.stationId)
                if (stationIndex < 0)
                    return prevStations
                const updatedStations = [...prevStations]
                updatedStations[stationIndex] = updatedStation
                return updatedStations
            })
        } else {
            formData.trainId = selectedTrain.id
            formData.stationId = parseInt(formData.stationId)
            const newStation = await createTrainStation(formData)
            if(newStation.status !== 0) {
                const station = stations.find(station => station.id === formData.stationId)
                const stationWithName = {...newStation, name: station.name}
                setSelectedStations(prevStations => [...prevStations, stationWithName])
            }
        }

        setFormData({trainId: 0, stationId: 0, arrival: '', departure: ''})
        setIsEditMode(false)
        setShowModal(false)
    }

    async function handleTrainSelect(train) {
        setSelectedTrain(train)
        let rows = []
        await fetchTrainStation().then(data => data.filter(ts => ts.trainId === train.id))
            .then(tss => tss.map(ts => {
                    rows.push({stationId: ts.stationId, name: ts.stationId, arrival: ts.arrival, departure: ts.departure})
                })
            )
        rows.map(row => {
            row.name = stations.find(station => station.id === row.name).name
            row.arrival = GetTime(row.arrival)
            row.departure = GetTime(row.departure)
        })
        setSelectedStations(rows)
    }

    const handleAddClick = () => {
        setIsEditMode(false)
        setFormData({trainId: 0, stationId: 0, arrival: '', departure: ''})
        setShowModal(true)
    }

    const handleUpdateClick = (station) => {
        setIsEditMode(true)
        setFormData(station)
        setShowModal(true)
    }

    const handleDelete = async (stationId) => {
        await deleteTrainStation(selectedTrain.id, stationId)
        setSelectedStations(selectedStations.filter(station => station.stationId !== stationId))
    }

    return (
        <div>
            <TrainStationModal
                show={showModal}
                onHide={() => setShowModal(false)}
                onSubmit={handleSubmit}
                onChange={handleInputChange}
                formData={formData}
                isEditMode={isEditMode}
            />
            <Dropdown>
                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                    Оберіть потяг
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {trains.map(train =>
                        <Dropdown.Item key={train.id}
                                       onClick={() => handleTrainSelect(train)}>{train.name}</Dropdown.Item>
                    )}
                </Dropdown.Menu>
            </Dropdown>
            {selectedTrain && (
                <div className="mt-3">
                    <h2>{selectedTrain.name}</h2>
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>Станція</th>
                            <th>Прибуття</th>
                            <th>Відправлення</th>
                            {user.isAuth && <th></th>}
                        </tr>
                        </thead>
                        <tbody>
                        {selectedStations.map((station, i) =>
                            <tr key={i}>
                                <td>{station.name}</td>
                                <td>{station.arrival}</td>
                                <td>{station.departure}</td>
                                {user.isAuth && <td>
                                    <Button variant="primary"
                                            onClick={() => handleUpdateClick(station)}>Змінити</Button>{' '}
                                    <Button variant="danger" onClick={() => handleDelete(station.stationId)}>Видалити</Button>
                                </td>}
                            </tr>
                        )}
                        </tbody>
                    </Table>
                </div>
            )}
            {(user.isAuth && selectedTrain) &&
                <Button variant="primary" className="mt-3" onClick={handleAddClick}>Додати станцію</Button>}
        </div>
    );
});

export default Paths;