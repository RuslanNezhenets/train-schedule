import React, {useEffect, useState} from 'react'
import {createStation, deleteStation, fetchStation, updateStation} from "../http/ticketsAPI"
import {Button, Table} from "react-bootstrap"
import StationModal from "../components/modals/StationModal"

const Stations = () => {
    const [stations, setStations] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [formData, setFormData] = useState({name: ''})
    const [isEditMode, setIsEditMode] = useState(false)

    useEffect(() => {
        fetchStation().then(data => setStations(data))
    }, [])

    const handleInputChange = (event) => {
        const {name, value} = event.target
        setFormData({...formData, [name]: value})
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (isEditMode) {
            const updatedStation = await updateStation(formData.id, formData)
            setStations(prevStations => {
                const stationIndex = prevStations.findIndex((station) => station.id === formData.id)
                if (stationIndex < 0)
                    return prevStations
                const updatedStations = [...prevStations]
                updatedStations[stationIndex] = updatedStation
                return updatedStations
            })
        } else {
            const newStation = await createStation(formData)
            setStations(prevStations => [...prevStations, newStation]);
        }

        setFormData({name: ''})
        setIsEditMode(false)
        setShowModal(false)
    }

    const handleAddClick = () => {
        setIsEditMode(false)
        setFormData({name: ''})
        setShowModal(true)
    }

    const handleUpdateClick = (station) => {
        setIsEditMode(true)
        setFormData(station)
        setShowModal(true)
    }

    const handleDelete = async (id) => {
        await deleteStation(id);
        setStations(stations.filter((station) => station.id !== id))
    }

    return (
        <div className="text-center">
            <StationModal
                show={showModal}
                onHide={() => setShowModal(false)}
                onSubmit={handleSubmit}
                onChange={handleInputChange}
                formData={formData}
                isEditMode={isEditMode}
            />
            <Table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Назва</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {stations.map((station, i) => (
                    <tr key={station.id}>
                        <td>{station.id}</td>
                        <td>{station.name}</td>
                        <td>
                            <Button variant="primary" onClick={() => handleUpdateClick(station)}>Змінити</Button>{' '}
                            <Button variant="danger" onClick={() => handleDelete(station.id)}>Видалити</Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
            <Button variant="primary" className="mt-3" onClick={handleAddClick}>Додати станцію</Button>
        </div>
    );
};

export default Stations;