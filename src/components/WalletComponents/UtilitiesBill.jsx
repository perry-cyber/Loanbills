import React from 'react';
import { Link } from 'react-router-dom';

export default function UtilitiesBill() {
  return (
    <div className="flex flex-col pt-5 gap-6 ">
      <p className='text-[12px]'>Utilities</p>
      <div className='flex flex-col lg:flex-col gap-20 lg:gap-20 justify-between items-center '>
        <div className='flex flex-col lg:flex-row gap-20'>

     
      <div className='flex lg:gap-20 gap-10'>
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 flex items-center justify-center bg-black dark:bg-white rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              className="fill-white dark:fill-black md:w-6 md:h-6 lg:w-8 lg:h-8"
            >
              <path d="m11.5 20l4.86-9.73H13V4l-5 9.73h3.5zM12 2c2.75 0 5.1 1 7.05 2.95S22 9.25 22 12s-1 5.1-2.95 7.05S14.75 22 12 22s-5.1-1-7.05-2.95S2 14.75 2 12s1-5.1 2.95-7.05S9.25 2 12 2"/>
            </svg>
          </div>
          <p className="text-xs md:text-sm lg:text-base mt-1">Electricity</p>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 flex items-center justify-center bg-black dark:bg-white rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 26 26"
              className="fill-white dark:fill-black md:w-6 md:h-6 lg:w-8 lg:h-8"
            >
              <path d="M19.875 0a1 1 0 0 0-.594.281L13 6.563L9.719 3.28A1.016 1.016 0 1 0 8.28 4.72L11.562 8H3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h20a3 3 0 0 0 3-3V11a3 3 0 0 0-3-3h-8.563l6.282-6.281A1 1 0 0 0 19.875 0M10.5 10c7.445 0 8.5.021 8.5 7c0 6.98-1.128 7-8.5 7c-7.406 0-8.5-.074-8.5-7c0-6.924 1.094-7 8.5-7m12 2.938c.866 0 1.563.696 1.563 1.562a1.56 1.56 0 0 1-1.563 1.563a1.56 1.56 0 0 1-1.563-1.563a1.56 1.56 0 0 1 1.563-1.563zm0 4c.866 0 1.563.696 1.563 1.562a1.56 1.56 0 0 1-1.563 1.563a1.56 1.56 0 0 1-1.563-1.563a1.56 1.56 0 0 1 1.563-1.563z"/>
            </svg>
          </div>
          <p className="text-xs md:text-sm lg:text-base mt-1">TV</p>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 flex items-center justify-center bg-black dark:bg-white rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 56 56"
              className="fill-white dark:fill-black md:w-6 md:h-6 lg:w-8 lg:h-8"
            >
              <path d="M28 51.906c13.055 0 23.906-10.828 23.906-23.906c0-13.055-10.875-23.906-23.93-23.906C14.899 4.094 4.095 14.945 4.095 28c0 13.078 10.828 23.906 23.906 23.906m-7.945-12.07c-1.008 0-1.735-.703-1.735-1.758V24.742l.164-3.914l-2.367 2.86l-1.945 2.226c-.328.305-.727.516-1.219.516c-.984 0-1.71-.774-1.71-1.735c0-.468.14-.867.468-1.218l6.89-7.22a1.89 1.89 0 0 1 1.454-.655a2.13 2.13 0 0 1 1.546.656l6.82 7.219c.329.328.493.75.493 1.218c0 .961-.727 1.735-1.711 1.735c-.492 0-.96-.211-1.219-.516l-1.898-2.227l-2.438-2.882l.164 3.937v13.336c0 1.055-.726 1.758-1.757 1.758m15.796 0c-.515 0-1.007-.188-1.5-.68l-6.867-7.218c-.328-.329-.469-.727-.469-1.22c0-.96.727-1.71 1.688-1.71c.516 0 .914.187 1.219.515l1.945 2.227l2.39 2.836l-.187-3.914V17.336c0-1.031.75-1.734 1.781-1.734c1.008 0 1.735.703 1.735 1.734v13.336l-.164 3.937l2.414-2.859l1.898-2.227c.258-.328.727-.515 1.242-.515c.961 0 1.711.75 1.711 1.71c0 .493-.164.891-.468 1.22l-6.868 7.218c-.421.469-.984.68-1.5.68"/>
            </svg>
          </div>
          <p className="text-xs md:text-sm lg:text-base mt-1">Data</p>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 flex items-center justify-center bg-black dark:bg-white rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              className="fill-white dark:fill-black md:w-6 md:h-6 lg:w-8 lg:h-8"
            >
              <path d="M8.45 8.5L7 7.05q1.025-.975 2.313-1.513T12 5t2.688.538T17 7.05L15.55 8.5q-.725-.725-1.625-1.112T12 7t-1.925.388T8.45 8.5m-2.8-2.9l-1.4-1.4q1.575-1.55 3.563-2.375T12 1t4.188.825T19.75 4.2l-1.4 1.4q-1.275-1.25-2.925-1.925T12 3t-3.425.675T5.65 5.6M10 22q-.825 0-1.412-.587T8 20v-8q0-.825.588-1.412T10 10h4q.825 0 1.413.588T16 12v8q0 .825-.587 1.413T14 22z"/>
            </svg>
          </div>
          <p className="text-xs md:text-sm lg:text-base mt-1">Airtime</p>
        </div>
        </div>
        <div className='flex lg:gap-20 gap-10'>
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 flex items-center justify-center bg-black dark:bg-white rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              className="fill-white dark:fill-black md:w-6 md:h-6 lg:w-8 lg:h-8"
            >
              <path d="m11.5 20l4.86-9.73H13V4l-5 9.73h3.5zM12 2c2.75 0 5.1 1 7.05 2.95S22 9.25 22 12s-1 5.1-2.95 7.05S14.75 22 12 22s-5.1-1-7.05-2.95S2 14.75 2 12s1-5.1 2.95-7.05S9.25 2 12 2"/>
            </svg>
          </div>
          <p className="text-xs md:text-sm lg:text-base mt-1">Electricity</p>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 flex items-center justify-center bg-black dark:bg-white rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 26 26"
              className="fill-white dark:fill-black md:w-6 md:h-6 lg:w-8 lg:h-8"
            >
              <path d="M19.875 0a1 1 0 0 0-.594.281L13 6.563L9.719 3.28A1.016 1.016 0 1 0 8.28 4.72L11.562 8H3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h20a3 3 0 0 0 3-3V11a3 3 0 0 0-3-3h-8.563l6.282-6.281A1 1 0 0 0 19.875 0M10.5 10c7.445 0 8.5.021 8.5 7c0 6.98-1.128 7-8.5 7c-7.406 0-8.5-.074-8.5-7c0-6.924 1.094-7 8.5-7m12 2.938c.866 0 1.563.696 1.563 1.562a1.56 1.56 0 0 1-1.563 1.563a1.56 1.56 0 0 1-1.563-1.563a1.56 1.56 0 0 1 1.563-1.563zm0 4c.866 0 1.563.696 1.563 1.562a1.56 1.56 0 0 1-1.563 1.563a1.56 1.56 0 0 1-1.563-1.563a1.56 1.56 0 0 1 1.563-1.563z"/>
            </svg>
          </div>
          <p className="text-xs md:text-sm lg:text-base mt-1">TV</p>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 flex items-center justify-center bg-black dark:bg-white rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 56 56"
              className="fill-white dark:fill-black md:w-6 md:h-6 lg:w-8 lg:h-8"
            >
              <path d="M28 51.906c13.055 0 23.906-10.828 23.906-23.906c0-13.055-10.875-23.906-23.93-23.906C14.899 4.094 4.095 14.945 4.095 28c0 13.078 10.828 23.906 23.906 23.906m-7.945-12.07c-1.008 0-1.735-.703-1.735-1.758V24.742l.164-3.914l-2.367 2.86l-1.945 2.226c-.328.305-.727.516-1.219.516c-.984 0-1.71-.774-1.71-1.735c0-.468.14-.867.468-1.218l6.89-7.22a1.89 1.89 0 0 1 1.454-.655a2.13 2.13 0 0 1 1.546.656l6.82 7.219c.329.328.493.75.493 1.218c0 .961-.727 1.735-1.711 1.735c-.492 0-.96-.211-1.219-.516l-1.898-2.227l-2.438-2.882l.164 3.937v13.336c0 1.055-.726 1.758-1.757 1.758m15.796 0c-.515 0-1.007-.188-1.5-.68l-6.867-7.218c-.328-.329-.469-.727-.469-1.22c0-.96.727-1.71 1.688-1.71c.516 0 .914.187 1.219.515l1.945 2.227l2.39 2.836l-.187-3.914V17.336c0-1.031.75-1.734 1.781-1.734c1.008 0 1.735.703 1.735 1.734v13.336l-.164 3.937l2.414-2.859l1.898-2.227c.258-.328.727-.515 1.242-.515c.961 0 1.711.75 1.711 1.71c0 .493-.164.891-.468 1.22l-6.868 7.218c-.421.469-.984.68-1.5.68"/>
            </svg>
          </div>
          <p className="text-xs md:text-sm lg:text-base mt-1">Data</p>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 flex items-center justify-center bg-black dark:bg-white rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              className="fill-white dark:fill-black md:w-6 md:h-6 lg:w-8 lg:h-8"
            >
              <path d="M8.45 8.5L7 7.05q1.025-.975 2.313-1.513T12 5t2.688.538T17 7.05L15.55 8.5q-.725-.725-1.625-1.112T12 7t-1.925.388T8.45 8.5m-2.8-2.9l-1.4-1.4q1.575-1.55 3.563-2.375T12 1t4.188.825T19.75 4.2l-1.4 1.4q-1.275-1.25-2.925-1.925T12 3t-3.425.675T5.65 5.6M10 22q-.825 0-1.412-.587T8 20v-8q0-.825.588-1.412T10 10h4q.825 0 1.413.588T16 12v8q0 .825-.587 1.413T14 22z"/>
            </svg>
          </div>
          <p className="text-xs md:text-sm lg:text-base mt-1">Airtime</p>
        </div>
        </div>
        </div>
        <Link to="/dashboard" className='flex w-full justify-center gap-3 '>

        <div className='bg-black text-white p-2 rounded-lg dark:bg-white dark:text-black text-[12px] lg:text-[16px]'>Exchange Currency</div>
        <div className='bg-black text-white p-2 rounded-lg dark:bg-white dark:text-black text-[12px] lg:text-[16px]'>Exchange Cryptocurrency</div>
       
        </Link>
      </div>
    </div>
  );
}
