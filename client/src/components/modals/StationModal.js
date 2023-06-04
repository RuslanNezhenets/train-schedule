import React from 'react';
import {Modal, Form, FormGroup, Button} from 'react-bootstrap';

const StationModal = ({show, onHide, onSubmit, onChange, isEditMode, formData}) => {
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>{isEditMode ? 'Оновлення даних' : 'Додати станцію'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={onSubmit}>
                    <FormGroup>
                        <Form.Label>Назва</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
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

export default StationModal;
