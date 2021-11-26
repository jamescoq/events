import styled, { css } from 'styled-components';

const Wrapper = styled.div<{ margin?: string; width: string; padding?: string }>`
	margin: ${({ margin = '2vh' }) => margin};
	width: ${({ width }) => width};
	${({ padding }) =>
		padding &&
		css`
			padding: ${padding};
		`}

	@media (max-width: 768px) {
		flex: 1;
	}
`;

export default Wrapper;
