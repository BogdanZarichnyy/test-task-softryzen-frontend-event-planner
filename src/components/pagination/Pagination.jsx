import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

import { useSelector, useDispatch } from "react-redux";
import { pageSelector } from '../../redux/selectors';
import { pageEvents, limitEvents } from '../../redux/slices/filterSlice';

import scss from './Pagination.module.scss';

import sprite from '../../images/sprite.svg';

import constants from '../../assets/constants/resolutionPoints';

const PreviousLabelElement = () => {
    return (
        <svg className={scss.icon}>
            <use id="chevron-left" href={`${sprite}#chevron-left`} />
        </svg>
    );
}

const NextLabelElement = () => {
    return (
        <svg className={scss.icon}>
            <use id="chevron-right" href={`${sprite}#chevron-right`} />
        </svg>
    );
}

const Pagination = ({ items }) => {
// const Pagination = ({ items, urlParams, setUrlParams }) => {
    const [pageRangeDisplayed, setPageRangeDisplayed] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(6);

    const pageStore = useSelector(pageSelector);

    // const limitStore = useSelector(limitSelector);

    // const navigate = useNavigate();
    const dispatch = useDispatch();
    // const location = useLocation();

    const [urlParams, setUrlParams] = useSearchParams();
    const params = useMemo(
        () => Object.fromEntries([...urlParams]),
        [urlParams]
    );
    
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    // const [itemOffset, setItemOffset] = useState(0);
    
    const [dimensions, setDimensions] = useState({ 
        // height: window.innerHeight,
        width: window.innerWidth
    });

    const handlerResize = useCallback(() => {
        setDimensions({
            // height: window.innerHeight,
            width: window.innerWidth
        });
    }, []);

    useEffect(() => {
        window.addEventListener('resize', handlerResize);

        return () => {
            window.removeEventListener('resize', handlerResize);
        }
    }, [handlerResize]);

    useEffect(() => {
        if (dimensions.width < constants.TABLET_RESOLUTION_POINT) {
            setPageRangeDisplayed(1);
            dispatch(limitEvents(6));
        } else if (dimensions.width >= constants.DESKTOP_RESOLUTION_POINT) {
            setPageRangeDisplayed(3);
            setItemsPerPage(8);
            dispatch(limitEvents(8));
        } else {
            setPageRangeDisplayed(3);
            dispatch(limitEvents(6));
        }
    }, [dispatch, dimensions.width, setPageRangeDisplayed]);
    
    // Simulate fetching items from another resources.
    // (This could be items from props; or items loaded in a local state
    // from an API endpoint with useEffect and useState)
    // const endOffset = itemOffset + itemsPerPage;
    // console.log(`Loading items from ${itemOffset} to ${endOffset}`);

    // const currentItems = items.slice(itemOffset, endOffset);
    // console.log('currentItems', currentItems);

    const pageCount = Math.ceil(items.length / itemsPerPage);
    // console.log('pageCount', pageCount);

    useEffect(() => {
        setUrlParams({ ...params, page: pageStore });
    }, [params.page, params, setUrlParams, pageStore, dispatch]);
    
    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        // const newOffset = (event.selected * itemsPerPage) % items.length;
        // console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
        // setItemOffset(newOffset);
        const numberPage = event.selected + 1;
        // setUrlParams({ ...urlParams, page: numberPage });
        dispatch(pageEvents(numberPage));
        // navigate(`/?page=${event.selected + 1}`);
    };

    const setInitialPage = () => {
        return urlParams.get('page') - 1;
    }

    return(
        <>
            <ReactPaginate
                breakLabel="..."
                nextLabel={<NextLabelElement />}
                onPageChange={handlePageClick}
                pageRangeDisplayed={pageRangeDisplayed}
                marginPagesDisplayed={1}
                pageCount={pageCount}
                previousLabel={<PreviousLabelElement />}
                renderOnZeroPageCount={null}
                // initialPage={urlParams.get('page') - 1}
                initialPage={setInitialPage()}

                className={scss.paginationList}
                breakClassName={scss.paginationItem}
                breakLinkClassName={scss.paginationLink}
                pageClassName={scss.paginationItem}
                pageLinkClassName={scss.paginationLink}
                // activeClassName={scss.active}
                activeLinkClassName={scss.activeLink}
                previousClassName={scss.paginationItemArrow}
                nextClassName={scss.paginationItemArrow}
                previousLinkClassName={scss.paginationLinkArrow}
                nextLinkClassName={scss.paginationLinkArrow}
                // disabledClassName={scss.disabled}
                disabledLinkClassName={scss.disabledLink}
            />
        </>
    )
}

export default Pagination;