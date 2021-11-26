import React, { FC, Fragment, MouseEvent, useMemo, useState } from 'react';
import styled from 'styled-components';
import { isBefore } from 'date-fns'
import { deleteEvent, useEventsContext } from '../eventsContext';
import Row from './Row';
import Wrapper from './Wrapper';
import Modal from './Modal';
import { LOCALE } from '../constants';

const Separator = styled.hr<{ size?: number }>`
	border-top: ${({ size = 1 }) => size}px solid;
`;

const Item = styled.span<{ bold?: boolean }>`
	width: 15vw;
	font-weight: ${({ bold }) => (bold ? '600' : '400')};
`;

const Button = styled.button<{ kind?: string }>`
	background: ${({ kind }) => (kind === 'danger' ? '#b00020' : '#00387b')};
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
		background-color: ${({ kind }) => (kind === 'danger' ? '#7d0017' : '#002755')};
		border-color: ${({ kind }) => (kind === 'danger' ? '#7d0017' : '#002755')};
		box-shadow: none;
	}

	&:disabled {
		background-color: #b0002085;
		border: none;
		cursor: auto;
	}
`;

const messages: Record<string, string> = {
	name: 'Název',
	place: 'Místo',
	date: 'Datum',
	description: 'Popis',
	participants: 'Limit účastníků'
}

const EventsTable: FC = () => {
	const { dispatch, state: events } = useEventsContext();
	const [open, setOpen] = useState(false)
	const [selectedEventId, setSelectedEventId] = useState<string>()

	const handleOnClose = () => setOpen(false);
	const handleRowSelect = (id: string) => () => {
		setSelectedEventId(id);
		setOpen(true);
	}

	const handleOnDeleteClick = (id: string) => (e: MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		dispatch(deleteEvent(id));
	}
	const today = new Date();
	const selectedEvent = useMemo(() => {
		const { name, date, place, description, participants } = events.find(({ id }) => id === selectedEventId) ?? {}

		return {
			[messages.name]: name,
			[messages.date]: date,
			[messages.place]: place,
			[messages.description]: description,
			[messages.participants]: participants,
		}
	}, [events, selectedEventId])

	return (
		<Wrapper width="60vw">
			<Row>
				<Item bold>Datum</Item>
				<Item bold>Název</Item>
				<Item bold>Místo</Item>
			</Row>
			<Separator size={2} />
			{events.map(({ id, name, date, place }, index) => {
				const isPastEvent = isBefore(date, today)
				return (
					<Fragment key={id}>
						<Row disabled={isPastEvent} onClick={handleRowSelect(id)} showCursor>
							<Item>{date.toLocaleString(LOCALE)}</Item>
							<Item>{name}</Item>
							<Item>{place}</Item>
							<Button kind="danger" disabled={isPastEvent} onClick={handleOnDeleteClick(id)}>
								X
							</Button>
						</Row>
						{index < events.length - 1 && <Separator />}
					</Fragment>
				)
			})}
			<Modal heading="Detail události" open={open} onClose={handleOnClose} data={selectedEvent} />
		</Wrapper>
	);
};

export default EventsTable;
