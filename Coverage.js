import React, { useState, useEffect } from 'react';
import './teklif-al.css';
import { useDataContext } from './DataContext';
import axios from 'axios';

function Coverage({ onNext }) {
    const { updateCoverageData, coverageData: contextCoverageData, updatePolicyData, updatePolicyCoverages } = useDataContext();
    const [coverageData, setCoverageData] = useState({});
    const [expandedCoverages, setExpandedCoverages] = useState({});
    const [firstCoverageAdded, setFirstCoverageAdded] = useState(false);
    const [showAllButtons, setShowAllButtons] = useState({});
    const [coverageDescriptions, setCoverageDescriptions] = useState([]);
    const [policyCoverages, setPolicyCoverages] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalUSDPrice, setTotalUSDPrice] = useState(0);

    useEffect(() => {
        axios.get('http://localhost:26131/api/Coverages')
            .then(response => {
                const coverageDataFromDB = response.data.data.sort((a, b) => a.coverageID - b.coverageID);
                const initialCoverageData = {};
                const initialExpandedCoverages = {};
                const initialShowAllButtons = {};

                let firstCoverageId = '';

                coverageDataFromDB.forEach((coverage, index) => {
                    initialCoverageData[coverage.coverageID] = index === 0;
                    initialExpandedCoverages[coverage.coverageID] = false;
                    initialShowAllButtons[coverage.coverageID] = true;

                    if (index === 0) {
                        firstCoverageId = coverage.coverageID;
                        setTotalPrice(coverage.premiumTL);
                        setTotalUSDPrice(coverage.premiumUSD);
                    }
                });

                setCoverageDescriptions(coverageDataFromDB);
                setCoverageData(initialCoverageData);
                setExpandedCoverages(initialExpandedCoverages);
                setShowAllButtons(initialShowAllButtons);
                handleAddCoverage(firstCoverageId, true);
                setFirstCoverageAdded(true);
            })
            .catch(error => {
                console.error('Teminat verileri alınırken hata oluştu:', error);
            });
    }, []);

    const handleAddCoverage = (coverageId, initial = false) => {
        const updatedCoverage = { ...coverageData, [coverageId]: initial ? true : !coverageData[coverageId] };
        setCoverageData(updatedCoverage);

        if (initial || !coverageData[coverageId]) {
            setPolicyCoverages([...policyCoverages, { policyCoverageID: 0, policyID: 0, coverageID: coverageId }]);
        } else {
            setPolicyCoverages(policyCoverages.filter(pc => pc.coverageID !== coverageId));
        }

        const selectedCoverage = coverageDescriptions.find(coverage => coverage.coverageID === coverageId);
        if (selectedCoverage) {
            if (initial || !coverageData[coverageId]) {
                setTotalPrice(prevTotal => prevTotal + selectedCoverage.premiumTL);
                setTotalUSDPrice(prevTotal => prevTotal + selectedCoverage.premiumUSD);
            } else {
                setTotalPrice(prevTotal => prevTotal - selectedCoverage.premiumTL);
                setTotalUSDPrice(prevTotal => prevTotal - selectedCoverage.premiumUSD);
            }
        }

        updateCoverageData({ ...contextCoverageData, ...updatedCoverage });
        updatePolicyCoverages([...policyCoverages, { policyCoverageID: 0, policyID: 0, coverageID: coverageId }]);
    };

    const handleShowAll = (coverageId) => {
        const updatedExpandedCoverages = { ...expandedCoverages, [coverageId]: true };
        setExpandedCoverages(updatedExpandedCoverages);
        const updatedShowAllButtons = { ...showAllButtons, [coverageId]: false };
        setShowAllButtons(updatedShowAllButtons);
    };

    const handleCloseAll = (coverageId) => {
        const updatedExpandedCoverages = { ...expandedCoverages, [coverageId]: false };
        setExpandedCoverages(updatedExpandedCoverages);
        const updatedShowAllButtons = { ...showAllButtons, [coverageId]: true };
        setShowAllButtons(updatedShowAllButtons);
    };

    const handleSubmit = () => {
        const coverageInfo = {
            totalPrice: totalPrice,
            totalUSDPrice: totalUSDPrice,
            coverageData: coverageData,
            policyCoverages: policyCoverages,
        };
        updateCoverageData(coverageInfo);
        onNext();
    };

    return (
        <div>
            <div className="teminant">
                <h3>Teminatlar</h3>
                {coverageDescriptions.map((coverage) => (
                    <div key={coverage.coverageID} className="coverage">
                        <h4>{coverage.coverageName}</h4>
                        <h5>Teminatlar</h5>
                        <ul>
                            {expandedCoverages[coverage.coverageID] ? (
                                coverage.description.split(',').map((item, index) => (
                                    <li key={index}>{item.trim()}</li>
                                ))
                            ) : (
                                coverage.description.split(',').slice(0, 3).map((item, index) => (
                                    <li key={index}>{item.trim()}</li>
                                ))
                            )}
                        </ul>
                        {expandedCoverages[coverage.coverageID] ? (
                            <button onClick={() => handleCloseAll(coverage.coverageID)} className="button-no-border">Kapat</button>
                        ) : (
                            <button onClick={() => handleShowAll(coverage.coverageID)} className="button-no-border">Tümünü Gör</button>
                        )}
                        <div className="coverage-price-container">
                            <p className="coverage-price">₺{coverage.premiumTL} - ${coverage.premiumUSD}</p>
                            <div className='button-ekle'>
                                {coverage.coverageID === 1 && firstCoverageAdded ? (
                                    <button disabled style={{ backgroundColor: '#d8dade', color: 'white' }}>Zorunlu</button>
                                ) : (
                                    <button onClick={() => handleAddCoverage(coverage.coverageID)}>{coverageData[coverage.coverageID] ? 'Eklendi' : 'Ekle'}</button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="additional-coverage-container">
                <h3 className="coverage-title">Teminat Kapsamı</h3>
                <ul>
                    {coverageDescriptions.map((coverage) => (
                        <li key={coverage.coverageID} className="coverage-option">
                            <label>
                                <input
                                    type="checkbox"
                                    checked={coverageData[coverage.coverageID] || false}
                                    onChange={() => handleAddCoverage(coverage.coverageID)}
                                    disabled={coverage.coverageID === 1 && firstCoverageAdded}
                                />
                                {coverage.coverageName}
                            </label>
                            <p>₺{coverage.premiumTL} - ${coverage.premiumUSD}</p>
                        </li>
                    ))}
                </ul>
                <div className="container-total">
                    <div className="total">
                        <h3>PRİM TUTARI</h3>
                        <p>₺{totalPrice} - ${totalUSDPrice}</p>
                    </div>
                    <button className="Teklif-button" onClick={handleSubmit}>Teklif Oluştur</button>
                </div>
            </div>
        </div>
    );
}

export default Coverage;
























