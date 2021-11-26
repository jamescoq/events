import styled from "styled-components";

const Heading = styled.h2<{ size?: string }>`
	font-size: ${({ size = '3em' }) => size};
`;

export default Heading;