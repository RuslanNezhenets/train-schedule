import React, {useEffect, useState} from 'react';
import {Modal, Form, FormGroup, Button} from 'react-bootstrap'
import {fetchStation} from "../../http/ticketsAPI";

const TrainStationModal = ({show, onHide, onSubmit, onChange, isEditMode, formData}) => {
    const [stations, setStations] = useState([])

    useEffect(() => {
        fetchStation().then(data => setStations(data))
    }, [])

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>{isEditMode ? 'Оновлення даних' : 'Додати станцію'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={onSubmit}>
                    {!isEditMode && <FormGroup>
                        <Form.Label>Станція</Form.Label>
                        <Form.Control
                            as="select"
                            name="stationId"
                            value={formData.stationId}
                            onChange={onChange}
                            required
                        >
                            <option value="0" hidden></option>
                            {stations.map(station =>
                                <option
                                    key={station.id}
                                    value={station.id}
                                >{station.name}</option>
                            )}
                        </Form.Control>
                    </FormGroup>}
                    <FormGroup>
                        <Form.Label>Час прибуття</Form.Label>
                        <Form.Control
                            type="time"
                            name="arrival"
                            value={formData.arrival}
                            onChange={onChange}
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <Form.Label>Час відправлення</Form.Label>
                        <Form.Control
                            type="time"
                            name="departure"
                            value={formData.departure}
                            onChange={onChange}
                            required
                        />
                    </FormGroup>
                    <Button variant="primary" type="submit"
                            className="mt-3"> {isEditMode ? 'Зберегти' : 'Додати'}</Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default TrainStationModal;
