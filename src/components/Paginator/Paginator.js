import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';

// import Pages from './components/Pages';

const Paginator = ({
    children,
    pageCount,
    pageRangeDisplayed,
    marginPagesDisplayed,
    onPageChange,
    paginatorClassName,
    disabledClassName,
    activeLinkClassName,
    initialPage,
    disableInitialCallback
}) => {
    return (
        <Fragment>
            { children }
            <div className={paginatorClassName}>
                <ReactPaginate
                    pageCount={pageCount}
                    pageRangeDisplayed={pageRangeDisplayed}
                    marginPagesDisplayed={marginPagesDisplayed}
                    onPageChange={onPageChange}
                    previousLabel={<span>Назад</span>}
                    nextLabel={<span>Вперед</span>}
                    disabledClassName={disabledClassName}
                    activeLinkClassName={activeLinkClassName}
                    initialPage={initialPage}
                    disableInitialCallback={disableInitialCallback}
                />
            </div>
        </Fragment>
    );
};

Paginator.propTypes = {
    pageCount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    pageRangeDisplayed: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    marginPagesDisplayed: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    paginatorClassName: PropTypes.string,
    disabledClassName: PropTypes.string,
    activeLinkClassName: PropTypes.string,
    initialPage: PropTypes.number
};
Paginator.defaultProps = {
    pageRangeDisplayed: 3,
    marginPagesDisplayed: 3,
    // initialPage: 0
};

export default Paginator;