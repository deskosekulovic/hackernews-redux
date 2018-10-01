import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import StyledPaginator from '../styles/Paginator.jsx';

const Paginator = ({ page, basePath, totalItems, itemsPerPage }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  if (totalItems <= 30 || page > totalPages) return null;
  return (
    <StyledPaginator>
      {page !== 1 && (
        <span>
          <Link
            to={`/${basePath}/${page - 1}`}
          >
            <b>Prev</b>
          </Link>
        </span>
      )}
      {` (${page}/${totalPages}) `}
      {page !== totalPages && (
        <span>
          <Link
            to={`/${basePath}/${page + 1}`}
          >
            <b>More</b>
          </Link>
        </span>
      )}
    </StyledPaginator>
  );
};

Paginator.propTypes = {
  page: PropTypes.number.isRequired,
  basePath: PropTypes.string.isRequired,
  totalItems: PropTypes.number,
  itemsPerPage: PropTypes.number.isRequired
};

export default Paginator;
