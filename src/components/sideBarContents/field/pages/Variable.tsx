import React from 'react'
import {goBack, push} from 'connected-react-router/immutable';
import SideBarContainer from "../../../layout/sideBar/sideBarContainer"
import { useAppDispatch, useAppSelector } from '../../../../store/storeHooks';
import Title from '../../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/Title';
import SearchBox from '../../../shared/searchBox';
import Body from '../components/variables/Body';
import Footer from '../components/variables/Footer';
import Back from '../shared/BackIcon';
import Add from '../shared/Add';
import Select from '../shared/SelectModel';
import { addUserFieldState, FieldType } from '../../../../store/sideBar/fieldSlice';

function Variable() {
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
    const handleAdd = () => {
        dispatch(addUserFieldState({fieldType:FieldType.Variable}))
    }
    const getHeaderRightIcon= () => {
        return (
        <Add onClick={() => handleAdd()}/>
        )
    }

    const getHeaderContent = () => {

        return (<Title text="Variables" group="Field"/>)
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
            headerRightIcon = {getHeaderRightIcon()}
            headerContent = {getHeaderContent()}
            headerAction = {getAction()}
            body = {getBody()}
            footer = {<Footer/>}
        />
    )
}

export default Variable
