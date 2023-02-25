import styled from 'styled-components';
import { Link } from 'react-router-dom';

const LinkButton = styled(Link)`
  text-align: center;
  margin: 0 auto;
  border-radius: 8px;
  padding: 0.25rem 0.5rem;
  background-color: #f1a92b;
  font-size: 1rem;
  font-weight: 700;
  position: relative;
  text-decoration: none;
  color: #ffff;
  height: fit-content;
`;

export default LinkButton;
