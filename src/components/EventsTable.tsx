import React, { Fragment } from 'react';
import styled from 'styled-components';
import { deleteEvent, useEventsContext } from '../eventsContext';
import Row from './Row';
import Wrapper from './Wrapper';

const Separator = styled.hr<{ size?: number }>`
	border-top: ${({ size = 1 }) => size}px solid;
`;

const Item = styled.span<{ bold?: boolean }>`
	width: 15vw;
	font-weight: ${({ bold }) => (bold ? '600' : '400')};
`;

const Button = styled.button<{ kind?: string }>`
    background: ${({ kind }) => kind === 'danger' ? '#b00020' : '#00387b'};
    color: #fff;
    cursor: pointer;
    text-transform: uppercase;
    border-radius: 5px;
    height: 38px;
    min-width: 38px;
    border-color: transparent;
    outline: none;
    transition: 0.15s;
    text-align: center;
    
    &:hover {
        color: #fff;
        background-color:  ${({ kind }) => kind === 'danger' ? '#7d0017' : '#002755'};
        border-color: ${({ kind }) => kind === 'danger' ? '#7d0017' : '#002755'};
        box-shadow: none
    }
`

const EventsTable = () => {
    const { dispatch, state: events } = useEventsContext();

    return (
        <Wrapper width="60vw">
            <Row>
                <Item bold>Datum</Item>
                <Item bold>Název</Item>
                <Item bold>Místo</Item>
            </Row>
            <Separator size={2} />
            {events.map(({ id, name, date, place }, index) =>
                <Fragment key={id}>
                    <Row>
                        <Item>
                            {date.toLocaleString('cs')}
                        </Item>
                        <Item>
                            {name}
                        </Item>
                        <Item>{place}</Item>
                        <Button kind="danger" onClick={() => dispatch(deleteEvent(id))}>X</Button>
                    </Row>
                    {index < events.length - 1 && <Separator />}
                </Fragment>
            )}
        </Wrapper>
    );
};


export default EventsTable;