import { FC } from 'react';
import styled from 'styled-components';

const Error = styled.span`
	display: block;
	color: #ff0606;
	font-size: 12px;
`;

type ErrorFieldRequiredType = {
	error: boolean;
};

const ErrorFieldRequired: FC<ErrorFieldRequiredType> = ({ error }) =>
	error ? <Error>This is required.</Error> : null;

export default ErrorFieldRequired;
