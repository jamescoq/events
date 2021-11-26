import React, { FC } from 'react';
import styled, { css } from 'styled-components';

import { ReactComponent as Close } from '../assets/close.svg';
import { LOCALE } from '../constants';
import Container from './Container';
import Heading from './Heading';

const ModalWrapper = styled.div<{ open?: boolean }>`
	align-items: center;
	background: rgba(0, 0, 0, 0.7);
	bottom: 0;
	display: flex;
	justify-content: center;
	left: 0;
	position: fixed;
	right: 0;
	top: 0;

	opacity: ${({ open }) => (open ? '1' : '0')};
	transition: opacity 0.5s ease-in-out;
	visibility: ${({ open }) => (open ? 'visible' : 'hidden')};

	.modal-body {
		opacity: 1;
		transform: translateY(1);
	}
`;
const ModalBody = styled.div<{ open?: boolean }>`
	width: 50vw;
	min-height: 40vh;
	border-radius: 10px;
	background-color: white;
	padding: 20px;
	z-index: 1;

	@media (max-width: 576px) {
		width: 90vw;
	}
`;

const ModalHeader = styled.div`
	align-items: baseline;
	display: flex;
	justify-content: space-between;
`;

const CloseButton = styled(Close)`
	cursor: pointer;
	height: 16px;
	width: 16px;
`;

const BoxWrapper = styled.div`
	display: flex;
	flex-direction: row;
	flex: 1;
	margin-bottom: 1vh;
`;

const Box = styled.div<{ bold?: boolean }>`
	min-width: 130px;
	${({ bold }) =>
		bold &&
		css`
			font-weight: 600;
		`}
`;

type ModalProps = {
	heading: string;
	open: boolean;
	onClose: () => void;
	data?: Record<string, any>;
};

const formatData = (value: any) => {
	if (value instanceof Date) {
		return value.toLocaleString(LOCALE);
	}

	return value;
};

const Modal: FC<ModalProps> = ({ heading, open, onClose, data = {} }) => {
	const keys = Object.keys(data) ?? [];

	return (
		<ModalWrapper open={open}>
			<ModalBody>
				<ModalHeader>
					<Heading size="2em">{heading}</Heading>
					<CloseButton onClick={onClose} />
				</ModalHeader>
				<Container align="start">
					{keys.map((key, index) => (
						<BoxWrapper key={index}>
							<Box bold>{key}:</Box>
							<Box>{`${formatData(data[key])}`}</Box>
						</BoxWrapper>
					))}
				</Container>
			</ModalBody>
		</ModalWrapper>
	);
};

export default Modal;
