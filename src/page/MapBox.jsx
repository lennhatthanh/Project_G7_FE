import { memo, useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import { useDispatch, useSelector } from 'react-redux';
import { dataSanOpen } from '@/redux/mapSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faLocation } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { dataMonChoi } from '@/redux/monChoiSlice';
import { dataDanhGia } from '@/redux/danhGiaSlice';
import { dataDichVuOpen } from '@/redux/dichVuSlice';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

const MapBox = () => {
    const mapContainerRef = useRef(null);
    const map = useRef(null);
    const markersRef = useRef([]);
    const directions = useRef(null);
    const userLocation = useRef(null);
    const { dataSan, loading } = useSelector((state) => state.map);
    const dsmonchoi = useSelector((state) => state.monchoi.monchoi);
    const dsdanhgia = useSelector((state) => state.danhgia.danhgia);
    const dsdichvu = useSelector((state) => state.dichvu.dichvuopen);
    const [selectedSan, setSelectedSan] = useState(null);
    const [selectedMonChoi, setSelectedMonChoi] = useState('Tất Cả');
    const [activeTab, setActiveTab] = useState('overview');
    const [hasRoute, setHasRoute] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [toaDo, setToaDo] = useState([]);
    const location = useLocation();
    console.log('Location', location.state);
    const tinhKhoangCach = (lat1, lon1, lat2, lon2) => {
        const R = 6371;
        const toRad = (value) => (value * Math.PI) / 180;

        const dLat = toRad(lat2 - lat1);
        const dLon = toRad(lon2 - lon1);

        const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c;

        return d;
    };

    useEffect(() => {
        dispatch(dataSanOpen());
        dispatch(dataMonChoi());
        dispatch(dataDanhGia());
        dispatch(dataDichVuOpen());
    }, []);
    console.log(dataSan);
    console.log('dịch vụ', dsdichvu);
    console.log(toaDo);

    useEffect(() => {
        if (loading) return;

        map.current = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [108.2522395, 16.1009151],
            zoom: 2,
            projection: 'globe',
        });

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const userPos = [position.coords.longitude, position.coords.latitude];
                setToaDo([position.coords.longitude, position.coords.latitude]);
                userLocation.current = userPos;
                if (location.state == null) map.current.flyTo({ center: userPos, zoom: 14 });
                else {
                    map.current.flyTo({ center: [location.state.kinh_do, location.state.vi_do], zoom: 14 });
                    setSelectedSan(dataSan.find((item) => item.id === location.state.id));
                }
                new mapboxgl.Marker({ color: 'blue' })
                    .setLngLat(userPos)
                    .setPopup(
                        new mapboxgl.Popup().setHTML(`
                        <div style="padding: 8px; font-family: Arial;">
                            <h4 style="margin: 0; color: #ff5722;">📍 Bạn đang ở đây</h4>
                            <p style="margin: 0; font-size: 12px;">Vĩ độ: ${userPos[1]}<br>Kinh độ: ${userPos[0]}</p>
                        </div>`)
                    )
                    .addTo(map.current);
            },
            (error) => console.error('Không thể lấy vị trí:', error)
        );

        map.current.on('style.load', () => map.current.setFog({}));

        return () => map.current && map.current.remove();
    }, [loading]);
    console.log(selectedSan);

    useEffect(() => {
        if (!map.current) return;

        markersRef.current.forEach((marker) => marker.remove());
        markersRef.current = [];

        dataSan
            .filter((item) => (selectedMonChoi === 'Tất Cả' ? item : item.loai_san === selectedMonChoi))
            .forEach((value) => {
                console.log(value);

                const icon = document.createElement('div');
                icon.innerHTML = `<img src="${import.meta.env.VITE_API_URL}/uploads/images/${value.icon}" class="w-10 h-10" alt="icon" />`;

                const marker = new mapboxgl.Marker({ element: icon }).setLngLat([value.kinh_do, value.vi_do]).addTo(map.current);

                marker.getElement().addEventListener('click', (e) => {
                    e.stopPropagation();
                    setSelectedSan(value);
                    setHasRoute(false);
                    setActiveTab('overview');
                });

                markersRef.current.push(marker);
            });
    }, [dataSan, selectedMonChoi]);

    return loading ? (
        <div className="relative w-full h-full font-sans">
            <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">Đang tải bản đồ...</h1>
        </div>
    ) : (
        <div className="relative w-full h-full font-sans">
            <div ref={mapContainerRef} className="w-full h-full z-0" />

            <button
                onClick={() => navigate(-1)}
                className="absolute top-6 left-6 cursor-pointer z-20 bg-white rounded-full shadow-md w-10 h-10 flex items-center justify-center text-green-600 hover:bg-green-100 transition"
            >
                <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <button
                onClick={() => {
                    map.current.flyTo({ center: toaDo, zoom: 14, essential: true });
                    setSelectedSan(null);
                }}
                className="absolute top-6 right-6 cursor-pointer z-100 bg-white rounded-full shadow-md w-10 h-10 flex items-center justify-center text-green-600 hover:bg-green-100 transition"
            >
                <FontAwesomeIcon icon={faLocation} />
            </button>
            <div className="absolute top-6 left-20 right-6 z-20 overflow-x-auto flex gap-3 scrollbar-hide">
                {[{ ten_mon: 'Tất Cả' }, ...dsmonchoi].map((value, index) => (
                    <button
                        key={index}
                        onClick={() => setSelectedMonChoi(value.ten_mon)}
                        className={`whitespace-nowrap px-5 py-2 rounded-full shadow-sm text-sm font-medium transition-all ${
                            selectedMonChoi === value.ten_mon ? 'bg-green-600 text-white' : 'bg-white/80 text-green-700 hover:bg-green-100'
                        }`}
                    >
                        {value.ten_mon}
                    </button>
                ))}
            </div>

            {selectedSan && (
                <div className="absolute bottom-6 right-6 z-30 w-[400px] max-w-[90vw] bg-white shadow-2xl rounded-2xl overflow-hidden">
                    <img
                        src={`${import.meta.env.VITE_API_URL}/uploads/images/${selectedSan.hinh_anh}`}
                        alt="Hình sân"
                        className="w-full h-44 object-cover"
                    />

                    <div className="flex border-b border-gray-200">
                        {['Tổng quan', 'Đánh giá', 'Dịch vụ'].map((label, idx) => {
                            const id = ['overview', 'reviews', 'services'][idx];
                            return (
                                <button
                                    key={id}
                                    onClick={() => setActiveTab(id)}
                                    className={`flex-1 text-sm py-3 font-medium ${
                                        activeTab === id ? 'text-green-700 border-b-2 border-green-700' : 'text-gray-500'
                                    } hover:text-green-700 transition`}
                                >
                                    {label}
                                </button>
                            );
                        })}
                    </div>

                    <div className="p-5 text-sm text-gray-700 space-y-2">
                        {activeTab === 'overview' && (
                            <>
                                <h2 className="text-xl font-bold text-green-700">{selectedSan.ten_san}</h2>
                                <p>
                                    📍 {selectedSan.dia_chi_cu_the}, {selectedSan.huyen}, {selectedSan.thanh_pho}
                                </p>
                                <p>
                                    🕒 {selectedSan.gio_mo_cua.slice(0, 5)} - {selectedSan.gio_dong_cua.slice(0, 5)}
                                </p>
                                <p>🚗 {tinhKhoangCach(toaDo[1], toaDo[0], selectedSan.vi_do, selectedSan.kinh_do).toFixed(2) + ' km'}</p>
                            </>
                        )}

                        {activeTab === 'reviews' && (
                            <div className="space-y-3">
                                <p>
                                    ⭐{' '}
                                    {dsdanhgia
                                        .filter((item) => item.id_san === selectedSan.id)
                                        .reduce((total, current) => total + current.so_sao, 0) / dsdanhgia.length || 5}{' '}
                                    ({dsdanhgia.filter((item) => item.id_san === selectedSan.id).length} đánh giá)
                                </p>
                                {dsdanhgia.filter((item) => item.id_san === selectedSan.id).length > 0 ? (
                                    dsdanhgia
                                        .filter((item) => item.id_san === selectedSan.id)
                                        .slice(0, 2)
                                        .map((value, index) => {
                                            return (
                                                <div key={index} className="bg-gray-100 p-3 rounded">
                                                    <p className="font-medium">{value.ho_ten}</p>
                                                    <p className="text-xs text-gray-500">“{value.danh_gia}”</p>
                                                </div>
                                            );
                                        })
                                ) : (
                                    <div className="flex justify-center">Chưa có đánh giá nào!</div>
                                )}
                            </div>
                        )}

                        {activeTab === 'services' && (
                            <ul className="list-disc list-inside space-y-1">
                                {dsdichvu.filter((item) => item.id_san === selectedSan.id).length > 0 ? (
                                    dsdichvu
                                        .filter((item) => item.id_san === selectedSan.id)
                                        .map((value, index) => {
                                            return <li key={index}>{value.ten_dich_vu}</li>;
                                        })
                                ) : (
                                    <div className="flex justify-center">Không có dịch vụ !</div>
                                )}
                            </ul>
                        )}
                    </div>

                    <div className="flex flex-col gap-3 px-5 pb-5">
                        <button
                            onClick={() => navigate(`/dat-san/${selectedSan.id}`)}
                            className="w-full py-2 text-sm font-medium bg-green-600 text-white rounded-full hover:bg-green-700 transition"
                        >
                            Đặt ngay
                        </button>

                        {hasRoute ? (
                            <button
                                onClick={() => {
                                    const [lon, lat] = userLocation.current;
                                    const { kinh_do, vi_do } = selectedSan;
                                    const gmapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${lat},${lon}&destination=${vi_do},${kinh_do}`;
                                    window.open(gmapsUrl, '_blank');
                                }}
                                className="w-full py-2 text-sm font-medium bg-green-700 text-white rounded-full hover:bg-green-800 transition"
                            >
                                Bắt đầu đi
                            </button>
                        ) : (
                            <button
                                onClick={() => {
                                    navigator.geolocation.getCurrentPosition(
                                        (position) => {
                                            const origin = [position.coords.longitude, position.coords.latitude];
                                            const destination = [selectedSan.kinh_do, selectedSan.vi_do];

                                            if (directions.current) {
                                                map.current.removeControl(directions.current);
                                            }

                                            directions.current = new MapboxDirections({
                                                accessToken: mapboxgl.accessToken,
                                                unit: 'metric',
                                                profile: 'mapbox/driving',
                                                alternatives: false,
                                                geometries: 'geojson',
                                                controls: {
                                                    inputs: false,
                                                    instructions: false,
                                                    profileSwitcher: false,
                                                },
                                            });

                                            map.current.addControl(directions.current, 'top-left');
                                            directions.current.setOrigin(origin);
                                            directions.current.setDestination(destination);
                                            userLocation.current = origin;
                                            setHasRoute(true);
                                        },
                                        () => console.log('Không lấy được vị trí hiện tại. Vui lòng bật định vị!')
                                    );
                                }}
                                className="w-full py-2 text-sm font-medium bg-white border border-green-600 text-green-600 rounded-full hover:bg-green-50 transition"
                            >
                                Chỉ đường
                            </button>
                        )}

                        <button
                            onClick={() => {
                                setSelectedSan(null);
                                setActiveTab('overview');
                                if (directions.current) {
                                    map.current.removeControl(directions.current);
                                    directions.current = null;
                                }
                                setHasRoute(false);
                            }}
                            className="w-full py-2 text-sm font-medium bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition"
                        >
                            Đóng
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MapBox;
