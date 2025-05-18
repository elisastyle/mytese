"use client";
import React, { useState, useEffect, useMemo } from 'react';
import Pagination from './Pagination';
import HouseCardList from "@/components/common/house/HouseCardList";
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

const ITEMS_PER_PAGE = 6;

const apartmentData = [
  { id: 1, title: 'آپارتمان لوکس با ویو عالی', address: 'زعفرانیه، خیابان یکتا', photos: ['/images/apartment-placeholder.jpg'], rooms: 3, bathrooms: 2, parking: true, yard_type: 'بالکن', capacity: 4, price: 12000000000, location: { lat: 35.725, lng: 51.33 }, discount: { originalPrice: 15000000000, discountedPrice: 12000000000 } },
  { id: 2, title: 'واحد شیک در قلب زعفرانیه', address: 'زعفرانیه، خیابان اعجازی', photos: ['/images/apartment-placeholder.jpg'], rooms: 2, bathrooms: 1, parking: false, yard_type: 'ندارد', capacity: 2, price: 8000000000, location: { lat: 35.722, lng: 51.34 } },
  { id: 3, title: 'آپارتمان دنج با دسترسی آسان', address: 'زعفرانیه، خیابان مقدس اردبیلی', photos: ['/images/apartment-placeholder.jpg'], rooms: 4, bathrooms: 3, parking: true, yard_type: 'حیاط اختصاصی', capacity: 6, price: 15000000000, location: { lat: 35.73, lng: 51.335 }, discount: { originalPrice: 16500000000, discountedPrice: 15000000000 } },
  { id: 4, title: 'آپارتمان با امکانات مدرن', address: 'زعفرانیه، خیابان پسیان', photos: ['/images/apartment-placeholder.jpg'], rooms: 3, bathrooms: 2, parking: true, yard_type: 'بالکن', capacity: 4, price: 11000000000, location: { lat: 35.728, lng: 51.332 } },
  { id: 5, title: 'واحد دوبلکس زعفرانیه', address: 'زعفرانیه، خیابان آصف', photos: ['/images/apartment-placeholder.jpg'], rooms: 5, bathrooms: 4, parking: true, yard_type: 'روف گاردن', capacity: 8, price: 25000000000, location: { lat: 35.726, lng: 51.338 } },
  { id: 6, title: 'آپارتمان نقلی و زیبا', address: 'زعفرانیه، خیابان ب', photos: ['/images/apartment-placeholder.jpg'], rooms: 1, bathrooms: 1, parking: false, yard_type: 'ندارد', capacity: 1, price: 5000000000, location: { lat: 35.723, lng: 51.333 } },
  { id: 7, title: 'آپارتمان نورگیر', address: 'زعفرانیه، خیابان ج', photos: ['/images/apartment-placeholder.jpg'], rooms: 3, bathrooms: 2, parking: true, yard_type: 'بالکن', capacity: 4, price: 13000000000, location: { lat: 35.727, lng: 51.337 } },
  { id: 8, title: 'آپارتمان با طراحی خاص', address: 'زعفرانیه، خیابان د', photos: ['/images/apartment-placeholder.jpg'], rooms: 2, bathrooms: 2, parking: true, yard_type: 'حیاط اختصاصی', capacity: 3, price: 9000000000, location: { lat: 35.724, lng: 51.331 } },
  { id: 9, title: 'آپارتمان با دید کوهستان', address: 'زعفرانیه، خیابان ه', photos: ['/images/apartment-placeholder.jpg'], rooms: 4, bathrooms: 3, parking: true, yard_type: 'روف گاردن', capacity: 5, price: 18000000000, location: { lat: 35.729, lng: 51.339 } },
  { id: 10, title: 'آپارتمان اقتصادی', address: 'زعفرانیه، خیابان و', photos: ['/images/apartment-placeholder.jpg'], rooms: 1, bathrooms: 1, parking: false, yard_type: 'ندارد', capacity: 2, price: 4000000000, location: { lat: 35.7215, lng: 51.3325 } },
];

const ZaferaniyeApartmentsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState(null);
  const [hasPhotoFilter, setHasPhotoFilter] = useState(false);
  const [hasParkingFilter, setHasParkingFilter] = useState(false);
  const [hasYardFilter, setHasYardFilter] = useState(false);
  const [sortByPopularity, setSortByPopularity] = useState(false);
  const [showAllFilter, setShowAllFilter] = useState(true);
  const [currentLoc, setCurrentLoc] = useState([35.7219, 51.3347]);
  const [totalApartments, setTotalApartments] = useState(apartmentData.length); // مقدار اولیه

  const filteredApartments = useMemo(() => {
    let filtered = [...apartmentData];

    if (!showAllFilter) {
      if (sortBy === 'price-asc') {
        filtered.sort((a, b) => a.price - b.price);
      } else if (sortBy === 'price-desc') {
        filtered.sort((a, b) => b.price - a.price);
      } else if (sortByPopularity) {
        filtered.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
      }

      if (hasPhotoFilter) {
        filtered = filtered.filter(apartment => apartment.photos && apartment.photos.length > 0);
      }
      if (hasParkingFilter) {
        filtered = filtered.filter(apartment => apartment.parking);
      }
      if (hasYardFilter) {
        filtered = filtered.filter(apartment => apartment.yard_type && apartment.yard_type !== 'ندارد');
      }
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(apartment =>
        apartment.title.toLowerCase().includes(query) ||
        apartment.address.toLowerCase().includes(query)
      );
    }

    setTotalApartments(filtered.length); // به‌روزرسانی totalApartments بر اساس فیلترها و جستجو
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filtered.slice(startIndex, endIndex);
  }, [apartmentData, currentPage, sortBy, hasPhotoFilter, hasParkingFilter, hasYardFilter, sortByPopularity, showAllFilter, searchQuery]);

  const totalPages = Math.ceil(totalApartments / ITEMS_PER_PAGE);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const resetFiltersAndShowAll = () => {
    setSortBy(null);
    setHasPhotoFilter(false);
    setHasParkingFilter(false);
    setHasYardFilter(false);
    setSortByPopularity(false);
    setShowAllFilter(true);
    setCurrentPage(1);
  };

  const handleSortChange = (newSort) => {
    setSortBy(newSort);
    setShowAllFilter(false);
    setSortByPopularity(false);
    setCurrentPage(1);
  };

  const handlePhotoFilterChange = () => {
    setHasPhotoFilter(!hasPhotoFilter);
    setShowAllFilter(false);
    setCurrentPage(1);
  };

  const handleParkingFilterChange = () => {
    setHasParkingFilter(!hasParkingFilter);
    setShowAllFilter(false);
    setCurrentPage(1);
  };

  const handleYardFilterChange = () => {
    setHasYardFilter(!hasYardFilter);
    setShowAllFilter(false);
    setCurrentPage(1);
  };

  const handleSortByPopularityChange = () => {
    setSortByPopularity(!sortByPopularity);
    setSortBy(null);
    setShowAllFilter(false);
    setCurrentPage(1);
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">رهن و اجاره آپارتمان در زعفرانیه</h1>

      <div className="mb-4 flex items-center justify-between rtl:space-x-reverse">
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <button
            className={`px-4 py-2 rounded-md text-sm font-semibold ${
              showAllFilter ? 'bg-indigo-500 text-white shadow' : 'bg-white text-gray-700 hover:bg-gray-200 border border-gray-300 shadow-sm'
            }`}
            onClick={resetFiltersAndShowAll}
          >
            همه
          </button>
          <button
            className={`px-4 py-2 rounded-md text-sm font-semibold ${
              sortBy === 'price-asc' ? 'bg-indigo-500 text-white shadow' : 'bg-white text-gray-700 hover:bg-gray-200 border border-gray-300 shadow-sm'
            }`}
            onClick={() => handleSortChange('price-asc')}
          >
            ارزان‌ترین
          </button>
          <button
            className={`px-4 py-2 rounded-md text-sm font-semibold ${
              sortBy === 'price-desc' ? 'bg-indigo-500 text-white shadow' : 'bg-white text-gray-700 hover:bg-gray-200 border border-gray-300 shadow-sm'
            }`}
            onClick={() => handleSortChange('price-desc')}
          >
            گران‌ترین
          </button>
          <button
            className={`px-4 py-2 rounded-md text-sm font-semibold ${
              sortByPopularity ? 'bg-indigo-500 text-white shadow' : 'bg-white text-gray-700 hover:bg-gray-200 border border-gray-300 shadow-sm'
            }`}
            onClick={handleSortByPopularityChange}
          >
            محبوب‌ترین
          </button>
          <button
            className={`px-4 py-2 rounded-md text-sm font-semibold ${
              hasPhotoFilter ? 'bg-indigo-500 text-white shadow' : 'bg-white text-gray-700 hover:bg-gray-200 border border-gray-300 shadow-sm'
            }`}
            onClick={handlePhotoFilterChange}
          >
            عکس‌دار
          </button>
          <button
            className={`px-4 py-2 rounded-md text-sm font-semibold ${
              hasParkingFilter ? 'bg-indigo-500 text-white shadow' : 'bg-white text-gray-700 hover:bg-gray-200 border border-gray-300 shadow-sm'
            }`}
            onClick={handleParkingFilterChange}
          >
            پارکینگ‌دار
          </button>
          <button
            className={`px-4 py-2 rounded-md text-sm font-semibold ${
              hasYardFilter ? 'bg-indigo-500 text-white shadow' : 'bg-white text-gray-700 hover:bg-gray-200 border border-gray-300 shadow-sm'
            }`}
            onClick={handleYardFilterChange}
          >
            حیاط‌دار
          </button>
        </div>
        <div className="relative rounded-md shadow-sm w-64 flex items-center">
          <input
            type="text"
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-3 pr-10 sm:text-sm border-gray-300 rounded-md"
            placeholder="جستجو بر اساس نام یا آدرس"
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredApartments.map((card) => (
          <HouseCardList
            key={card.id}
            card={card}
            setCurrentLoc={currentLoc}
            showOnMap={true}
            showFacilities={true}
            showYard={card.yard_type !== undefined}
            showCapacity={card.capacity !== undefined}
            showRooms={card.rooms !== undefined}
            showBathrooms={card.bathrooms !== undefined}
            showParking={card.parking !== undefined}
            discount={card.discount}
          />
        ))}
      </div>
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default ZaferaniyeApartmentsPage;