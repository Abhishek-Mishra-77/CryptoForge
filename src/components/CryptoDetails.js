import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import millify from 'millify';
import { Col, Typography, Select, Row } from 'antd';
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, NumberOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, ThunderboltOutlined, CheckOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import Loader from './Loader';
import LineChart from './Chart';

const { Title, Text } = Typography;
const { Option } = Select;

const CryptoDetails = () => {
    const { coinId } = useParams();
    const [timePeriod, setTimePeriod] = useState('7d')
    const { data, isLoading } = useSelector((state) => state.crypto);
    const { coins } = data ? data : [];
    const { stats } = data ? data : {};
    const [cryptoDetails, setCryptoDetails] = useState({})
    const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

    useEffect(() => {
        if (coins) {
            const filteredData = coins.find((coin) => coin.rank === Number(coinId));
            setCryptoDetails(filteredData);
        }
    }, [coins]);

    if (isLoading) return <Loader />;





    const status = [
        { title: 'Price to USD', value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`, icon: <DollarCircleOutlined /> },
        { title: 'Rank', value: cryptoDetails?.rank, icon: <NumberOutlined /> },
        { title: '24h Volume', value: `$ ${cryptoDetails['24hVolume'] && millify(cryptoDetails['24hVolume'])}`, icon: <ThunderboltOutlined /> },
        { title: 'Market Cap', value: `$ ${cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)}`, icon: <DollarCircleOutlined /> },
    ];


    const genericStats = [
        { title: 'Number Of Markets', value: stats?.totalMarkets, icon: <FundOutlined /> },
        { title: 'Number Of Exchanges', value: stats?.totalExchanges, icon: <MoneyCollectOutlined /> },
        { title: 'Aprroved Supply', value: stats?.confirmed ? <StopOutlined /> : <CheckOutlined />, icon: <ExclamationCircleOutlined /> },
        { title: 'Total Supply', value: `$ ${stats?.total && millify(stats?.total)}`, icon: <ExclamationCircleOutlined /> },
    ];



    return (
        <Col className='coin-detail-container'>
            <Col className='coin-heading-container'>
                <Title level={2} className='coin-name'>
                    {cryptoDetails.name} ({cryptoDetails?.symbol}) Price
                </Title>
                <p>
                    {cryptoDetails.name} live price in US dollars.
                    View value statistics , market cap and supply
                </p>
            </Col>
            <Select
                defaultValue='7d'
                className='select-timeperiod'
                placeholder='Select Time Period'
                onChange={(value) => setTimePeriod(value)}
            >
                {time.map((date) => <Option key={date}>{date}</Option>)}
            </Select>
            <LineChart coinHistory={'coinHistory'} currentPrice={millify(cryptoDetails.price)} coinName={cryptoDetails.name} />
            <Col className='stats-container'>
                <Col className='coin-value-statistics'>
                    <Col className='coin-value=statistics-heading'>
                        <Title level={3} className='coin-details-heading'>
                            {cryptoDetails.name + " "}Value Statistics
                        </Title>
                        <p>An overview showing the stats of {cryptoDetails.name}</p>
                    </Col>
                    {status.map(({ icon, title, value }) => (
                        <Col className='coin-stats'>
                            <Col className='coin-stats-name'>
                                <Text>{icon}</Text>
                                <Text>{title}</Text>
                            </Col>
                            <Text className='stats'>{value}</Text>
                        </Col>
                    ))}
                </Col>
                <Col className='other-value-statistics'>
                    <Col className='coin-value=statistics-heading'>
                        <Title level={3} className='coin-details-heading'>
                            Others Statistics
                        </Title>
                        <p>An overview showing the stats of {cryptoDetails.name}</p>
                    </Col>
                    {genericStats.map(({ icon, title, value }) => (
                        <Col className='coin-stats'>
                            <Col className='coin-stats-name'>
                                <Text>{icon}</Text>
                                <Text>{title}</Text>
                            </Col>
                            <Text className='stats'>{value}</Text>
                        </Col>
                    ))}
                </Col>
            </Col>
            <Col className='coin-desc-link'>
                <Row className='coin-desc'>
                    <Title level={3} className='coin-details-heading'>
                        What is {cryptoDetails.name}
                        {/* {HTMLReactParser(cryptoDetails.description)} */}
                    </Title>
                </Row>
            </Col>
        </Col>
    )
}

export default CryptoDetails;