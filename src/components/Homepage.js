import React, { Fragment } from 'react';
import millify from 'millify';
import { Typography, Row, Col, Statistic } from 'antd';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Cryptocurrencies, News } from '../components';
import Loader from './Loader';
const { Title } = Typography;


const Homepage = () => {
    const { data } = useSelector((state) => state.crypto);
    const isLoading = useSelector((state) => state.crypto.isLoading)
    const globalStats = data ? data.stats : {};
    if (isLoading) return <Loader />;

    return (
        <Fragment>
            <Title level={2} className='heading'>Global Crypto Stats</Title>
            <Row>
                <Col span={12}><Statistic title='Total Cryptocurrencies' value={globalStats.total} /></Col>
                <Col span={12}><Statistic title='Total Exchanges' value={millify(globalStats.totalExchanges)} /></Col>
                <Col span={12}><Statistic title='Total Market Cap' value={millify(globalStats.totalMarketCap)} /></Col>
                <Col span={12}><Statistic title='Total 24h Volume' value={millify(globalStats.total24hVolume)} /></Col>
                <Col span={12}><Statistic title='Total Markets' value={millify(globalStats.totalCoins)} /></Col>
            </Row>
            <div className='home-heading-container'>
                <Title level={2} className='home-title'>Top 10 Cryptocurrencies in the world</Title>
                <Title level={3} className='show-more'><Link to='/cryptocurrencies'>Show More</Link></Title>
            </div>
            <Cryptocurrencies simplified />
            <div className='home-heading-container'>
                <Title level={2} className='home-title'>Latest Crypto News</Title>
                <Title level={3} className='show-more'><Link to='/news'>Show More</Link></Title>
            </div>
            <News simplified />
        </Fragment>
    )
}

export default Homepage