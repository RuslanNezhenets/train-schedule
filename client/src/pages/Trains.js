import React, {useEffect, useState} from 'react'
import {createTrain, deleteTrain, fetchTrain, updateTrain} from "../http/ticketsAPI"
import {Button, Table} from "react-bootstrap"
import TrainModal from "../components/modals/TrainModal"

const Trains = () => {
    const [trains, setTrains] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [formData, setFormData] = useState({name: ''})
    const [isEditMode, setIsEditMode] = useState(false)

    useEffect(() => {
        fetchTrain().then(data => setTrains(data))
    }, [])

    const handleInputChange = (event) => {
        const {name, value} = event.target
        setFormData({...formData, [name]: value})
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (isEditMode) {
            const updatedTrain = await updateTrain(formData.id, formData)
            setTrains(prevTrains => {
                const trainIndex = prevTrains.findIndex((train) => train.id === formData.id)
                if (trainIndex < 0)
                    return prevTrains
                const updatedTrains = [...prevTrains]
                updatedTrains[trainIndex] = updatedTrain
                return updatedTrains
            })
        } else {
            const newTrain = await createTrain(formData)
            setTrains(prevTrains => [...prevTrains, newTrain]);
        }

        setFormData({name: ''})
        setIsEditMode(false)
        setShowModal(false)
    }

    const handleAddClick = () => {
        setIsEditMode(false);
        setFormData({surname: '', name: '', patronymic: '', address: '', telephone: ''});
        setShowModal(true);
    };

    const handleUpdateClick = (train) => {
        setIsEditMode(true)
        setFormData(train)
        setShowModal(true)
    }

    const handleDelete = async (id) => {
        await deleteTrain(id);
        setTrains(trains.filter((train) => train.id !== id))
    }

    return (
        <div className="text-center">
            <TrainModal
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
                {trains.map((train, i) => (
                    <tr key={train.id}>
                        <td>{train.id}</td>
                        <td>{train.name}</td>
                        <td>
                            <Button variant="primary" onClick={() => handleUpdateClick(train)}>Змінити</Button>{' '}
                            <Button variant="danger" onClick={() => handleDelete(train.id)}>Видалити</Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
            <Button variant="primary" className="mt-3" onClick={handleAddClick}>Додати потяг</Button>
        </div>
    );
};

export default Trains;