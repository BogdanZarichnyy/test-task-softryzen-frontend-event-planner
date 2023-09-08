import { useEffect, useState, useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import NextLabelElement from './labelElements/NextLabelElement';
import PreviousLabelElement from './labelElements/PreviousLabelElement';

import { useSelector, useDispatch } from "react-redux";
import { pageSelector } from '../../redux/selectors';
import { pageEvents, limitEvents } from '../../redux/slices/filterSlice';

import scss from './Pagination.module.scss';

import constants from '../../assets/constants/resolutionPoints';

const Pagination = ({ count }) => {
    const [pageRangeDisplayed, setPageRangeDisplayed] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(6);
    // const [initPage, setInitPage] = useState(0);

    const pageStore = useSelector(pageSelector);
    const dispatch = useDispatch();

    const [urlParams, setUrlParams] = useSearchParams();
    const params = useMemo(
        () => Object.fromEntries([...urlParams]),
        [urlParams]
    );
    
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
    }, [dispatch, dimensions.width, setPageRangeDisplayed, setItemsPerPage, limitEvents]);

    const pageCount = Math.ceil(count / itemsPerPage);

    useEffect(() => {
        setUrlParams({ ...params, page: pageStore });
    }, [params.page, params, setUrlParams, pageStore, dispatch]);

    const handlePageClick = (event) => {
        const numberPage = event.selected + 1;
        dispatch(pageEvents(numberPage));
    };

    const setInitialPage = () => {
        if (!urlParams.get('page')) {
            return 0;
        } else {
            return urlParams.get('page') - 1;
        }
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
                initialPage={setInitialPage()}
                // initialPage={initPage}

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
    );
};

export default Pagination;