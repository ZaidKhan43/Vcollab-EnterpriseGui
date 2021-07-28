import React from 'react'
import {goBack, push} from 'connected-react-router/immutable';
import SideBarContainer from "../../../layout/sideBar/sideBarContainer"
import { useAppDispatch, useAppSelector } from '../../../../store/storeHooks';
import Title from '../../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/Title';
import Body from '../components/step&subcase/Body';
import Back from '../shared/BackIcon';
import Select from '../shared/SelectModel';
import Add from '../shared/Add';
import Footer from '../shared/Footer';
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
        dispatch(addUserFieldState({fieldType:FieldType.Step}))
    }

    const getHeaderContent = () => {

        return (<Title text="Steps & Subcases" group="Field"/>)
    }

    const getAction = () => {
        return (<Select></Select>)
    }

    const getBody = () => {
        return <Body/>
    }

    const handleEdit = () => {

    }

    const handleDelete = () => {

    }
    return (
        <SideBarContainer
            headerLeftIcon = {getHeaderLeftIcon()}
            headerRightIcon = {<Add onClick={handleAdd} />}
            headerContent = {getHeaderContent()}
            headerAction = {getAction()}
            body = {getBody()}
            footer = {<Footer onEdit={handleEdit} onDelete = {handleDelete}/>}
        />
    )
}

export default Steps