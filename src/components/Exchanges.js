import React from 'react';
import { Collapse, Row, Col, Typography, Avatar } from 'antd';
import Loader from './Loader';
import { useSelector } from 'react-redux';
import millify from 'millify';
import { Link } from 'react-router-dom';

const { Text } = Typography;
const { Panel } = Collapse;

const Exchanges = () => {
    const { data, isLoading } = useSelector((state) => state.crypto);
    const { coins } = data ? data : [];
    const { cryptoNews } = useSelector((state) => state.cryptoNews);
    const cryptosNews = cryptoNews?.articles?.slice(0, 50);
    const cryptoDesc = cryptosNews?.map((crypto) => crypto.description)


    if (isLoading) return <Loader />;

    return (
        <>
            <Row>
                <Col span={6}>Exchanges</Col>
                <Col span={6}>24h Trade Volume</Col>
                <Col span={6}>Markets</Col>
                <Col span={6}>Change</Col>
            </Row>
            <Row>
                {coins?.map((exchange, index) => (
                    <Col span={24} key={exchange.rank}>
                        <Collapse>
                            <Panel
                                key={exchange.rank}
                                showArrow={false}
                                header={(
                                    <Row key={exchange.rank}>
                                        <Col span={6}>
                                            <Text><strong>{exchange.rank}.</strong></Text>
                                            <Avatar className="exchange-image" src={exchange.iconUrl} />
                                            <Text><strong>{exchange.name}</strong></Text>
                                        </Col>
                                        <Col span={6}>${millify(exchange['24hVolume'])}</Col>
                                        <Col span={6}>{millify(exchange.marketCap)}</Col>
                                        <Col span={6}>{millify(exchange.change)}%</Col>
                                    </Row>
                                )}
                            >
                                <Avatar className="exchange-image" src={exchange.iconUrl}></Avatar>
                                <p>{cryptoDesc?.[index] + "   " || ''}</p>
                                <Link to={exchange.coinrankingUrl} target='_blank'>Click here to know more</Link>
                            </Panel>
                        </Collapse>
                    </Col>
                ))}
            </Row>
        </>
    );
}

export default Exchanges