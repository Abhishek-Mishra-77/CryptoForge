import React, { Fragment, useState, useEffect } from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input } from 'antd';
import { useSelector } from 'react-redux';
import Loader from './Loader';

const Cryptocurrencies = ({ simplified }) => {
    const [searchTerm, setSearchTerm] = useState('')
    const count = simplified ? 10 : 100;
    const { data, isLoading } = useSelector((state) => state.crypto);
    const { coins } = data ? data : [];
    const [cryptos, setCryptos] = useState([])

    useEffect(() => {
        setCryptos(coins)
        const filteredData = coins?.filter((coin) => coin.name.toLowerCase().includes(searchTerm.toLowerCase()))
        setCryptos(filteredData)
    }, [searchTerm, coins]);

    if (isLoading) return <Loader />;



    return (
        <Fragment>
            {!simplified && <div className='search-crypto'>
                <Input placeholder='Search Cryptocurrency' onChange={(e) => setSearchTerm(e.target.value)} />
            </div>}
            <Row gutter={[32, 32]} className='crypto-card-container'>
                {cryptos?.slice(0, count)?.map((currency) =>
                    <Col xs={24} sm={12} lg={6} className='crypto-card' key={currency.rank}>
                        <Link to={`/crypto/${currency.rank}`}>
                            <Card title={`${currency.rank}. ${currency.name}`}
                                extra={<img className='crypto-image' src={currency.iconUrl} alt='crytoimg' />}
                                hoverable
                            >
                                <p>Price : {millify(currency.price)}</p>
                                <p>Market Cap : {millify(currency.marketCap)}</p>
                                <p>Daily Change : {millify(currency.change)}%</p>
                            </Card>
                        </Link>
                    </Col>
                )}
            </Row>
        </Fragment>
    )
}

export default Cryptocurrencies