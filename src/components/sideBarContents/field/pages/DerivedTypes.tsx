import React from 'react'
import {goBack, push} from 'connected-react-router/immutable';
import SideBarContainer from "../../../layout/sideBar/sideBarContainer"
import { useAppDispatch, useAppSelector } from '../../../../store/storeHooks';
import Title from '../../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/Title';
import Body from '../components/derivedTypes/Body';
import Back from '../shared/BackIcon';
import Select from '../shared/SelectModel';
import Add from '../shared/Add';
import { addUserFieldState, FieldType } from '../../../../store/sideBar/fieldSlice';

function Steps() {
    const dispatch = useAppDispatch();

    //header
    const onClickBackIcon = () => {
        dispatch(goBack())
    }
    const getHeaderLeftIcon= () => {
        return (
        <Back onClick={() => onClickBackIcon()}/>
        );
    }
    const handleAdd=() => {
        dispatch(addUserFieldState({fieldType:FieldType.Derived}))
    }

    const getHeaderContent = () => {

        return (<Title text="Derived Types" group="Field"/>)
    }

    const getAction = () => {
        return (<Select></Select>)
    }

    const getBody = () => {
        return <Body/>
    }

    return (
        <SideBarContainer
            headerLeftIcon = {getHeaderLeftIcon()}
            headerRightIcon = {<Add onClick={handleAdd} />}
            headerContent = {getHeaderContent()}
            headerAction = {getAction()}
            body = {getBody()}
            footer = {null}
        />
    )
}

export default Steps
