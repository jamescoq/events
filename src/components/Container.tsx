import styled, { css } from 'styled-components';

const Container = styled.div<{ margin?: string; align?: string }>`
	display: flex;
	flex-direction: column;
	align-items: ${({ align = 'center' }) => align};
	height: 100%;
	${({ margin }) =>
		margin &&
		css`
			margin: ${margin};
		`}
`;

export default Container;
