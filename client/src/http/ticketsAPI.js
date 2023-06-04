import {$host} from "./index"

//================ Station ================

export const createStation = async (station) => {
    const {data} = await $host.post('api/station', station)
    return data
}

export const fetchStation = async () => {
    const {data} = await $host.get('api/station')
    return data
}

export const fetchOneStation = async (id) => {
    const {data} = await $host.get('api/station/' + id)
    return data
}

export const updateStation = async (id, station) => {
    const {data} = await $host.put('api/station/' + id, station)
    return data
}

export const deleteStation = async (id) => {
    const {data} = await $host.delete('api/station/' + id)
    return data
}

//================ Train ================

export const createTrain = async (train) => {
    const {data} = await $host.post('api/train', train)
    return data
}

export const fetchTrain = async () => {
    const {data} = await $host.get('api/train')
    return data
}

export const fetchOneTrain = async (id) => {
    const {data} = await $host.get('api/train/' + id)
    return data
}

export const updateTrain = async (id, train) => {
    const {data} = await $host.put('api/train/' + id, train)
    return data
}

export const deleteTrain = async (id) => {
    const {data} = await $host.delete('api/train/' + id)
    return data
}

//================ TrainStation ================

export const createTrainStation = async (trainStation) => {
    const {data} = await $host.post('api/trainStation', trainStation)
    return data
}

export const fetchTrainStation = async () => {
    const {data} = await $host.get('api/trainStation')
    return data
}

export const fetchOneTrainStation = async (trainId, stationId) => {
    const {data} = await $host.get('api/trainStation/' + trainId + '/station/' + stationId)
    return data
}

export const fetchTrainsByStations = async (startStation, endStation) => {
    const {data} = await $host.get('api/trainStation/' + startStation + '/endStation/' + endStation)
    return data
}

export const updateTrainStation = async (trainId, stationId, trainStation) => {
    const {data} = await $host.put('api/trainStation/' + trainId + '/station/' + stationId, trainStation)
    return data
}

export const deleteTrainStation = async (trainId, stationId) => {
    const {data} = await $host.delete('api/trainStation/' + trainId + '/station/' + stationId)
    return data
}