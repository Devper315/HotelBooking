import React, { useEffect, useState } from "react";
import { fetchAllCity, fetchDistrictByCityId, fetchWardByDistrictId } from "../../services/address/AddressAPI";

const AddressSelector = ({ onChangeAddress }) => {
    const [cities, setCities] = useState([])
    const [districts, setDistricts] = useState([])
    const [wards, setWards] = useState([])
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedWard, setSelectedWard] = useState('');

    useEffect(() => {
        const getCity = async () => {
            const cityData = await fetchAllCity()
            setCities(cityData)
        }
        getCity()
    }, [])
    const handleChangeCity = async (e) => {
        const tempCity = e.target.value
        setSelectedCity(tempCity)
        if (tempCity) {
            const cityId = tempCity.split("-")[0]
            setDistricts(await fetchDistrictByCityId(cityId))
        }
        else {
            setSelectedDistrict('')
            setDistricts([])
            setSelectedWard('')
            setWards([])
        }
    };

    const handleChangeDistrict = async (e) => {
        const tempDistrict = e.target.value
        setSelectedDistrict(tempDistrict)
        if (tempDistrict) {
            const districtId = tempDistrict.split("-")[0]
            setWards(await fetchWardByDistrictId(districtId))
        }
        else {
            setSelectedWard('')
            setWards([])
        }
    };

    const handleChangeWard = (e) => {
        const tempWard = e.target.value
        setSelectedWard(tempWard)
        onChangeAddress(tempWard)
    };

    return (
        <div>
            <div>
                <label htmlFor="city">Tỉnh/thành phố</label>
                <select id="city" value={selectedCity} onChange={handleChangeCity}>
                    <option value="">Chọn tỉnh/thành phố</option>
                    {cities.map(city =>
                        <option key={city.id} value={`${city.id}-${city.name}`}>
                            {city.name}
                        </option>
                    )}
                </select>
            </div>
            <div>
                <label htmlFor="district">Quận/huyện</label>
                <select id="district" value={selectedDistrict} onChange={handleChangeDistrict}>
                    <option value="">Chọn quận/huyện</option>
                    {districts.map(district =>
                        <option key={district.id} value={`${district.id}-${district.name}`}>
                            {district.name}
                        </option>
                    )}
                </select>
            </div>
            <div>
                <label htmlFor="ward">Phường/xã</label>
                <select id="ward" value={selectedWard} onChange={handleChangeWard}>
                    <option value="">Chọn phường/xã</option>
                    {wards.map(ward =>
                        <option key={ward.id} value={`${ward.id}-${ward.name}`}>
                            {ward.name}
                        </option>
                    )}
                </select>
            </div>
        </div>
    )
}

export default AddressSelector