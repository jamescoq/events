import styled, { css } from 'styled-components';

const Row = styled.div<{ disabled?: boolean; showCursor?: boolean }>`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	margin-top: 2vh;
	margin-bottom: 2vh;
	${({ disabled }) =>
		disabled &&
		css`
			color: #aeaeae;
		`}
	${({ showCursor }) =>
		showCursor &&
		css`
			cursor: pointer;
		`}
`;

export default Row;
