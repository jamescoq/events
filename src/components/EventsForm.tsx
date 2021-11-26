import styled, { css } from 'styled-components';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Wrapper from './Wrapper';
import { addEvent, useEventsContext, BaseEventType } from '../eventsContext';
import { DATE_TIME_FORMAT, LOCALE } from '../constants';
import ErrorFieldRequired from './ErrorFieldRequired';

const FormGroup = styled.div<{ row?: boolean; align?: string; margin?: string }>`
	margin: ${({ margin = '1vh' }) => margin};
	flex: 1;

	${({ row, align }) =>
		row &&
		css`
			display: flex;
			flex-direction: row;
			justify-content: ${align};

			@media (max-width: 576px) {
				flex-direction: column;
			}
		`}
`;

const Label = styled.label`
	display: block;
	font-weight: 600;
	margin-bottom: 1vh;
`;

const Input = styled.input`
    align-items: center;
    background-color: hsl(0, 0%, 100%);
    border-color: hsl(0, 0%, 80%)};
    border-radius: 4px;
    border-style: solid;
    border-width: 1px;
    min-height: 38px;
	min-width: 130px;
	width: 100%;
    padding: 0px 0px 0px 5px;
    font-size: 16px;
`;

const TextArea = styled.textarea`
    align-items: center;
    background-color: hsl(0, 0%, 100%);
    border-color: hsl(0, 0%, 80%)};
    border-radius: 4px;
    border-style: solid;
    border-width: 1px;
    min-height: 38px;
	min-width: 130px;
	width: 100%;
    padding: 0px 0px 0px 5px;
    font-size: 16px;
`;

const Submit = styled.input.attrs({
	type: 'submit',
})`
	background: #00387b;
	color: #fff;
	cursor: pointer;
	text-align: center;
	text-transform: uppercase;
	width: 130px;
	height: 38px;
	border-radius: 5px;
	border-color: transparent;
	padding: 0px;
	@media (max-width: 576px) {
		width: 100%;
	}

	&:hover {
		color: #fff;
		background-color: #002755;
		border-color: #002148;
	}
`;

const EventsForm = () => {
	const {
		control,
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const { dispatch } = useEventsContext();

	const onSubmit: SubmitHandler<BaseEventType> = (data) => {
		dispatch(addEvent(data));
		reset();
	};

	return (
		<Wrapper width="60vw">
			<form onSubmit={handleSubmit(onSubmit)}>
				<FormGroup>
					<Label>Název*</Label>
					<Input {...register('name', { required: true })} />
					<ErrorFieldRequired error={errors.name} />
				</FormGroup>
				<FormGroup row align="space-between" margin="0">
					<FormGroup>
						<Label>Datum*</Label>
						<Controller
							control={control}
							name="date"
							rules={{ required: true }}
							render={({ field }) => (
								<DatePicker
									placeholderText="Vyberte datum"
									onChange={(date) => field.onChange(date)}
									selected={field.value}
									dateFormat={DATE_TIME_FORMAT}
									showTimeSelect
									timeCaption="Čas"
									timeIntervals={15}
									locale={LOCALE}
									startDate={new Date()}
									minDate={new Date()}
									customInput={<Input />}
								/>
							)}
						/>
						<ErrorFieldRequired error={errors.date} />
					</FormGroup>
					<FormGroup>
						<Label>Limit účastníků</Label>
						<Input type="number" min="0" {...register('participants')} />
					</FormGroup>
				</FormGroup>
				<FormGroup>
					<Label>Místo*</Label>
					<Input {...register('place', { required: true })} />
					<ErrorFieldRequired error={errors.place} />
				</FormGroup>
				<FormGroup>
					<Label>Popis</Label>
					<TextArea {...register('description')} rows={3} />
				</FormGroup>
				<FormGroup row align="end">
					<Submit />
				</FormGroup>
			</form>
		</Wrapper>
	);
};

export default EventsForm;
