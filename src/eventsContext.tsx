import React, { createContext, useContext, useReducer } from 'react';
import { createHashId } from './utils'
export interface BaseEventType {
	name: string;
	description: string;
	place: string;
	date: Date;
	participants: number;
}
export interface EventType extends BaseEventType {
	id: string;
}

interface ActionReturnType<Type> {
	type: string;
	payload?: Type;
}

type EventContextType = {
	state: Array<EventType>;
	dispatch: any;
};

type ActionType<Type> = (payload?: Type) => ActionReturnType<Type>;

const initialState: Array<EventType> = [
	{
		id: '4893d4aecccac012811bb5564752554b154735a4',
		name: 'Yoda and Obi-Wan meeting',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus mollis laoreet ultrices. Morbi bibendum eu ligula in posuere. Integer elementum leo nec rhoncus iaculis. Suspendisse potenti. Quisque molestie, nunc viverra lobortis sollicitudin, ipsum risus tristique dui, vel pellentesque mi magna at nunc. Vestibulum sed arcu interdum, pharetra urna sed, aliquet diam. Aliquam quis ipsum erat. Nulla facilisi.',
		place: 'Deep forest 1, Dagobah 999 99',
		date: new Date('2700-10-19T14:48:00.000Z'),
		participants: 2,
	},
	{
		id: '1b96b204304f35d56becf9f8a804cd371f585e2c',
		name: 'Spectre annual meeting',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sit amet nulla cursus, lobortis lectus eu, accumsan nisi. In cursus hendrerit dolor, id finibus mi rhoncus et. Donec consectetur ligula eget ligula congue, a suscipit metus venenatis. Donec at lectus eros. Nunc quis molestie ex. Donec sed ultrices metus, vel sodales urna. Phasellus maximus eros eu arcu interdum, ac consectetur nunc accumsan.',
		place: 'Royal Palace of Caserta in Naples, Piazza Carlo di Borbone, 81100 Caserta CE, Itálie',
		date: new Date('2021-10-19T10:28:00.000Z'),
		participants: 10000,
	},
];

const ActionTypes = { ADD: 'ADD', DELETE: 'DELETE' };

const addEvent: ActionType<BaseEventType> = (payload) => ({
	type: ActionTypes.ADD,
	payload,
});

const deleteEvent: ActionType<string> = (payload) => ({
	type: ActionTypes.DELETE,
	payload,
});

const dateComparator = (a: EventType, b: EventType) => b.date.valueOf() - a.date.valueOf();

const eventsReducer = (state: Array<EventType>, { type, payload }: any) =>
// { type, payload }: ActionReturnType<BaseEventType | string>
{
	switch (type) {
		case ActionTypes.ADD:
			const events: Array<EventType> = [...state, { ...payload, id: createHashId() }];
			events.sort(dateComparator);
			return events;
		case ActionTypes.DELETE:
			return state.filter(({ id }) => id !== payload);
		default:
			return state;
	}
};

const EventsContext = createContext<EventContextType>({
	state: initialState,
	dispatch: () => { },
});

const EventContextProvider: React.FC = ({ children }) => {
	const [state, dispatch] = useReducer(eventsReducer, initialState);

	return <EventsContext.Provider value={{ state, dispatch }}>{children}</EventsContext.Provider>
};

const useEventsContext = () => {
	const context = useContext(EventsContext);
	if (context === undefined) {
		throw new Error('useUserSettings must be used within a UserSettingsContext');
	}

	return context;
};

export { addEvent, deleteEvent, useEventsContext, EventContextProvider };
