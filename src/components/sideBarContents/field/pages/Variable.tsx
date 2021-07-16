import React from 'react'
import {goBack, push} from 'connected-react-router/immutable';
import SideBarContainer from "../../../layout/sideBar/sideBarContainer"
import { useAppDispatch, useAppSelector } from '../../../../store/storeHooks';
import Title from '../../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/Title';
import SearchBox from '../../../shared/searchBox';
import Back from '../shared/BackIcon';
import Select from '../shared/SelectModel';

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

    const getHeaderContent = () => {

        return (<Title text="Variables" group="Field"/>)
    }

    const getAction = () => {
        return (<Select></Select>)
    }

    const getBody = () => {
        return null
    }

    return (
        <SideBarContainer
            headerLeftIcon = {getHeaderLeftIcon()}
            headerRightIcon = {null}
            headerContent = {getHeaderContent()}
            headerAction = {getAction()}
            body = {getBody()}
            footer = {null}
        />
    )
}

export default Variable
