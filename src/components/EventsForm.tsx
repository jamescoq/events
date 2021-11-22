import React from 'react';
import styled from 'styled-components'
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import DatePicker, { registerLocale } from "react-datepicker";
import cs from 'date-fns/locale/cs';
import "react-datepicker/dist/react-datepicker.css";
import Wrapper from './Wrapper';
import { addEvent, useEventsContext, BaseEventType } from '../eventsContext';

registerLocale('cs', cs)

const Label = styled.label`
	display: block;
	font-weight: 600;
	margin-bottom: 1vh;
`;
const FormGroup = styled.div`
	display: inline-block;
    margin: 0.5vw;
`;

const Input = styled.input`
    align-items: center;
    text-align: end;
    background-color: hsl(0, 0%, 100%);
    border-color: hsl(0, 0%, 80%)};
    border-radius: 4px;
    border-style: solid;
    border-width: 1px;
    min-height: 38px;
	min-width: 130px;
    width: 14vw;
    padding: 0px 0px;
    padding-right: 30px;
    font-size: 16px;

	@media (max-width: 768px) {
		width: 44vw;
	}
`;
const Error = styled.span`
    display: block;
    color: #ff0606;
    font-size: 12px;
`

const Submit = styled.input.attrs({
    type: 'submit',
})`
    background: #00387b;
    color: #fff;
    cursor: pointer;
    text-transform: uppercase;
    width: 130px;
    border-radius: 5px;
    height: 38px;
    border-color: transparent;
    outline: none;
    transition: 0.15s;
    text-align: center;
    &:hover {
        color: #fff;
        background-color: #002755;
        border-color: #002148
    }
`

const EventsForm = () => {
    const { control, register, handleSubmit, formState: { errors } } = useForm();
    const { dispatch } = useEventsContext();

    const onSubmit: SubmitHandler<BaseEventType> = (data) => {
        console.log(data);
        dispatch(addEvent(data));
    }

    return (
        <Wrapper width="60vw">
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormGroup>
                    <Label>Název</Label>
                    <Input {...register("name", { required: true })} />
                    {errors.name && <Error>This is required.</Error>}
                </FormGroup>
                <FormGroup>
                    <Label>Datum</Label>
                    <Controller
                        control={control}
                        name='date'
                        render={({ field }) => (
                            <DatePicker
                                placeholderText='Select date'
                                onChange={(date) => field.onChange(date)}
                                selected={field.value}
                                dateFormat="d.M.yyyy h:mm"
                                showTimeSelect
                                timeCaption="Čas"
                                timeIntervals={15}
                                locale="cs"
                                startDate={new Date()}
                                minDate={new Date()}
                                customInput={<Input />}
                            />
                        )}
                    />
                    {errors.date && <Error>This is required.</Error>}
                </FormGroup>
                <FormGroup>
                    <Label>Místo</Label>
                    <Input {...register("place", { required: true })} />
                    {errors.place && <Error>This is required.</Error>}
                </FormGroup>
                <FormGroup>
                    <Label>Popis</Label>
                    <Input {...register("description", { required: true })} />
                    {errors.description && <Error>This is required.</Error>}
                </FormGroup>
                <FormGroup>
                    <Label>Limit účastníků</Label>
                    <Input type="number" min="0" {...register("participants", { required: true })} />
                    {errors.participants && <Error>This is required.</Error>}
                </FormGroup>
                <FormGroup>
                    <Submit />
                </FormGroup>
            </form>
        </Wrapper>
    );
};

export default EventsForm;